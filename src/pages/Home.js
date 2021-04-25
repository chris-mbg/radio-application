import CategoriesForm from "../components/CategoriesForm";
import CardWrapper from '../components/CardWrapper'
import styles from '../css/Home.module.css'
const Home = () => {
  return (
    <div>
      <h1>Välkommen [annan text]</h1>
      <CategoriesForm />
      <CardWrapper />
    </div>
  );
}

export default Home;