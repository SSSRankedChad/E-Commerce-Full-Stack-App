import React from 'react';
import Header from '../../components/Header/header.js';
import Products from '../Products/products.js';
import Navbar from '../../components/Navbar/navbar.js';


const Home = () => {
  return (
    <section className="home__container">
      <Navbar />
      <Header />
      <Products />
    </section>
  );
}

export default Home;
