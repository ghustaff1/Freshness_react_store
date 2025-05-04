import React from 'react'
import HomeSaleSection from '../HomeSaleSection/HomeSaleSection';
import { useSelector } from 'react-redux';
import { getProducts } from '../../../services/api';

const BestDiscount = () => {

  const [error, setError] = React.useState(false)
  const [products, setProducts] = React.useState(null);

  const categories = useSelector(({ categories }) => categories.categories.map(
    category => category.title));
  const currLang = useSelector(({ localiz }) => localiz.language);

  React.useEffect(() => {
    const fetchData = async () => {
      let productsData = await getProducts();
      //productsData=productsData.slice(0,6)
      productsData = productsData.sort((a, b) => {
        const discountA = a.datedPrice - a.price;
        const discountB = b.datedPrice - b.price;
        return discountB - discountA;
      }).slice(0, 10);

      setProducts(productsData)
    }
    fetchData();

  }, [])


  return (
    <HomeSaleSection
    title={currLang=='UA'?'Найкраща знижка':"Best discount"}
      products={products}
      links={categories}
      className='bestDiscount' />
  )
}

export default BestDiscount;