import React from 'react'
import './ProductCard.scss';
import MainBtn from '../MainBtn';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { getFarmById, getMeasures } from '../../services/api';
import { getCategoryByProductId } from '../../services/api';
import { useSelector } from 'react-redux';

const ProductCard = ({ productId, title_us, title_ua, descr_us, descr_ua, imgUrl, price, datedPrice, rating, freshness, farmId, amount, view, wishlisted, measureId }) => {

  const sale = datedPrice ? Math.round((1 - price / datedPrice) * 100) : null;
  const [farm, setFarm] = React.useState();
  const [category, setCategory] = React.useState();
  const [measure, setMeasure] = React.useState();

  const currLang = useSelector(({ localiz }) => localiz.language);
  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)



  React.useEffect(() => {
    const getFarm = async () => {
      const farm = await getFarmById(farmId);
      setFarm(farm[0]);
    }
    const getCategory = async () => {
      //console.log('productId', productId)
      const categoryFetch = await getCategoryByProductId(productId);
      //console.log('categoryFetch', categoryFetch)
      setCategory(categoryFetch)
      //console.log('category', category)
    }
    const getMeasure = async () => {
      let measure = await getMeasures();
      measure = measure.filter(item => item.measureId == measureId);
      setMeasure(measure[0]);
    }
    getCategory();
    getFarm();
    getMeasure();

  }, [])

  const imgArr = imgUrl ? JSON.parse(imgUrl) : [''];

  let shrinkedDescrUA = descr_ua;
  let shrinkedDescrUS = descr_us;
  shrinkedDescrUA = shrinkedDescrUA.split(" ").slice(0, 6).join(" ");
  shrinkedDescrUS = shrinkedDescrUS.split(" ").slice(0, 9).join(" ");

  return (
    <div className={`productCard ${view}`}>
      {view === 'grid' ?
        (<>
          <Link to={`/${category?.path}/products/${productId}`}>
            {sale && <div className="productCard__sale">-{sale}%</div>}
            <div className='productCard__img'>
              <img src={imgArr[0]} alt={title_us} />
            </div>
            <div className='productCard__text'>
              <h2 className='productCard__title'>{currLang == 'UA' ? title_ua : title_us}</h2>
              <p className='productCard__descr'>
                {currLang == 'UA' ? shrinkedDescrUA : shrinkedDescrUS}
                ...</p>
            </div>
          </Link>
          <Rating itemName={title_us} rate={rating} color='gold' />
          <div className="productCard__bottom">
            <div className="productCard__price">
              <b className='productCard__price-actual'>{currLang == 'UA' ?
                `${(Math.floor((price * currRate) * 100) / 100)} грн.` :
                `${price} USD`}</b>
              {sale > 0 ?
                <s className='productCard__price-dated'>{currLang == 'UA' ?
                  `${(Math.floor((datedPrice * currRate) * 100) / 100)} грн.` :
                  `${datedPrice} USD`}</s> :
                null}
            </div>
            <Link
              to={`/${category?.path}/products/${productId}`}
              onClick={() => console.log('clicked')}
              className='link-cart'>
              <MainBtn
                size='small'
                type='2'
                text={currLang == 'UA' ? 'Детальніше' : 'Details'}
                currLang={currLang == 'UA' ? 'UA' : 'US'}
              />
            </Link>
          </div>
        </>) :
        (
          <>
            <div className="productCard__img">
              <img src={imgArr[0]} alt={title_us} />
            </div>
            <div className="productCard__content">
              <div className="productCard__info">
                <div className="productCard__title">{currLang == 'UA' ? title_ua : title_us}</div>
                <div className="productCard__descr">{currLang == 'UA' ? shrinkedDescrUA : shrinkedDescrUS}...</div>
                <Rating itemName={title_us} rate={rating} color='gold' />
                <dl className="productCard__specs">
                  <div>
                    <dt>{currLang == 'UA' ? 'Свіжість' : 'Freshness'}:</dt>
                    <dd>{freshness} {currLang == 'UA' ? 'д. з доставки' : 'days old'}</dd>
                  </div>
                  <div>
                    <dt>{currLang == 'UA' ? 'Ферма' : 'Farm'}:</dt>
                    <dd>{currLang == 'UA' ? farm?.title_ua : farm?.title_us}</dd>
                  </div>
                  <div>
                    <dt>{currLang == 'UA' ? 'Кількість' : 'Amount'}</dt>
                    <dd>{amount} {currLang == 'UA' ? measure?.title_ua : measure?.title_us}</dd>
                  </div>
                </dl>
              </div>
              <div className="productCard__orderInfo">
                <div className="productCard__price">
                  <b className="productCard__price-actual">{currLang == 'UA' ? `${(Math.floor((price * currRate) * 100) / 100)} грн.` : `${price} USD`}</b>
                  {sale > 0 ?
                    <s className='productCard__price-dated'>{currLang == 'UA' ?
                      `${(Math.floor((datedPrice * currRate) * 100) / 100)} грн.` :
                      `${datedPrice} USD`}</s> :
                    null}
                </div>
                <div className="productCard__shipping">
                  <b>{currLang == 'UA' ? 'Безкоштовна доставка' : 'Free Shipping'}</b>
                  {/* <p>Delivery in 1 day</p> */}
                </div>
                <div className='productCard__buttons'>
                  <Link to={`/${category?.path}/products/${productId}`}>
                    <MainBtn size='medium' type='2' text={currLang == 'UA' ? 'Детальніше' : 'Product details'} />
                  </Link>
                  {/* может быть изменить кнопку снизу*/}
                  {/* <button className='productCard__wishlist' onClick={onToggleWishlist}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_37475_131580)">
                        <path style={{ fill: wishlisted ? 'black' : 'none' }} fillRule="evenodd" clipRule="evenodd" d="M9.13062 3.26001C9.76714 2.62349 10.6304 2.2659 11.5306 2.2659C12.4308 2.2659 13.2941 2.62349 13.9306 3.26001C14.5671 3.89653 14.9247 4.75984 14.9247 5.66001C14.9247 6.56019 14.5671 7.42349 13.9306 8.06001L13.0573 8.93334L8.25729 13.7333L3.45729 8.93334L2.58396 8.06001C1.94744 7.42349 1.58984 6.56019 1.58984 5.66001C1.58984 4.75984 1.94744 3.89653 2.58396 3.26001C3.22048 2.62349 4.08378 2.2659 4.98396 2.2659C5.88413 2.2659 6.74744 2.62349 7.38396 3.26001L8.25729 4.13334L9.13062 3.26001Z" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>
                    <p>Add to wish list</p>
                  </button> */}
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default ProductCard;

// const onToggleWishlist = () => {
//   wishlisted ?
//     dispatch(removeFromWishlist(productId)) :
//     dispatch(addToWishList(productId));
// }

// const addToCart=()=>{
//   localStorage.setItem('cartData', );
// }