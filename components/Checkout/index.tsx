import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearCart } from '../../store/slices/cartSlice';
import { CartItem } from '../../lib/types';
import styles from '../../styles/Checkout.module.scss';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../context/AuthContext';

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext); // Usa o contexto diretamente

  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.warn('Stripe.js ainda não foi carregado.');
      return;
    }

    if (!currentUser) {
      toast.error('Você precisa estar logado para finalizar a compra.');
      return;
    }

    setIsLoading(true);

    // 1. Criar o PaymentIntent no backend com metadados
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: subtotal,
        userId: currentUser.uid,
        cartItems: cartItems,
      }),
    });

    const { clientSecret, error: backendError } = await response.json();

    if (backendError) {
      toast.error(`Erro do servidor: ${backendError.message}`);
      setIsLoading(false);
      return;
    }

    // 2. Confirmar o pagamento no frontend com o clientSecret
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // URL para onde o cliente será redirecionado após o pagamento.
        return_url: `${window.location.origin}/confirmacao`,
      },
    });

    if (error) {
      toast.error(error.message || 'Ocorreu um erro inesperado.');
    } else {
      // O status será verificado na página de confirmação, então não precisamos de uma mensagem aqui.
      // Apenas redirecionamos.
    };

    setIsLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1>Seu carrinho está vazio.</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      <div className={styles.summary}>
        <h2>Resumo do Pedido</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name} (x{item.quantity})</span>
              <span>
                {(item.price * item.quantity).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </li>
          ))}
        </ul>
        <hr />
        <div className={styles.total}>
          <span>Subtotal</span>
          <span>
            {subtotal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </div>
      <div className={styles.paymentForm}>
        <h2>Informações de Pagamento</h2>
        <form id="payment-form" onSubmit={handleSubmit} className={styles.form}>
          <PaymentElement id="payment-element" />
          <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.button}>
            <span id="button-text">
              {isLoading ? <div className={styles.spinner} id="spinner"></div> : "Pagar agora"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
