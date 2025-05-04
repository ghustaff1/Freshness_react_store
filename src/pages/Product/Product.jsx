import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Product.scss';
import MainTitle from '../../components/MainTitle';
import AddToWishList from '../../components/ProductPage/AddToWishList/AddToWishList';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import UserPath from '../../components/UserPath';
import Rating from '../../components/Rating/Rating';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { loadingSvg } from '../../App';
import { getCategoryByProductId, getFarmById, getMeasures, getProducts } from '../../services/api';


const sliderSettings = {
  className: 'slider',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const Product = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  //const [failed, setFailed] = React.useState(false);
  const [amount, setAmount] = React.useState(1);
  const [category, setCategory] = React.useState({ title_ua: 'f' });
  const [farm, setFarm] = React.useState();
  const [measure, setMeasure] = React.useState();

  const dispatch = useDispatch();
  let { productId } = useParams();

  const carted = useSelector(({ cart }) => cart.items.find(obj => obj.productId === productId));
  //const wishlisted = useSelector(({ wishlist }) => wishlist.items.includes(productId));
  const currLang = useSelector(({ localiz }) => localiz.language);
  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)

  const [pathLinks, setPathLinks] = React.useState([]);

  const sale = product.datedPrice ? Math.round((1 - product.price / product.datedPrice) * 100) : null;

  React.useEffect(() => {

    const fetchData = async () => {
      const data = await getProducts({ productId });
      data[0].imgUrl = JSON.parse(data[0].imgUrl);
      if (data) {
        setProduct(data[0]);
        setLoading(false);
      }
      else {
        setLoading(false);
      }
      const categoryData = await getCategoryByProductId(productId);
      setCategory(categoryData);
      const farmData = await getFarmById(data[0].farmId);
      setFarm(farmData[0])
      let measureData = await getMeasures();
      measureData = measureData.filter(item => item.measureId == data[0].measureId);
      setMeasure(measureData[0]);

      const path = [];
      if (currLang == 'UA') {
        path.push({ path: categoryData.path, title: categoryData.title_ua, id: categoryData.categoryId })
        path.push({ title: data[0].title_ua })
      }
      else {
        path.push({ path: categoryData.path, title: categoryData.title_us, id: categoryData.categoryId })
        path.push({ title: data[0].title_us })
      }

      setPathLinks(path);
    }
    fetchData();
  }, [currLang, productId]);


  const onChangeAmount = (e) => {
    //сделать проверку на число
    //сделать alert если ввели больше, чем имеется
    if (+e.currentTarget.value > product.amount)
      setAmount(product.amount);
    else
      setAmount(e.currentTarget.value);
  }
  const onToggleCart = () => {
    carted ?
      dispatch(removeFromCart({
        productId,
      })) :
      dispatch(addToCart({
        productId,
        title_us: product.title_us,
        title_ua: product.title_ua,
        imgUrl: product.imgUrl,
        amount,
        price: product.price,
        datedPrice: product.datedPrice,
        farmTitleUS: farm.title_us,
        farmTitleUA: farm.title_ua,
        measureTitleUS: measure.title_us,
        measureTitleUA: measure.title_ua,
        rating:product.rating
      }))

  }
  // const onToggleWishlist = () => {
  //   wishlisted ?
  //     dispatch(removeFromWishlist(productId)) :
  //     dispatch(addToWishList(productId));
  // }
console.log('CURLANG', currLang);
  const cartBtnTitleAdd=currLang=='UA'?'Додати у кошик':'Add to cart';
  const cartBtnTitleRemove=currLang=='UA'?'Видалити з кошика':'Remove from cart';


  const content = currLang == 'UA' ?
    <div className="product">
      <UserPath linksArr={Array.isArray(pathLinks) ? pathLinks : null} />
      <div className="container">
        <div className='product__wrapper'>
          <Slider {...sliderSettings}>
            {product.imgUrl?.map(url =>
              <div key={url}>
                <img src={url} alt={product.title} />
                {sale && <div className="product__sale">- {sale}%</div>}
              </div>
            )}
          </Slider>
          <div className="product__content">
            <MainTitle value={product.title_ua} />
            {/* rating */}
            <Rating itemName={product.title_ua} rate={product.rating} color='gold' />
            <p className="product__descr">{product.descr_ua}</p>
            <dl className="product__info">
              <div>
                <dt>Артикул:</dt>
                <dd>{product.productId}</dd>
              </div>
              <div>
                <dt>Категорія:</dt>
                <dd>{category?.title_ua}</dd>
              </div>
              <div>
                <dt>Наявність:</dt>
                <dd>{product.amount ? 'Є у наявності' : 'Немає у наявності'}</dd>
              </div>
              <div>
                <dt>Ферма:</dt>
                <dd>{farm?.title_ua}</dd>
              </div>
              <div>
                <dt>Свіжість:</dt>
                <dd>{product.freshness} доби з доставки</dd>
              </div>
              <div>
                <dt>Кількість:</dt>
                <dd>{product.amount} </dd>
              </div>
            </dl>
            <div className="product__order">
              <div className="product__price">
                <p className="product__actualPrice">{((product.price * amount) * currRate).toFixed(2)} грн.</p>
                {product.datedPrice ?
                  <s className="product__datedPrice">{((product.datedPrice * amount) * currRate).toFixed(2)} грн.</s> :
                  null}
              </div>
              <div className="product__order-btns">
                {/* такой же компонент в CartItem */}
                <div className="product__order-amount">
                  <input value={amount} type="text" placeholder={amount}
                    onChange={e => onChangeAmount(e)} />
                  <p className='product__order-measure'>{measure?.title_ua}</p>
                </div>
                <button className='product__order-cart'
                  onClick={onToggleCart}>
                  {carted ?
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>) :
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M6.82812 12.3334V1.66676" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>)}
                  <p>{carted ? "Видалити з корзини" : "Додати в корзину"}</p>
                  {/* <p>{addedToCart.current ? "Remove from cart" : null}</p> */}
                </button>
              </div>
            </div>
            {/* <AddToWishList /> */}
            {/* <BottomProductInfo farmId={data.farmId}
          recipe={'data.recipe'} 
          reviews={['reviews']} 
          id={data.productId} /> */}

          </div>
        </div>
      </div>
    </div>
    :
    <div className="product">
      <div className="container">
        <UserPath linksArr={Array.isArray(pathLinks) ? pathLinks : null} />
        <div className='product__wrapper'>
          <Slider {...sliderSettings}>
            {product?.imgUrl?.map(url =>
              <div key={url}>
                <img src={url} alt={product.title} />
                {sale && <div className="product__sale">- {sale}%</div>}
              </div>
            )}
          </Slider>
          <div className="product__content">
            <MainTitle value={product.title_us} />
            {/* rating */}
            <Rating key={product.title_us + product.rating} itemName={product.title+product.imageUrl} rate={product.rating} color='gold' />
            <p className="product__descr">{product.descr_us}</p>
            <dl className="product__info">
              <div>
                <dt>SKU:</dt>
                <dd>{product.productId}</dd>
              </div>
              <div>
                <dt>Category:</dt>
                <dd>{category?.title_us}</dd>
              </div>
              <div>
                <dt>Stock:</dt>
                <dd>{product?.amount ? 'In Stock' : 'Unavailable'}</dd>
              </div>
              <div>
                <dt>Farm:</dt>
                <dd>{farm?.title_us}</dd>
              </div>
              <div>
                <dt>Freshness:</dt>
                <dd>{product?.freshness} days old</dd>
              </div>
              <div>
                <dt>Amount:</dt>
                <dd>{product?.amount}</dd>
              </div>
            </dl>
            <div className="product__order">
              <div className="product__price">
                <p className="product__actualPrice">{(product?.price * amount).toFixed(2)} USD</p>
                {product?.datedPrice ?
                  <s className="product__datedPrice">{product?.datedPrice} USD</s> :
                  null}
              </div>
              <div className="product__order-btns">
                {/* такой же компонент в CartItem */}
                <div className="product__order-amount">
                  <input value={amount} type="text" placeholder={amount}
                    onChange={e => onChangeAmount(e)} />
                  <p className='product__order-measure'>{measure?.title_us}</p>
                </div>
                <button className='product__order-cart'
                  onClick={onToggleCart}>
                  {carted ?
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>) :
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M6.82812 12.3334V1.66676" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>)}
                  <p>{carted ? 'Remove from cart' : 'Add to cart'}</p>
                  {/* <p>{addedToCart.current ? "Remove from cart" : null}</p> */}
                </button>
              </div>
            </div>
            {/* <AddToWishList /> */}
            {/* <BottomProductInfo farmId={product.farmId}
            recipe={'product.recipe'} 
            reviews={['reviews']} 
            id={product.productId} /> */}

          </div>
        </div>
      </div>
    </div>


  return (
    loading === true ? loadingSvg : content

  )
}

export default Product;