import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import ComItens from "./ComItens";
import SemItens from "./SemItens";

import styles from "../../styles/Carrinho.module.scss";

function Index() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={styles.geral}>
      <div
        className={
          cartItems.length === 0 ? styles.semItem : styles.comItem
        }
        data-cy="cart-main"
      >
        {cartItems.length === 0 ? <SemItens /> : <ComItens />}
      </div>
    </div>
  );
}

export default Index;
