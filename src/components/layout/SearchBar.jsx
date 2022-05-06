import styles from "./SearchBar.module.css";

function SearchBar({ setSearchTerm }) {
  return (
    <input
      className={styles.input}
      type="text"
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Digite para pesquisar"
    />
  );
}

export default SearchBar;
