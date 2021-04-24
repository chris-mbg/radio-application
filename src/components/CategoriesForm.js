import { useContext, useState } from 'react';
import { RadioContext } from '../contexts/RadioContext';
import styles from '../css/CategoriesForm.module.css';
import CategoryPrograms from './CategoryPrograms';

const CategoriesForm = () => {

  const { allCategories } = useContext(RadioContext);

  const [categoryId, setCategoryId] = useState("0");

  const handleCatChoice = e => {
    console.log(e.target.value);
    setCategoryId(e.target.value);
  }

  return (
    <div>
      <h2>Hitta program efter kategori[annan text...]</h2>
      <select onChange={handleCatChoice}>
        <option value="0">Välj en kategori</option>
        { allCategories ? allCategories.map(cat => (
          <option value={cat.id} key={cat.id}>{cat.name}</option>
        )) : null }
      </select>
      <CategoryPrograms categoryId={categoryId}/>
    </div>
  );
}

export default CategoriesForm;