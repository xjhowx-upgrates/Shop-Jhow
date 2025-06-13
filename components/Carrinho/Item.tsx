import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { CartItem, removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Carrinho.module.scss';

interface Props {
  item: CartItem;
}

function Item({ item }: Props) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (window.confirm('Deseja excluir o item?')) {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  return (
    <div className={styles.item} data-cy="cart-item">
      <div className={styles.itemImagem}>
        <Image src={item.image} alt={item.name} height={100} width={100} />
      </div>
      <div className={styles.itemDescricao}>
        <p>{item.name}</p>
      </div>
      <div className={styles.itemAcoes}>
        <button onClick={handleIncrease} data-cy="cart-plus-qtd">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <span data-cy="cart-item-qtd">{item.quantity}</span>
        <button onClick={handleDecrease} data-cy="cart-minus-qtd">
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
      <div className={styles.itemPrecos}>
        <p className={styles.precoSemPromo} data-cy="item-price">
          {(item.price * item.quantity).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <div onClick={handleRemove} className={styles.itemDeletar} data-cy="delete-item">
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
}

export default Item;
