import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import BestFarmers from './components/HomePage/BestFarmers/BestFarmers';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Category from './pages/Category/Category';
import { initializeCart } from './redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from './redux/slices/categoriesSlice';
import { fetchFarms } from './redux/slices/farmsSlice';
import Blogs from './pages/Blogs/Blogs';
import Blog from './pages/Blog/Blog';
import { fetchExchangeRate } from './redux/slices/localizSlice';
import User from './pages/User/User';
import Order from './pages/Order/Order';

export const loadingSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', background: 'transparent', display: 'block', shapeRendering: 'auto' }} width="200px" height="200px" >
    <g transform="rotate(0 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9285714285714286s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(25.714285714285715 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8571428571428571s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(51.42857142857143 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7857142857142857s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(77.14285714285714 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7142857142857143s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(102.85714285714286 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6428571428571429s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(128.57142857142858 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5714285714285714s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(154.28571428571428 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(180 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.42857142857142855s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(205.71428571428572 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.35714285714285715s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(231.42857142857142 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.2857142857142857s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(257.14285714285717 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.21428571428571427s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(282.85714285714283 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.14285714285714285s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(308.57142857142856 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.07142857142857142s" repeatCount="indefinite" />
      </rect>
    </g><g transform="rotate(334.2857142857143 50 50)">
      <rect x="47" y="20" rx="3" ry="3.24" width="6" height="12" fill="#b3c430">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
  );
export const errorSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }} width="64" height="64" version="1.1" viewBox="0 0 32 32">
    <g transform="scale(2)">
      <circle style={{ fill: '#f44336' }} cx="8" cy="8" r="7" />
      <rect style={{ fill: '#ffffff' }} width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)" />
      <rect style={{ fill: '#ffffff' }} width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)" />
    </g>
  </svg>
)

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFarms());
    dispatch(fetchExchangeRate());
    if (localStorage.getItem('cartData') !== null)
      dispatch(initializeCart());
    else {
      localStorage.setItem('cartData', '');
    }
  }, []);
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path=':category/products/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/:category/:catId' element={<Category />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='blogs/:blogId' element={<Blog />} />
        <Route path='/user' element={<User />} />
        <Route path='/order' element={<Order />} />
      </Route>
    </Routes>
  );
}
export default App;
