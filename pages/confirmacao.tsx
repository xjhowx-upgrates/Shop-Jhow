import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useStripe } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { useRouter } from 'next/router';
import styles from '../styles/Confirmacao.module.scss';

function ConfirmationPage() {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const router = useRouter();



  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Pega o client_secret do PaymentIntent da URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    // Recupera o PaymentIntent para verificar o status
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          toast.success('Pagamento realizado com sucesso!');
          dispatch(clearCart()); // Limpa o carrinho
          break;
        case 'processing':
          toast.info('Seu pagamento está sendo processado.');
          break;
        case 'requires_payment_method':
          toast.error('O pagamento falhou. Por favor, tente outro método de pagamento.');
          break;
        default:
          toast.error('Algo deu errado.');
          break;
      }
    });
  }, [stripe, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Status do Pedido</h1>
        <p className={styles.message}>Verificando status do pagamento...</p>
        <p>Você será notificado sobre o resultado em breve.</p>
        <button onClick={() => router.push('/')} className={styles.button}>
          Voltar para a Página Inicial
        </button>
        <button onClick={() => router.push('/meus-pedidos')} className={styles.button}>
          Ver Meus Pedidos
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
