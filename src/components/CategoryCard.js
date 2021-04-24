import styles from '../css/CategoryCard.module.css'

const CategoryCard = ({category}) => {
  return (
    <div className={styles.categoryCard}>
      <p>{category.name}</p>
    </div>
  );
}

export default CategoryCard;