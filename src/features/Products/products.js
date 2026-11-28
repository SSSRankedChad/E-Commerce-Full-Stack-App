import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../components/Product/product.js';
import Navbar from '../../components/Navbar/navbar.js';
import { loadProducts, selectProducts, selectProduct, selectProductId, clearProdStatusUpdates, selectProductLoadSuccess, selectProductsLoadError, selectProductPending, getProductById } from '../../store/Product/productSlice.js';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';


const Products = ({product}) => {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const products = useSelector(selectProducts);
  const productLoadSuccess = useSelector(selectProductLoadSuccess);
  const loadProductError = useSelector(selectProductsLoadError);
  const productLoading = useSelector(selectProductPending);
  const dispatch = useDispatch();


  useEffect(() => {
    if(productLoadSuccess) {
      dispatch(clearProdStatusUpdates());
    }
  }, [productLoadSuccess, dispatch]);


  useEffect(() => {
      dispatch(loadProducts());
   }, [dispatch]);

  if(productLoading) {
    return (
     <div className="Product__loading__container">
      <ul className="Product__list">
       {arr.map((product => <li key="product"><Ring
         size="30"
         stroke="5"
         bg-opacity="0"
         speed="0.8"
         color="black" />
        </li>))}
      </ul>
     </div>
    );
  }
  return (
    <div className="Products">
     <Navbar /> 
      <div className="Products__container">
         <ul className="Products__list">
         {loadProductError && <Alert severity="error" msg={loadProductError} onClose={() => dispatch(clearProdStatusUpdates())}/>}
         {products.map((product) => <li key={product.id}><Product product={product}/></li>)}
         <Button> <Link to="/home"> Home </Link></Button>
       </ul>
      </div>
    </div>
  );
}

export default Products;
