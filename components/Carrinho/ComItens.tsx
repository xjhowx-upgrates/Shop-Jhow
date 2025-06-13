import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../../store/store';
import { clearCart } from '../../store/slices/cartSlice';
import { CartItem } from '../../lib/types';
import Item from './Item';
import styles from '../../styles/Carrinho.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function ComItens() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

  const handleClearCart = () => {
    if (window.confirm('Deseja limpar o carrinho?')) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      <div className={styles.titulo}>
        <h2>CARRINHO</h2>
      </div>
      <div className={styles.itemCarrinho}>
        {cartItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.carrinhoLimpar}>
        <button onClick={handleClearCart} data-cy="cart-clean">
          LIMPAR CARRINHO
        </button>
      </div>
      <div className={styles.precoFinalizar}>
        <div className={styles.subtotal}>
          <span>Subtotal:</span>
          <span>
            {subtotal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className={styles.finalizar}>
          <Link href="/checkout" passHref>
            <button data-cy="cart-checkout">FINALIZAR COMPRA</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ComItens;
