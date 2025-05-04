import React from 'react';
import './Cart.scss';
import CartItem from '../../components/CartItem/CartItem';
import MainBtn from '../../components/MainBtn';
import { useSelector } from 'react-redux';
import UserPath from '../../components/UserPath';
import { clearCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const emptySvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width='800'
    height='800'
    version='1.1'
    viewBox='0 0 504.6 504.6'
  >
    <path d='M143.2 336.7c-8 0-15.2-5.6-16.8-13.6L87.2 140.7c-2.4-9.6 4-18.4 13.6-20.8s18.4 4 20.8 13.6l39.2 182.4c1.6 9.6-4 18.4-13.6 20.8zM278.4 336.7h-4c-9.6-2.4-15.2-11.2-13.6-20.8L300 133.5c2.4-9.6 11.2-15.2 20.8-13.6 9.6 2.4 15.2 11.2 13.6 20.8l-39.2 182.4c-1.6 8-8.8 13.6-16.8 13.6M212 333.5c-9.6 0-16-8-16-17.6V133.5c0-9.6 6.4-9.6 16-9.6s16 0 16 9.6v182.4c0 9.6-6.4 17.6-16 17.6'></path>
    <path
      fill='#18456D'
      d='M420.8 138.3c1.6-5.6.8-9.6-2.4-14.4-3.2-4-8.8-5.6-14.4-5.6H17.6c-5.6 0-10.4 1.6-14.4 5.6-3.2 4.8-4 9.6-2.4 15.2L60 329.5c2.4 7.2 8.8 12.8 16.8 12.8h268c8 0 14.4-5.6 16.8-12.8l17.6-56c1.6-2.4 1.6-4.8 2.4-7.2zm-359.2 76H360l-9.6 32H71.2zm319.2-64-9.6 32H50.4l-9.6-32zm-291.2 160-7.2-32H340l-8 32z'
    ></path>
    <g fill='#0B3249'>
      <path d='M404 126.3H17.6c-5.6 0-10.4 1.6-14.4 5.6-1.6 1.6-2.4 3.2-3.2 5.6v.8l60 191.2c2.4 7.2 8.8 12.8 16.8 12.8h268c8 0 14.4-5.6 16.8-12.8l17.6-56c1.6-2.4 1.6-4.8 2.4-7.2l40-128v-1.6c-.8-2.4-1.6-3.2-3.2-4.8-3.2-4-8.8-5.6-14.4-5.6m-64 160-8 32H89.6l-7.2-32H84l-1.6-8H340l-1.6 8zm20-64-9.6 32H71.2l-9.6-32H64l-2.4-8H360l-2.4 8zm20.8-64-9.6 32H50.4l-9.6-32h2.4l-2.4-8h340l-2.4 8zM354.4 406.3H67.2c-9.6 0-17.6-10.4-17.6-20s8-20 17.6-20h287.2c9.6 0 17.6 10.4 17.6 20s-8 20-17.6 20'></path>
    </g>
    <path d='M81.6 406.3h113.6c0-16-16-32-34.4-40H99.2c-10.4 8-17.6 24-17.6 40'></path>
    <path
      fill='#0E3451'
      d='M168.8 403.9c0 24-19.2 46.4-43.2 46.4s-43.2-22.4-43.2-46.4 19.2-43.2 43.2-43.2c24-.8 43.2 19.2 43.2 43.2'
    ></path>
    <path
      fill='#2689C6'
      d='M168.8 403.9c0 24-19.2 43.2-43.2 43.2s-43.2-19.2-43.2-43.2 19.2-47.2 43.2-47.2 43.2 23.2 43.2 47.2'
    ></path>
    <circle cx='125.6' cy='403.9' r='43.2' fill='#1B5A89'></circle>
    <path
      fill='#18456D'
      d='M94.4 372.7c16.8-16.8 44.8-16.8 61.6 0s16.8 44.8 0 61.6'
    ></path>
    <path
      fill='#0B3249'
      d='M125.6 429.5c-14.4 0-25.6-11.2-25.6-25.6s11.2-25.6 25.6-25.6 25.6 11.2 25.6 25.6-12 25.6-25.6 25.6'
    ></path>
    <path d='M143.2 385.5c10.4 10.4 10.4 26.4 0 36.8s-26.4 10.4-36.8 0M242.4 406.3H356c0-16-16-32-34.4-40H260c-10.4 8-17.6 24-17.6 40'></path>
    <path
      fill='#0E3451'
      d='M329.6 403.9c0 24-19.2 46.4-43.2 46.4s-43.2-22.4-43.2-46.4 19.2-43.2 43.2-43.2c23.2-.8 43.2 19.2 43.2 43.2'
    ></path>
    <path
      fill='#2689C6'
      d='M329.6 403.9c0 24-19.2 43.2-43.2 43.2s-43.2-19.2-43.2-43.2 19.2-47.2 43.2-47.2c23.2 0 43.2 23.2 43.2 47.2'
    ></path>
    <circle cx='285.6' cy='403.9' r='43.2' fill='#1B5A89'></circle>
    <path
      fill='#18456D'
      d='M255.2 372.7c16.8-16.8 44.8-16.8 61.6 0s16.8 44.8 0 61.6'
    ></path>
    <path
      fill='#0B3249'
      d='M285.6 429.5c-14.4 0-25.6-11.2-25.6-25.6s11.2-25.6 25.6-25.6 25.6 11.2 25.6 25.6c.8 14.4-11.2 25.6-25.6 25.6'
    ></path>
    <path d='M304 385.5c10.4 10.4 10.4 26.4 0 36.8s-26.4 10.4-36.8 0'></path>
    <path
      fill='#1B5A89'
      d='M500 70.3c0 8.8-7.2 16-16 16h-72c-8.8 0-16-7.2-16-16s7.2-16 16-16h72c8.8 0 16 7.2 16 16'
    ></path>
    <path
      fill='#18456D'
      d='M412 54.3c-8 0-12.8 4.8-15.2 12 2.4 7.2 9.6 12 17.6 12H484c8 0 12.8-4.8 15.2-12-.8-5.6-7.2-12-15.2-12z'
    ></path>
    <circle cx='395.2' cy='167.1' r='108.8' fill='#1AD85A'></circle>
    <path
      fill='#0FA862'
      d='M395.2 58.3c60 0 108.8 48.8 108.8 108.8s-48.8 108.8-108.8 108.8'
    ></path>
    <path
      fill='#19BF55'
      d='M318.4 90.3c42.4-42.4 111.2-42.4 154.4 0 42.4 42.4 42.4 111.2 0 154.4'
    ></path>
    <g fill='#FFF'>
      <path d='M396 195.1c-3.2 0-8-2.4-8-4.8v-18.4c0-3.2 3.2-4.8 6.4-4.8 12 0 21.6-9.6 21.6-21.6s-9.6-21.6-21.6-21.6-21.6 9.6-21.6 21.6c0 3.2-2.4 4.8-4.8 4.8-3.2 0-4.8-2.4-4.8-4.8 0-17.6 14.4-32 32-32s33.6 14.4 33.6 32c0 16-16.8 28.8-24.8 31.2v13.6c0 2.4-4.8 4.8-8 4.8'></path>
      <circle cx='396' cy='214.3' r='7.2'></circle>
    </g>
  </svg>
);

const Cart = () => {
  const navigate = useNavigate();

  const items = useSelector(({ cart }) => cart.items);
  const totalPrice = items.reduce((acc, cur) => acc + (cur.price * cur.amount), 0);

  const currLang = useSelector(({ localiz }) => localiz.language);
  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)

  const dispatch = useDispatch();

  const onClear = () => {
    dispatch(clearCart());
  }
  const onOrder = () => {
    if (!items || items.length < 1) {
      alert('Кошик порожній!')
    }
    else {
      navigate('/order');
    }
  }


  return (
    items.length > 0 ?
      <div className="cart">
        <UserPath linksArr={[{ title: currLang == 'UA' ? 'Кошик' : 'Cart' }]} />
        <div className="container">
          <div className="cart__top">
            <h2 className="cart__title">{currLang == 'UA' ? 'Кошик' : 'Cart'}</h2>
            <div
              className="cart__clear"
              onClick={onClear}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <p>{currLang == 'UA' ? 'Очистити кошик' : 'Clear cart'}</p>
            </div>
          </div>
          <ul className="cart__items">
            {items.map(obj => <CartItem
              key={obj.productId + obj.title_us}
              productId={obj.productId}
              title_us={obj.title_us}
              title_ua={obj.title_ua}
              imgUrl={obj.imgUrl}
              amount={obj.amount}
              price={obj.price}
            />)}

          </ul>
          <div className="cart__bottom">
            <div className="cart__details">
              <span >
                <p>{currLang == 'UA' ? 'Кількість:' : 'Amount:'}</p>
                <p className="cart__amount">{items.length} {currLang == 'UA' ? 'шт.' : 'pcs.'}</p>
              </span>
              <span>
                <p>{currLang == 'UA' ? 'Всього:' : 'Total price:'}</p>
                <p className='cart__totalPrice'>
                  {currLang == 'UA' ? (totalPrice * currRate).toFixed(2) + ' грн.' : (totalPrice).toFixed(2) + ' USD'}
                </p>
              </span>
            </div>
            <div className="cart__nav">
              <Link
                to='/'>
                <MainBtn className="cart__goBackBtn"
                  size='medium'
                  type='3'
                  text={currLang == 'UA' ? 'Продовжити покупки' : 'Continue shopping'}
                  dir='prev' />
              </Link>
              <div
                onClick={() => onOrder()}>
                <MainBtn
                  className="cart__paymentBtn"
                  size='medium'
                  type='2'
                  text={currLang == 'UA' ? 'Оформити замовлення' : 'Make an order'}
                  dir='next' />
              </div>
            </div>
          </div>
        </div>
      </div>
      : <div className='empty'>
        <div className='empty__svg'>
          {emptySvg}
        </div>
        <div className='empty__title'>
          {currLang == 'UA' ? 'Кошик порожній!' : 'Cart is empty!'}

        </div>
      </div>
  )
}

export default Cart