import React from 'react'
import UserPath from '../../components/UserPath'
import './Category.scss';
import MainTitle from '../../components/MainTitle'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchCategories } from '../../redux/slices/categoriesSlice'
import AsideTitle from '../../components/AsideTitle';
import Rating from '../../components/Rating/Rating';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination'
import PriceSlider from '../../components/CategoryPage/PriceSlider';
import { getFarmById, getProducts, getProductsAmountByCategoryId } from '../../services/api';
import { getFarmsByCategoryId } from '../../services/api';

const viewType = ['grid', 'list']

const Category = () => {
  const params = useParams();
  const categoryPath = params.category;
  let categoryId = parseInt(params.catId);
  const [view, setView] = React.useState(viewType[0]);
  const [sortPrice, setSortPrice] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [farms, setFarms] = React.useState([]);
  const [chosenFarms, setChosenFarms] = React.useState([]);
  const [chosenRating, setChosenRating] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [sliderPrices, setSliderPrices] = React.useState([]);
  const [productsAmount, setProductsAmount] = React.useState(0);

  let { productId } = useParams();


  const [filters, setFilters] = React.useState({
    farmId: [],
    catId: categoryId,
    rating: [],
    minPrice: '',
    maxPrice: '',
    order: '',
    offset: currentPage
  })

  const categoryData = useSelector(({ categories }) => categories.categories.find(
    category => category.path == categoryPath
  ));
  //const wishListItems = useSelector(({ wishlist }) => wishlist.items);
  const farmsStore = useSelector(({ farms }) => farms.farms);
  const currLang = useSelector(({ localiz }) => localiz.language);
  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)


  const [searchParams, setSearchParams] = useSearchParams();
  const farmIdInQuery = searchParams.get('farm');

  //const currentPage = React.useRef(0);
  const priceRange = React.useRef([]);
  const firstMount = React.useRef(true);

  //заполняет компонент контентом
  const setComponent = async () => {
    categoryId = parseInt(params.catId);
    filters.catId = categoryId;
    filters.offset = currentPage * 6;
    const farms = await getFarmsByCategoryId(categoryData?.catId) //*** */
    setFarms(farms);
    console.log('filters', filters);
    const productsData = await getProducts(filters);
    setProducts(productsData);
    //totalItemsAmount.current=productsData.length;
    const amount = await getProductsAmountByCategoryId({ catId: categoryId })
    setProductsAmount(amount);

    if (firstMount.current) {
      priceRange.current[0] = Math.min.apply(null, productsData.map(obj => obj.price));
      priceRange.current[1] = Math.max.apply(null, productsData.map(obj => obj.price));
      firstMount.current = false;
    }
  }

  React.useEffect(() => {
    setComponent();
    fetchCategories();
  }, []);

  React.useEffect(() => {
    setComponent();
  }, [sortPrice, chosenFarms, chosenRating, currentPage, sliderPrices, filters, productId]);

  //если меняется categoryPath, значит польз. выбрал другую категорию -> новый контент
  //так как categoryData грузится не сразу, нужно перемонтировать страницу для отображения ферми
  //если меняется farmIdInQuery, значит польз. выбрал другую ферму в header -> страница перерисовывается
  React.useEffect(() => {
    const farmInQuryChanged = async () => {
      filters.farmId = [];
      filters.farmId.push(farmIdInQuery);
      const test = await getFarmById(farmIdInQuery);
      setChosenFarms(test);
    }
    firstMount.current = true;
    setCurrentPage(0)
    farmInQuryChanged();
    setComponent();

  }, [categoryPath, categoryData, farmIdInQuery]);

  const onTogglePriceSort = priceSort => {
    filters.order = priceSort;
    setSortPrice(priceSort)
  }
  const onToggleFarm = (farmTitle) => {
    const farmData = farmsStore.find(item => {
      if (item.title_us == farmTitle) return item.farmId;
    });

    if (chosenFarms.includes(farmData)) {
      const newChosenFarms = chosenFarms;
      const newFilters = JSON.parse(JSON.stringify(filters));

      newChosenFarms.splice(newChosenFarms.indexOf(farmData), 1);
      newFilters.farmId.splice(newFilters.farmId.indexOf(farmData.farmId), 1);

      setChosenFarms([...newChosenFarms]);
      setFilters(newFilters)
    } else {
      setChosenFarms([...chosenFarms, farmData]);
      filters.farmId.push(farmData.farmId)
    }
  };
  const onToggleRating = (rating) => {
    if (chosenRating.includes(rating)) {
      const newChosenRating = chosenRating;
      const newFilters = JSON.parse(JSON.stringify(filters));

      newChosenRating.splice(newChosenRating.indexOf(rating), 1);
      newFilters.rating.splice(newFilters.rating.indexOf(rating), 1);

      setChosenRating([...newChosenRating]);
      setFilters(newFilters);
    }
    else {
      setChosenRating([...chosenRating, rating]);
      filters.rating.push(rating);
    }

  }
  const setPrices = prices => {
    setSliderPrices(prices);
    const newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.minPrice = prices[0];
    newFilters.maxPrice = prices[1];
    setFilters(newFilters);
  }

  const testFunc = page => {
    const newFilt = filters;
    newFilt.offset = page * 6;
    setFilters(newFilt);
    setCurrentPage(page);
  }

  console.log('currentPage', currentPage)


  return (
    currLang == 'US' ?
      <div className={`category ${categoryData?.title_us}`}>
        <UserPath linksArr={[{ title: categoryData?.title_us }]} />
        <div className="container">
          <div className='category__top top'>
            <div className="top__head">
              <MainTitle value={categoryData?.title_us} />
              <div className="top__view">
                <button
                  onClick={() => setView('grid')}
                  className={`top__gridViewBtn ${view === 'grid' ? 'active' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 8H14.6673" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 1.33331V14.6666" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Grid view</p>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`top__listViewBtn ${view === 'list' ? 'active' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 4.66663H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 8H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 11.3333H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>List view</p>
                </button>
                <div className="top__productsAmount">
                  <span>{productsAmount}</span>
                  <p>Products</p>
                </div>
              </div>
            </div>
            <div className="top__filters filters">
              <div className="filters__price">
                <p className='filters__title'>Price</p>
                <div
                  onClick={() => onTogglePriceSort('asc')}
                  className={`filters__price-asc filters-priceBtn ${sortPrice === 'asc' ? 'active' : ''}`}>
                  <span className='filters__checkbox'></span>
                  <p>Ascending</p>
                </div>
                <div
                  onClick={() => onTogglePriceSort('desc')}
                  className={`filters__price-asc filters-priceBtn ${sortPrice === 'desc' ? 'active' : ''}`}>
                  <span className='filters__checkbox'></span>
                  <p>Descending</p>
                </div>
              </div>

            </div>
          </div>

          <div className="category__main main">
            <div className="category__aside aside">
              <div className="aside__item">
                <AsideTitle value='Farms' />
                <ul className="aside__list farms">
                  {farms.map(farm =>
                    <li
                      key={farm.farmId + 'aside'}
                      onClick={() => onToggleFarm(farm.title_us)}
                      className={chosenFarms.find(item => item.farmId == farm.farmId) ? 'active' : ''}>
                      <span className='aside__checkbox'>
                        <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                      </span>
                      <p>{currLang == 'UA' ? farm.title_ua : farm.title_us}</p>
                    </li>)}

                </ul>
              </div>
              <div className="aside__item">
                <AsideTitle value='Rating' />
                <ul className="aside__list">
                  <li onClick={() => onToggleRating(5)}
                    className={chosenRating.includes(5) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating5' rate='5' color='gold' /></li>
                  <li onClick={() => onToggleRating(4)}
                    className={chosenRating.includes(4) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating4' rate='4' color='gold' /></li>
                  <li onClick={() => onToggleRating(3)}
                    className={chosenRating.includes(3) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating3' rate='3' color='gold' /></li>
                  <li onClick={() => onToggleRating(2)}
                    className={chosenRating.includes(2) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating2' rate='2' color='gold' /></li>
                  <li onClick={() => onToggleRating(1)}
                    className={chosenRating.includes(1) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating1' rate='1' color='gold' /></li>
                </ul>
              </div>
              <div className="aside__item">
                <AsideTitle value='Price' />
                <PriceSlider
                  minPrice={priceRange.current[0]}
                  maxPrice={priceRange.current[1]}
                  setPrices={setPrices} />
              </div>
            </div>
            <div className={`main__items ${view}`}>
              {
                products?.map(item => <ProductCard
                  key={item.productId}
                  {...item}
                  view={view}
                  //wishlisted={wishListItems.includes(item.id)}
                />)
              }
            </div>

          </div>
          <Pagination
            pagesAmount={Math.ceil(productsAmount / 6)}
            setPage={testFunc}
            currentPage={currentPage} />
        </div>
      </div>
      :
      <div className={`category ${categoryData?.title_ua}`}>
        <UserPath linksArr={[{ title: categoryData?.title_ua }]} />
        <div className="container">

          <div className='category__top top'>
            <div className="top__head">
              <MainTitle value={categoryData?.title_ua} />
              <div className="top__view">
                <button
                  onClick={() => setView('grid')}
                  className={`top__gridViewBtn ${view === 'grid' ? 'active' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 8H14.6673" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 1.33331V14.6666" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Плитка</p>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`top__listViewBtn ${view === 'list' ? 'active' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 4.66663H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 8H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33398 11.3333H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Список</p>
                </button>
                <div className="top__productsAmount">
                  <span>{productsAmount}</span>
                  <p>Кількість товарів</p>
                </div>
              </div>
            </div>
            <div className="top__filters filters">
              <div className="filters__price">
                <p className='filters__title'>Ціна</p>
                <div
                  onClick={() => onTogglePriceSort('asc')}
                  className={`filters__price-asc filters-priceBtn ${sortPrice === 'asc' ? 'active' : ''}`}>
                  <span className='filters__checkbox'></span>
                  <p>По зростанню</p>
                </div>
                <div
                  onClick={() => onTogglePriceSort('desc')}
                  className={`filters__price-asc filters-priceBtn ${sortPrice === 'desc' ? 'active' : ''}`}>
                  <span className='filters__checkbox'></span>
                  <p>По спаданню</p>
                </div>
              </div>

            </div>
          </div>

          <div className="category__main main">
            <div className="category__aside aside">
              <div className="aside__item">
                <AsideTitle value='Ферми' />
                <ul className="aside__list farms">
                  {farms.map(farm =>
                    <li
                      key={farm.farmId + 'aside'}
                      onClick={() => onToggleFarm(farm.title_us)}
                      className={chosenFarms.find(item => item.farmId == farm.farmId) ? 'active' : ''}>
                      <span className='aside__checkbox'>
                        <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                      </span>
                      <p>{currLang == 'UA' ? farm.title_ua : farm.title_us}</p>
                    </li>)}

                </ul>
              </div>
              <div className="aside__item">
                <AsideTitle value='Рейтинг' />
                <ul className="aside__list">
                  <li onClick={() => onToggleRating(5)}
                    className={chosenRating.includes(5) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating5' rate='5' color='gold' /></li>
                  <li onClick={() => onToggleRating(4)}
                    className={chosenRating.includes(4) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating4' rate='4' color='gold' /></li>
                  <li onClick={() => onToggleRating(3)}
                    className={chosenRating.includes(3) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating3' rate='3' color='gold' /></li>
                  <li onClick={() => onToggleRating(2)}
                    className={chosenRating.includes(2) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating2' rate='2' color='gold' /></li>
                  <li onClick={() => onToggleRating(1)}
                    className={chosenRating.includes(1) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <Rating itemName='rating1' rate='1' color='gold' /></li>
                </ul>
              </div>
              <div className="aside__item">
                <AsideTitle value='Ціна' />
                <PriceSlider
                  minPrice={priceRange.current[0]}
                  maxPrice={priceRange.current[1]}
                  setPrices={setPrices}
                  language={'UA'} />
              </div>
            </div>
            <div className={`main__items ${view}`}>
              {
                products?.map(item => <ProductCard
                  key={item.productId}
                  {...item}
                  view={view}
                  //wishlisted={wishListItems.includes(item.id)}
                />)
              }
            </div>

          </div>
          <Pagination
            pagesAmount={Math.ceil(productsAmount / 6)}
            setPage={testFunc}
            currentPage={currentPage} />
        </div>
      </div>
  )
}

export default Category