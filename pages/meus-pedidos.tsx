import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, DocumentData } from 'firebase/firestore';
import { OrderItem } from '../lib/types'; // Importando o tipo
import styles from '../styles/MeusPedidos.module.scss';
import withAuth from '../components/withAuth';

// Definindo a interface para um pedido, alinhada com a estrutura do Firestore
interface Order {
  id: string;
  amount: number;
  createdAt: { seconds: number; nanoseconds: number };
  items: OrderItem[]; // Usando o tipo importado
  status: string;
}

const MeusPedidos = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        try {
          const ordersRef = collection(db, 'users', currentUser.uid, 'orders');
          const q = query(ordersRef, orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map((doc: DocumentData) => ({
            id: doc.id,
            ...(doc.data() as Omit<Order, 'id'>),
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Erro ao buscar pedidos: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return <p className={styles.loading}>Carregando pedidos...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Meus Pedidos</h1>
      {orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order: Order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <h2>Pedido #{order.id.substring(0, 8)}</h2>
                <p>Data: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  {order.items.map((item: OrderItem, index) => (
                    <li key={index}>{item.name} - {item.quantity} x R$ {item.price.toFixed(2)}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.cardFooter}>
                <p>Status: <span className={`${styles.status} ${styles[order.status]}`}>{order.status}</span></p>
                <strong>Total: R$ {order.amount.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(MeusPedidos);
