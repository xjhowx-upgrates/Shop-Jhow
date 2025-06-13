import React from 'react';
import styles from '../../styles/Price.module.scss';

interface PriceProps {
  price: number;
}

const Price: React.FC<PriceProps> = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  const installmentPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 10);

  return (
    <div className={styles.container}>
      <p className={styles.price}>{formattedPrice}</p>
      <p className={styles.installments}>
        ou 10x de {installmentPrice} sem juros
      </p>
    </div>
  );
};

export default Price;
