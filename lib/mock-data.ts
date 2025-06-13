import { Product } from './types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Fone de Ouvido Bluetooth Super Bass',
    slug: 'fone-de-ouvido-bluetooth-super-bass',
    description: 'Experimente a imersão sonora com graves potentes e cancelamento de ruído. Bateria de longa duração e design confortável para o dia a dia.',
    price: 299.90,
    images: ['/images/product-1-1.jpg', '/images/product-1-2.jpg'],
    stock: 50,
    category: 'Eletrônicos',
  },
  {
    id: '2',
    name: 'Smartwatch Pro X',
    slug: 'smartwatch-pro-x',
    description: 'Monitore sua saúde, receba notificações e tenha um assistente pessoal no seu pulso. Compatível com Android e iOS.',
    price: 450.00,
    images: ['/images/product-2-1.jpg', '/images/product-2-2.jpg'],
    stock: 35,
    category: 'Vestuário',
  },
  {
    id: '3',
    name: 'Teclado Mecânico Gamer RGB',
    slug: 'teclado-mecanico-gamer-rgb',
    description: 'Alta performance para seus jogos com switches mecânicos de resposta rápida e iluminação RGB customizável.',
    price: 350.50,
    images: ['/images/product-3-1.jpg', '/images/product-3-2.jpg'],
    stock: 20,
    category: 'Acessórios de PC',
  },
  {
    id: '4',
    name: 'Cadeira Gamer Ergonômica',
    slug: 'cadeira-gamer-ergonomica',
    description: 'Conforto e ergonomia para longas sessões de jogos ou trabalho. Múltiplos ajustes e material de alta qualidade.',
    price: 1200.00,
    images: ['/images/product-4-1.jpg', '/images/product-4-2.jpg'],
    stock: 15,
    category: 'Móveis',
  },
];
