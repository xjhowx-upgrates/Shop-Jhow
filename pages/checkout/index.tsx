import Checkout from '../../components/Checkout';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Carrega o objeto Stripe fora do render para evitar recriá-lo a cada renderização.
// A asserção 'as string' garante ao TypeScript que a variável de ambiente existirá.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
  // Opções para o provider Elements, como a aparência do formulário
  const options = {
    // O clientSecret será passado posteriormente, quando for criado
    mode: 'payment' as const, // Define o modo como 'pagamento'
    amount: 1099, // Exemplo de valor em centavos (será dinâmico)
    currency: 'brl', // Moeda
    appearance: {
      theme: 'stripe' as const, // Tema do formulário
    },
  };

  return (
    <>
      <Navbar />
      <Elements stripe={stripePromise} options={options}>
        <Checkout />
      </Elements>
      <Footer />
    </>
  );
}

export default CheckoutPage;
