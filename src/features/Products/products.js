import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../components/Product/product.js';
import { loadProducts, selectProducts, selectProduct, selectProductId, clearProdStatusUpdates, selectProductLoadSuccess, selectProductsLoadError, selectProductPending, getProductById } from '../../store/Product/productSlice.js';
import Loader from '../../components/Loader/loader.js';
import Alert from '@mui/material/Alert';


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
       {arr.map((product => <li key="product"><Loader /></li>))}
      </ul>
     </div>
    );
  }
  return (
    <div className="Products">
      <div className="Products__container">
         <ul className="Products__list">
         {loadProductError && <Alert severity="error" msg={loadProductError} onClose={() => dispatch(clearProdStatusUpdates())}/>}
         {products.map((product) => <li key={product.id}><Product product={product}/></li>)}
       </ul>
      </div>
    </div>
  );
}

export default Products;
