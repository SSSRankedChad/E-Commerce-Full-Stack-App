import React from 'react';
import Header from '../../components/Header/header.js';
import Product from '../../components/Product/product.js';



const Home = () => {
  return (
    <section className="home__container">
      <Header />
      <Product />
    </section>
  );
}

export default Home;
