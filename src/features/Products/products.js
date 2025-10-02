import React, {useState, useEffect} from 'React';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../Product/product.js';


//call getProducts from productSlice 
//create array mapped for each product for product loading
//make products a unordered list and then call the map method on the Product component along with sortOptions array and categories array
