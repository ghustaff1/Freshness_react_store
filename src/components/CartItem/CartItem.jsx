import React from 'react';
import './CartItem.scss';
import { useSelector } from 'react-redux';
import { loadingSvg } from '../../App';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlice';

const CartItem = ({ productId }) => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState(null);
  const currLang = useSelector(({ localiz }) => localiz.language);
  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)


  React.useEffect(() => {
    const fetchData = async () => {
      const item = JSON.parse(localStorage.getItem('cartData')).find(obj => obj.productId === productId)
      setData(item);
    }
    fetchData();

  }, [])

  const onRemove = () => {
    console.log('REMOVING', productId, data.productId)
    dispatch(removeFromCart({
      productId,
    }))
  }


  // if (data === null) return `loading`;

  return (
    data === null ?
      loadingSvg :
      <li className="cart-item">
        <div className='cart-item__img'>
          <img src={data.imgUrl[0]} alt="apples" />
        </div>

        <div className="cart-item__text">
          <p>{currLang == 'UA' ? data.title_ua : data.title_us}</p>
          <p className="cart-item__farm">
            {currLang == 'UA' ? 'Ферма: ' + data.farmTitleUA : 'Farm: ' + data.title_us}
          </p>
        </div>

        <div className="cart-item__amount">
          <input type="text" placeholder={data.amount} />
          <p>
            {currLang == 'UA' ? data.measureTitleUA : data.measureTitleUS}
          </p>
        </div>

        <div className="cart-item__prices">
          <p className="cart-item__actualPrice">
            {currLang == 'UA' ? ((data.price * data.amount) * currRate).toFixed(2) + ' грн.' : (data.price * data.amount).toFixed(2) + ' USD'}
          </p>

          {data.datedPrice ?
            <s className="cart-item__datedPrice">
              {currLang == 'UA' ? ((data.datedPrice * data.amount) * currRate).toFixed(2) + ' грн.' : (data.datedPrice * data.amount).toFixed(2) + ' USD'}
            </s> :
            null}
        </div>

        <button
          className="cart-item__remove"
          onClick={onRemove}>
          <svg fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" fillRule="evenodd" /></svg>
        </button>
      </li>
  )
}

export default CartItem;
