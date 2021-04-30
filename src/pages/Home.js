import CategoriesForm from "../components/CategoriesForm";
import CardWrapper from '../components/CardWrapper';
import { useEffect } from 'react';
import Hero from "../components/Hero";

const Home = () => {

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div>
      <Hero />
      <CardWrapper />
      <CategoriesForm />
    </div>
  );
}

export default Home;