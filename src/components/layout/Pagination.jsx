// Layout
import PaginationButton from "./PaginationButton";

// CSS
import styles from "./Pagination.module.css";

function Pagination({ nTotalOfEle, getFirstEle, getLastEle }) {
  const nOfElementsPerPage = 8;
  let totalOfPages = 0;
  let arrOfButton = [];

  function setNumberOfPages() {
    const nOfPages = nTotalOfEle / nOfElementsPerPage;

    // Checks if the number of pages is an integer
    if (Number.isInteger(nOfPages)) {
      totalOfPages = nOfPages;
    } else totalOfPages = Math.floor(nOfPages) + 1;

    for (let i = 1; i <= totalOfPages; i++) {
      arrOfButton.push(i);
    }
  }

  setNumberOfPages();

  function showNewElementsOfThePage(id) {
    console.log(id);
    // if (id == 1) {
    //   getFirstEle(0);
    //   getLastEle(nOfElementsPerPage - 1);
    // } else {
    getFirstEle(nOfElementsPerPage * (id - 1));
    getLastEle(nOfElementsPerPage * id - 1);
    // }
  }

  return (
    <div className={styles.container_pagination}>
      <div className={styles.container_button}>
        {arrOfButton.map((button, id) => (
          <PaginationButton
            key={id}
            id={button}
            onClick={showNewElementsOfThePage}
          />
        ))}
      </div>
    </div>
  );
}

export default Pagination;
