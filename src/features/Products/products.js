import React, {useState, useEffect} from 'React';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../Product/product.js';
import { loadProducts, clearProdStatusUpdates, selectProductLoadSuccess, selectProductPending, selectProducts, selectProduct, getProductById } from '../../store/Product/productSlice.js';
import { selectSearchTerm } from '../../store/SearchTerm';
import Alert from '@mui/material/Alert/Alert.js';
import Loader from '../../components/Loader/loader.js';


const Products = () => {
  const [categories, setCategories] = useState('');
  const [sort, setSort] = useState('');
  const listCategories = ['', 'Electronic', 'Beauty', 'Accessories', 'Automotive', 'Hardware', 'Gardening'];
  const sortOptions = ['', 'lowest', 'highest'];
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const products = useSelector(selectProducts);
  const product = useSelector(selectProduct);
  const productSuccess = useSelector(selectProductLoadSuccess);
  const loadProductError = useSelector(selectProductLoadError);
  const productId = product?.productId;
  const productLoading = useSelector(selectProductPending);
  const dispatch = useDispatch();


  useEffect(() => {
    if(productLoading) {
      return (
        <div className="Product__loader__container">
          <ul className="Product__list">
           {arr.map((num) => <li key="num"><Loader /></li>)}
          </ul>
        </div>
      );
    }});

  useEffect(() => {
    if(productSuccess) {
      dispatch(clearProdStatusUpdates());
    }
  }, []);

  useEffect(() => {
    dispatch(loadProducts({category, sort}))
  }, [category, sort, searchTerm, dispatch]);


  return (
    <div className="Products">
      <div className="Products__container">
        <span className="Products__category__label">Categories: </span>
        <select className="Products__category" name="category" value={category}>
         {categories.map((category, i) => <option key={`${category}__${i}`} value={category}></option>)}
        </select>
        <span className="Products__options__label"> Options: </span>
        <select className="Products__option" name="option" value={sort}>
         {sortOptions.map((sort, i) => <option key={`${sort}__${i}`} value={category}></option>)}
        </select>
      </div>
       <ul className="Products__list">
         {loadProductError && <Alert severity="error" msg={loadProductError} onClose=(() => dispatch(clearProdStatusUpdates()))}
         {products.map((product) => <li key={product.productId}></li><Product product={product}/>)}
       </ul>
    </div>
  );
