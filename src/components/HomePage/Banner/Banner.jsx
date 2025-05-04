import React, { useState } from 'react'
import ProductCard from '../../ProductCard/ProductCard'
import { getProducts } from '../../../services/api'
import { useSelector } from 'react-redux';
import './Banner.scss';

const Banner = () => {
  const [product, setProduct] = useState();

  const currLang = useSelector(({ localiz }) => localiz.language);


  const getProduct = async () => {
    const data = await getProducts({ productId: 1 })
    console.log('data', data);
    setProduct(data[0]);
  }

  React.useState(() => {
    getProduct();
  })

  return (
    product ?
      <div className="banner">
        <div className="container">
          <h2 className="HomeSaleSection__title">{currLang == 'UA' ? 'Товар тижня' : 'Product of the week'}</h2>
          <div className="banner__inner">
            <div className="banner__item banner__item-img">
              <img src="/img/promotion/banner2.jpg" alt="" />
            </div>
            <div className="banner__item">
              <ProductCard
                key={product.productId + product.measureId}
                {...product}
                view='grid' />
            </div>
          </div>
        </div>
      </div>
      :
      <>loading</>
  )
}

export default Banner 