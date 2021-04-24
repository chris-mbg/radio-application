import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import styles from '../css/CategoriesWrapper.module.css'
import CategoryCard from "./CategoryCard";


const CategoriesWrapper = () => {
  const { allCategories, fetchProgramsInCat } = useContext(RadioContext);

  return (
    <div className={styles.categoriesWrapper}>
      <h2>Hitta program efter kategori [annan text..]</h2>
      { allCategories ?
        <div className={styles.cardWrapper}>
          { allCategories.map(cat => <CategoryCard category={cat} key={cat.id}/>)}
        </div>
        : null}
    </div>
  );
}

export default CategoriesWrapper;