import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Product } from '../../lib/types';
import { addToCart } from '../../store/slices/cartSlice';
import Price from './Price';
import styles from '../../styles/Item.module.scss';

interface ItemProps {
  product: Product;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const { name, images, price, slug } = product;
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.container}>
      <Link href={`/product/${slug}`} passHref>
        <a className={styles.linkWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src={images[0]}
              alt={name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{name}</h2>
            <Price price={price} />
          </div>
        </a>
      </Link>
      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default Item;
