import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Item from "../Item/Item";
import { sampleProducts as itemsList } from "../../lib/mock-data";

import styles from "../../styles/Categorias.module.scss";

function Busca() {
  const router = useRouter();
  const query = router.query.q;
  const [filtro, setFiltro] = useState("Padrão");
  const itens = itemsList.filter((product) => {
    const searchTerm = String(query || "").toLowerCase();
    if (!searchTerm) return false;
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFiltro("Padrão");
  }, [query]);

  const itensMenorPreco = itens.slice().sort((a, b) => a.price - b.price);
  const itensMaiorPreco = itens.slice().sort((a, b) => b.price - a.price);

  function renderItens(opt: string) {
    let itemsToRender = itens;
    if (opt === "Menor Preço") {
      itemsToRender = itensMenorPreco;
    } else if (opt === "Maior Preço") {
      itemsToRender = itensMaiorPreco;
    }

    return itemsToRender.map((product) => (
      <Item product={product} key={product.id} />
    ));
  }

  function handleFiltro(opt: string) {
    setFiltro(opt);
    setOpen(false);
  }

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <main className={styles.container}>
      <div className={styles.containerFiltro}>
        <div className={styles.buscaDesc}>
          <p>Você pesquisou por:</p>
          <h1>{String(query).toUpperCase()}</h1>
        </div>

        <div className={styles.filtro}>
          <p>FILTRAR:</p>
          <div
            className={
              open
                ? `${styles.botaoOrdenar} ${styles.ativo}`
                : styles.botaoOrdenar
            }
          >
            <button onClick={handleOpen}>
              {filtro}
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <ul>
              <li onClick={() => handleFiltro("Padrão")}>Padrão</li>
              <li onClick={() => handleFiltro("Menor Preço")}>Menor Preço</li>
              <li onClick={() => handleFiltro("Maior Preço")}>Maior Preço</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={
          itens.length === 0 ? styles.buscaNenhum : styles.containerItens
        }
      >
        {itens.length === 0 ? (
          <h1>Nenhum item encontrado</h1>
        ) : (
          renderItens(filtro)
        )}
      </div>
    </main>
  );
}

export default Busca;
