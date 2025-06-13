import React from 'react';
import { Product } from '../../lib/types';
import Item from '../Item/Item';
import styles from "../../styles/ProductGrid.module.scss";

interface ProductGridProps {
  title: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }: ProductGridProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {products.map((product: Product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
