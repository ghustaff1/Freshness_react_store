import React from 'react';
import './Reviews.scss';
import HomeSectionTitle from '../../AsideTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/scss'; // core Swiper
import 'swiper/scss/navigation'; // Navigation module
import 'swiper/scss/pagination';
import { errorSvg } from '../../../App';
import { loadingSvg } from '../../../App';
import { getReviews } from '../../../services/api';
import { useSelector } from 'react-redux';

const Reviews = () => {
  const [reviews, setReviews] = React.useState(null);
  const [error, setError] = React.useState(false);

  const currLang = useSelector(({ localiz }) => localiz.language);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews();
      console.log('reviews', data);
      setReviews(data)
    }
    try {
      fetchData();
    }
    catch (error) {
      console.error(error);
      setError(true);
    }


  }, []);


  return (
    error ? (
      <div>
        <p>Error loading reviews</p>
        {errorSvg}
      </div>
    ) :
      <div className="reviews">
        <div className="container">
          <HomeSectionTitle title='Our customers says' />
        </div>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          autoHeight={true}
          navigation
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log('slide change')}
        >
          {reviews?.map(item => {
            return (
              <SwiperSlide key={item.reviewId + item.author}>
                <article>
                  <p className='review__text'>" {currLang === 'UA' ? item.text_ua : item.text_us} "</p>
                  <h3 className='review__name'>{item.author}</h3>
                  <div className='review__img'>
                    <img src={item.imgUrl} alt={'404'} />
                  </div>
                </article>
              </SwiperSlide>
            )
          })}
        </Swiper>
        {/* <Slider {...sliderSettings}>
          {data?.map(obj => {
              return (
                <div key={obj.name}>
                  <article>
                    <p className='review__text'>" {obj.text} "</p>
                    <h3 className='review__name'>{obj.name}</h3>
                    <div className='review__img'>
                      <img src={obj.imgUrl} alt={obj.alt} />
                    </div>
                  </article>
                </div>
              )
            })}
          </Slider> */}
      </div>
  )
}


export default Reviews;