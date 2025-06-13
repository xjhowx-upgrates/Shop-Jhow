/**
 * Endpoint de Webhook para o Stripe
 * Desenvolvido por: @xJhowx
 * 
 * Responsável por receber eventos do Stripe, principalmente 'checkout.session.completed'.
 * Valida a assinatura do webhook para segurança e, em caso de sucesso,
 * extrai os metadados da sessão para criar um novo pedido no Firestore.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Desativa o bodyParser padrão do Next.js para que possamos receber o corpo da requisição como um stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Lida com o evento 'checkout.session.completed'
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extrai os metadados que anexamos
      const { userId, cartItems } = session.metadata!;
      const parsedCartItems = JSON.parse(cartItems);

      try {
        // Cria um novo pedido no Firestore
        await addDoc(collection(db, 'users', userId, 'orders'), {
          amount: session.amount_total! / 100, // Converte de volta para a moeda principal
          amount_shipping: session.total_details?.amount_shipping! / 100,
          items: parsedCartItems,
          status: 'succeeded',
          createdAt: serverTimestamp(),
          stripePaymentId: session.payment_intent,
        });
        console.log(`Pedido salvo com sucesso para o usuário: ${userId}`);
      } catch (error) {
        console.error('Erro ao salvar o pedido no Firestore:', error);
        // Mesmo que falhe, não retornamos um erro 500 para o Stripe, pois ele pode reenviar o webhook.
        // Apenas logamos o erro para investigação.
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
