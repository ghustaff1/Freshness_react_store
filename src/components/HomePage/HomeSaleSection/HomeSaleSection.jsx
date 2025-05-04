import React from 'react'
import './HomeSaleSection.scss';
import MainBtn from '../../MainBtn';
import GreenLink from '../../GreenLink';
import ProductCard from '../../ProductCard/ProductCard';
import AsideTitle from '../../AsideTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/scss'; // core Swiper
import 'swiper/scss/navigation'; // Navigation module
import 'swiper/scss/pagination';
import 'swiper/scss/grid'


const HomeSaleSection = ({ title, products, links, className }) => {

  //console.log('links', links)

  return (
    <div className={`HomeSaleSection ${className}`}>
      <div className="container">
        <div className='HomeSaleSection__wrapper'>
          {/* <aside className='HomeSaleSection__aside'>
            <AsideTitle value={title} />
            <ul>
              {links?.map(link => {
                return <li key={link}><GreenLink underline={true} value={link} /></li>;
              })}
            </ul>
            <MainBtn type='3' size='medium' text='More products' dir='next' />
          </aside> */}
          <h2 className="HomeSaleSection__title">{title}</h2>


          <div className='HomeSaleSection__cards'>

            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={15}
              slidesPerView={4}
              autoHeight={true}
              
              navigation
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log('slide change')}
            >
              {products?.map(item => {
                return (
                  <SwiperSlide key={item.title_us}>
                    <ProductCard key={item.productId} {...item} view='grid' />
                  </SwiperSlide>
                )
              })}
            </Swiper>

            {/* {products?.map(item => <ProductCard key={item.productId} {...item} view='grid' />)} */}
          </div>
        </div>
      </div>
    </div>
  )
};


export default HomeSaleSection;