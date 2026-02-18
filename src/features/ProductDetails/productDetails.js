import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/product.js';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader/loader.js';
import { selectProductId, selectProduct, getProductById, selectProductPending, selectProductLoadSuccess, selectProductPendError, clearProdStatusUpdates  } from '../../store/Product/productSlice.js';


const ProductDetails = () => {
    const product = useSelector(selectProduct);
    const { productId } = useParams();
    const productLoading = useSelector(selectProductPending);
    const productLoadSuccess = useSelector(selectProductLoadSuccess);
    const productLoadError = useSelector(selectProductPendError);
    const dispatch = useDispatch();

    console.log(productId);

    useEffect(() => {
        if(productId) {
            dispatch(getProductById(productId));
          }
      }, [dispatch, productId]);


    useEffect(() => {
        if(productLoadSuccess) {
            dispatch(clearProdStatusUpdates());
          }
      }, [dispatch]);


    if(productLoading) {
        <div className="Product__details__loader">
         <Loader />
        </div>
      }

    if(!product || !productId) {
        return (
         <div className="Product__details__empty">
           <p> No product here! </p>
         </div> 
        )
     }

    return (
       <div className="Product__details__page__container">
        <h2 className="Product__details__header"> Product Page </h2> 
         {productLoadError && <Alert severity="error" msg={productLoadError} onClose={() => dispatch(clearProdStatusUpdates())}/>}
        <Product page="details" product={product} />
       </div> 
    );

}


export default ProductDetails;
