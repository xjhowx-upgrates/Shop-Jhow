import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Navbar from '../components/Navbar/index';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { sampleProducts } from '../lib/mock-data';
import { Product } from '../lib/types';

const Home = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Navbar />
      <ProductGrid title="Destaques" products={products} />
      {/* <Informacoes /> */}
    </>
  );
};

export const getStaticProps: GetStaticProps<{ products: Product[] }> = async () => {
  return {
    props: {
      products: sampleProducts,
    },
  };
};

export default Home;
