import React from 'react';
import Header from '../../components/Header/header.js';
import Product from '../../components/Product/product.js';
import Navbar from '../../components/Navbar/navbar.js';


const Home = () => {
  return (
    <section className="home__container">
      <Navbar />
      <Header />
      <Product />
    </section>
  );
}

export default Home;
