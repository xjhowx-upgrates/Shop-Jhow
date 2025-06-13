import Link from "next/link";
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faXmark,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Navbar.module.scss";

interface Props {
  open: boolean;
  changeOpen: Function;
}

function Navbar({ open, changeOpen }: Props) {
  const { currentUser, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      changeOpen(); // Fecha a navbar se estiver aberta
      router.push('/login');
    } catch (error) {
      console.error("Falha ao fazer logout:", error);
    }
  };

  return (
    <div className={open ? `${styles.navbar} ${styles.active}` : styles.navbar}>
      <div className={styles.navAtivoOpcoes}>
        <FontAwesomeIcon icon={faXmark} onClick={() => changeOpen()} />
        <div className={styles.navAtivoExtra}>
          {currentUser ? (
            <FontAwesomeIcon 
              icon={faSignOutAlt} 
              onClick={handleLogout} 
              className={styles.logoutIcon}
              title="Sair"
            />
          ) : (
            <Link href="/login" passHref>
              <span title="Entrar">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </Link>
          )}
          <Link href="/carrinho" passHref>
            <span title="Carrinho">
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
          </Link>
        </div>
      </div>

      <nav>
        <ul onClick={() => changeOpen()}>
          {currentUser && (
            <li>
              <Link href="/meus-pedidos">Meus Pedidos</Link>
            </li>
          )}
          <li>
            <Link href="/placa-mae">Placa-Mãe</Link>
          </li>
          <li>
            <Link href="/processador">Processador</Link>
          </li>
          <li>
            <Link href="/placa-de-video">Placa de Vídeo</Link>
          </li>
          <li>
            <Link href="/fonte">Fonte</Link>
          </li>
          <li>
            <Link href="/gabinete">Gabinete</Link>
          </li>
          <li>
            <Link href="/memoria-ram">Memória RAM</Link>
          </li>
          <li>
            <Link href="/ssd">SSD</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
