/**
 * Endpoint para Criação de Payment Intent do Stripe
 * Desenvolvido por: @xJhowx
 * 
 * Responsável por criar uma intenção de pagamento (PaymentIntent) no Stripe.
 * Recebe o valor total, ID do usuário e os itens do carrinho, e anexa
 * os dados importantes como metadados para serem usados pelo webhook.
 */
/**
 * Endpoint para Criação de Payment Intent do Stripe
 * Desenvolvido por: @xJhowx
 * 
 * Responsável por criar uma intenção de pagamento (PaymentIntent) no Stripe.
 * Recebe o valor total, ID do usuário e os itens do carrinho, e anexa
 * os dados importantes como metadados para serem usados pelo webhook.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Inicializa o Stripe com a chave secreta e a versão da API
// A asserção 'as string' garante ao TypeScript que a variável de ambiente existirá.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10', // Use a versão mais recente da API
});

import { CartItem } from '../../lib/types';

// Define a interface para o corpo da requisição para garantir a tipagem
interface RequestBody {
  amount: number;
  userId: string;
  cartItems: CartItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { amount, userId, cartItems } = req.body as RequestBody;

      // Validação básica para o valor
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Valor inválido.' });
      }

      // Cria um PaymentIntent no Stripe
      // O valor deve ser em centavos (a menor unidade da moeda)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Converte para centavos e arredonda
        currency: 'brl', // Moeda brasileira
        metadata: {
          userId: userId,
          // O Stripe só aceita strings nos metadados, então serializamos o carrinho
          cartItems: JSON.stringify(cartItems),
        },
        automatic_payment_methods: {
          enabled: true, // Permite que o Stripe sugira os melhores métodos de pagamento
        },
      });

      // Retorna o client_secret para o frontend
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error('Erro ao criar PaymentIntent:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Se o método não for POST, retorna um erro
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
