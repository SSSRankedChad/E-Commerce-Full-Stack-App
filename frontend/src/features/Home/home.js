import React from 'react';
import './home.css';
import Header from '../../components/Header/header.js';
import Product from '../component/Product/product.js';



export const Home = () => {
  return (
    <section className="home__container">
      <Header />
      <Product />
    <section />
  );
}
