import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../components/Product/product.js';
import { loadProducts, selectSearchTerm, clearProdStatusUpdates, selectProductLoadSuccess, selectProductsLoadError, selectProductPending, getProductById } from '../../store/Product/productSlice.js';
import Loader from '../../components/Loader/loader.js';
import Alert from '@mui/material/Alert';


const Products = ({products}) => {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const listCategories = ['Electronic', 'Beauty', 'Accessories', 'Automotive', 'Hardware', 'Gardening'];
  const sortOptions = ['', 'lowest', 'highest'];
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const searchTerm = useSelector(selectSearchTerm);
  const productLoadSuccess = useSelector(selectProductLoadSuccess);
  const loadProductError = useSelector(selectProductsLoadError);
  const productLoading = useSelector(selectProductPending);
  const dispatch = useDispatch();


  const handleSortChange = ({target}) => {
    setSort(target.value);
  }

  const handleCartChange = ({target}) => {
    setCategory(target.value);
  }


  if(productLoading) {
        <div className="Product__loader__container">
          <ul className="Product__list">
           {arr.map((num) => <li key="num"><Loader /></li>)}
          </ul>
        </div>
  }

  useEffect(() => {
    if(productLoadSuccess) {
      dispatch(clearProdStatusUpdates());
    }
  });

  useEffect(() => {
    dispatch(loadProducts({category, sort}))
  }, [category, sort, searchTerm, dispatch]);


  return (
    <div className="Products">
      <div className="Products__container">
        <span className="Products__category__label">Categories: </span>
        <select className="Products__category" name="category" value={category}>
         {listCategories?.map((category, i) => <option key={`${category}__${i}`} value={category}></option>)}
        </select>
        <span className="Products__options__label"> Options: </span>
        <select className="Products__option" name="option" value={sort}>
         {sortOptions?.map((sort, i) => <option key={`${sort}__${i}`} value={sort}></option>)}
        </select>
      </div>
       <ul className="Products__list">
         {loadProductError && <Alert severity="error" msg={loadProductError} onClose={() => dispatch(clearProdStatusUpdates())}/>}
         {products?.map((product) => <li key={product.productId}><Product product={product} page="details"/></li>)}
       </ul>
    </div>
  );
}

export default Products;
