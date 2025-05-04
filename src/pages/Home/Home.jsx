import React from 'react'
import './Home.scss';
import BestSell from '../../components/HomePage/BestSell/BestSell';
import BestFarmers from '../../components/HomePage/BestFarmers/BestFarmers';
import Reviews from '../../components/HomePage/Reviews/Reviews';
import Cart from '../Cart/Cart';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { Link } from 'react-router-dom';
import BestDiscount from '../../components/HomePage/BestDiscount/BestDiscount';
import Banner from '../../components/HomePage/Banner/Banner';

const Home = () => {

  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [])



  //BestFarmers что то придумать (10.02.25)
  return (
    <div className="home">
      <Banner/>
      <BestSell />
      <BestDiscount/>
      {/* <BestFarmers /> */} 
      
      <Reviews />
    </div>
  )
}

export default Home;