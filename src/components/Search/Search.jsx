import React from 'react'
import './Search.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice';
import { debounce } from 'lodash';
import { getProductsByTitle } from '../../services/api';

const emptySvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='800'
    height='800'
    viewBox='0 0 14 14'
  >
    <path d='M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14'></path>
    <path
      fill='var(--svg-status-bg, #fff)'
      d='M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12'
    ></path>
    <path d='M8.16 7.184c.519-.37.904-.857 1.07-1.477.384-1.427-.619-2.897-2.246-2.897-.732 0-1.327.26-1.766.692a2.2 2.2 0 0 0-.509.743.75.75 0 0 0 1.4.54.8.8 0 0 1 .16-.213c.168-.165.39-.262.715-.262.597 0 .936.496.798 1.007-.067.249-.235.462-.492.644-.231.165-.47.264-.601.3a.75.75 0 0 0-.556.724v1.421a.75.75 0 0 0 1.5 0v-.909a4 4 0 0 0 .526-.313z'></path>
    <circle cx='6.889' cy='10.634' r='1'></circle>
  </svg>
);

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [query, setQuery] = React.useState();
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);
  const categories = useSelector(({ categories }) => categories.categories);
  const currLang = useSelector(({ localiz }) => localiz.language);
  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)

  const fetchProducts = async (searchQuery) => {
    const response = await getProductsByTitle(searchQuery);
    setProducts(response);
  };

  const handleClickOutside = e => {
    e.target.value ? setPopupIsOpen(true) : setPopupIsOpen(false);
  }


  const handleChange = React.useCallback(
    debounce(e => {
      setPopupIsOpen(true)
      const value = e.target.value;
      setQuery(value)
      fetchProducts(value)
    }, 1000), [])

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  return (
    <div className="searchBlock">
      <form>
        <input
          type="text"
          className='searchBlock-input'
          placeholder={currLang == 'UA' ? 'Пошук продуктів...' : 'Search Products'}
          onChange={handleChange} />
      </form>
      <button>
        <svg className='searchBlock-searchSvg' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.19303 10.4333C10.7704 10.4333 12.8597 8.34394 12.8597 5.76661C12.8597 3.18928 10.7704 1.09995 8.19303 1.09995C5.61571 1.09995 3.52637 3.18928 3.52637 5.76661C3.52637 8.34394 5.61571 10.4333 8.19303 10.4333Z" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
          <path d="M4.81319 9.24002L1.68652 12.3667" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>
      </button>
      <ul className='searchBlock-popup'>
        {
          popupIsOpen && products?.map(item => {
            const category = categories.find(cat => cat.catId == item.categoryId);
            const path = `/${category.path}/products/${item.productId}`;
            return (<Link key={`/${category.path}/products/${item.productId}`} to={path}>
              <li key={item.productId + item?.title_us + item.title_ua} className='searchBlock-popup__item popup-item'>
                <div className="popup-item__img">
                  <img src={item.imgUrl[0]} alt="404" />
                </div>
                <div className="popup-item__text">
                  <h3 className="popup-item__title">{currLang == 'UA' ? item.title_ua : item?.title_us}</h3>
                  <p className="popup-item__price">{currLang == 'UA' ? `${(item.price * currRate).toFixed(2)} грн.` : `${item.price} usd.`}</p>
                </div>
              </li>
            </Link>
            )
          }
          )
        }
        {popupIsOpen && products?.length < 1 ?
          <div className='popup-empty'>
            {emptySvg}
            <div>{currLang == 'UA' ? 'Нажаль нічого не знайдено' : 'Not found'}</div>
          </div>
          : null}
      </ul>
    </div>
  )
}

export default Search;