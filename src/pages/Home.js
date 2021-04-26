import CategoriesForm from "../components/CategoriesForm";
import CardWrapper from '../components/CardWrapper';
import styles from '../css/Home.module.css';
import { useEffect } from 'react';

const Home = () => {

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div>
      <h1>Välkommen [annan text]</h1>
      <CategoriesForm />
      <CardWrapper />
    </div>
  );
}

export default Home;