import React from 'react'
import HomeSaleSection from '../HomeSaleSection/HomeSaleSection';
import { useSelector } from 'react-redux';
// import { getCategoryFromPath } from '../../../redux/slices/categoriesSlice';
import { getProducts } from '../../../services/api';

const BestSell = () => {

  const [error, setError] = React.useState(false)
  const [products, setProducts] = React.useState(null);

  const categories = useSelector(({ categories }) => categories.categories);
  const currLang=useSelector(({localiz})=>localiz.language);

    //console.log('categories', categories)

  React.useEffect(() => {
    const fetchData = async () => {
          let productsData = await getProducts();
          //productsData=productsData.slice(0,6)
          productsData=productsData.sort((a,b)=>b.sells-a.sells).slice(0,10)
          //productsData.map(item=>item.imgUrl = JSON.parse(item.imgUrl))
          //productsData[0].imgUrl = JSON.parse(productsData[0].imgUrl);
          //console.log('productsData', productsData)
          // if (data) {
          //   setData(data[0]);
          //   setLoading(false);
          // }
          // else {
          //   setLoading(false);
          //   //setFailed(true);
          // }
          setProducts(productsData)

        }
        fetchData();

  }, [])


  return (
    <HomeSaleSection
      title={currLang=='UA'?'Хіти продаж':"Best selling products"}
      products={products}
      links={categories}
      className='bestSell' />
  )
}

export default BestSell;