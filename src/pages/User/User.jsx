import React from 'react'
import './User.scss';
import MainTitle from '../../components/MainTitle';
import UserPath from '../../components/UserPath';
import { useSelector } from 'react-redux';
import { getOrders, getOrdersByUserId, getProducts } from '../../services/api';
import MainBtn from '../../components/MainBtn';
import { Link } from 'react-router-dom';
const User = () => {

  const [isLoginValid, setIsLoginValid] = React.useState();
  const [products, setProducts] = React.useState();
  const [orders, setOrders] = React.useState();

  const currLang = useSelector(({ localiz }) => localiz.language);
  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)

  const fetchData = async () => {
    const data = await getOrdersByUserId(localStorage.getItem('userId'));

    const productsData1 = data.map(({ userId, ...rest }) => rest);


    let orderIds = data.map(item => item.orderId);
    orderIds = [...new Set(orderIds)]; //для удаления повторов orderId

    const orderData = await getOrders(orderIds);
    console.log(orderData[0]?.date);
    setOrders(orderData);

    // products.forEeach(item=>{
    //   getProducts()
    // })
    const productsData2 = await getProducts({ productId: productsData1.map(({ userId, ...rest }) => rest).map(item => item.productId) });

    const res = productsData1
      ?.map(item => {
        const value = productsData2.find(itemState => itemState.productId === item.productId)
        return { ...item, imgUrl: value.imgUrl, price: value.price }
      });
    setProducts(res);

  }

  const onLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userSurname');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('isLoggedIn');
  }


  React.useEffect(() => {
    const checkAuth = () => {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const currentTime = Date.now();
        const timeDiff = (currentTime - loginTime) / 1000 / 60 / 60;
        if (timeDiff >= 1) {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('loginTime');
          setIsLoginValid(false);
        }
        else {
          setIsLoginValid(true);
        }
      }
      else {
        setIsLoginValid(false);
      }
    }
    checkAuth();
    fetchData();
  }, []);

  const dateNormalizer = (dateStr) => {

    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;


  };



  return (
    isLoginValid ?
      <section className="user">
        <UserPath linksArr={[{ title: currLang == 'UA' ? 'Аккаунт' : 'Account' }]} />
        <div className="container user">
          <div className="user__inner">
            <MainTitle value={currLang == 'UA' ? 'Ваші дані' : 'User information'} />
            <dl className="user__table">
              <div className="user__list-item">
                <dt>{currLang === 'UA' ? 'Прізвище: ' : 'Surname: '} </dt>
                <dd>{localStorage.getItem('userSurname')}</dd>
              </div>
              <div className="user__list-item">
                <dt>{currLang === 'UA' ? 'Номер телефону: ' : 'Phone: '} </dt>
                <dd>{localStorage.getItem('userPhone')}</dd>
              </div>
              <div className="user__list-item">
                <dt>{currLang === 'UA' ? 'Ім\'я: ' : 'Name: '} </dt>
                <dd>{localStorage.getItem('userName')}</dd>
              </div>
              <div className="user__list-item">
                <dt>E-mail: </dt>
                <dd>{localStorage.getItem('userEmail')}</dd>
              </div>
            </dl>
          </div>


          <ul className="user__orders orders">
            <MainTitle value={currLang == 'UA' ? 'Минулі замовлення' : 'Previous orders'} />
            {orders?.map(order =>
              <li key={order.orderId + order.date} className="orders-item">
                <div className='orders-item__info'>
                  <p className="orders-item__id">{currLang == 'UA' ? 'Замовлення' : 'Order'}<span> № {order.orderId}</span></p>
                  <p className="orders-item__date">{dateNormalizer(order.date)}</p>
                  <p className="orders-item__status">{order.complete ?
                    <p>{currLang == 'UA' ? 'Виконано' : 'Complete'}</p>
                    : <p>{currLang == 'UA' ? 'В роботі' : 'In work'}</p>}</p>
                </div>
                <div className="orders-item__imgs">
                  {products?.map(item => {
                    if (order.orderId === item.orderId)
                      return <div key={order.orderId + item.imgUrl} className="orders-item__img">
                        <img src={JSON.parse(item.imgUrl)[0]} alt="" />
                      </div>
                  })}
                </div>
                <div className="orders-item__price">{currLang == 'US' ? products?.filter(item => item.orderId === order.orderId).reduce((acc, value) => acc + (value.price * value.amount), 0) + ' USD'
                  : (products?.filter(item => item.orderId === order.orderId).reduce((acc, value) => acc + (value.price * value.amount), 0) * currRate).toFixed(2) + ' грн.'} </div>
              </li>
            )}
            {/* <li className="orders-item">
              <div className='orders-item__info'>
                <p className="orders-item__id">Замовлення <span>№ 123123</span></p>
                <p className="orders-item__date">від 16.03.2025 19:50</p>
                <p className="orders-item__status">Виконано</p>
              </div>
              <div className="orders-item__imgs">
                <div className="orders-item__img">
                  <img src="/img/items/Drinks/Spiced_Mulled_Wine_Mix/Spiced_Mulled_Wine_Mix1.webp" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/04/bananas01.jpg" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/Drinks/Raw_Milk/Raw_Milk1.jpg" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/MeatAndFish/Turkey_Fillet/Turkey_Fillet1.webp" alt="" />
                </div>
              </div>
              <div className="orders-item__price">2200 грн.</div>
            </li>
            <li className="orders-item">
              <div className='orders-item__info'>
                <p className="orders-item__id">Замовлення <span>№ 123123</span></p>
                <p className="orders-item__date">від 16.03.2025 19:50</p>
                <p className="orders-item__status">Виконано</p>
              </div>
              <div className="orders-item__imgs">
                <div className="orders-item__img">
                  <img src="/img/items/Drinks/Spiced_Mulled_Wine_Mix/Spiced_Mulled_Wine_Mix1.webp" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/04/bananas01.jpg" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/Drinks/Raw_Milk/Raw_Milk1.jpg" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/MeatAndFish/Turkey_Fillet/Turkey_Fillet1.webp" alt="" />
                </div>
              </div>
              <div className="orders-item__price">2200 грн.</div>
            </li>
            <li className="orders-item">
              <div className='orders-item__info'>
                <p className="orders-item__id">Замовлення <span>№ 123123</span></p>
                <p className="orders-item__date">від 16.03.2025 19:50</p>
                <p className="orders-item__status">Виконано</p>
              </div>
              <div className="orders-item__imgs">
                <div className="orders-item__img">
                  <img src="/img/items/Drinks/Spiced_Mulled_Wine_Mix/Spiced_Mulled_Wine_Mix1.webp" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/04/bananas01.jpg" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/Drinks/Raw_Milk/Raw_Milk1.jpg" alt="" />
                </div>
                <div className="orders-item__img">
                  <img src="/img/items/MeatAndFish/Turkey_Fillet/Turkey_Fillet1.webp" alt="" />
                </div>
              </div>
              <div className="orders-item__price">2200 грн.</div>
            </li> */}
          </ul>

          <Link
            onClick={onLogout}
            to='/'
            className="user__logout">
            <MainBtn
              size='large'
              type='2'
              text={currLang == 'UA' ? 'Вийти за акаунту' : 'Log out'} />
          </Link>
        </div>
      </section>
      :
      <div>Please log in</div>
  )
}

export default User