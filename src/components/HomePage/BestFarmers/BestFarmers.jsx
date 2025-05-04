import React from 'react'
import axios from 'axios';
import HomeSaleSection from '../HomeSaleSection/HomeSaleSection';

const BestFarmers = () => {
  const [data, setData] = React.useState([]);
  const [links, setLinks]=React.useState([]);


  const fetchBestFarmers = async () => {
    await axios.get('http://localhost:8000/bestFarmers')
      .then(res => {
        setData(res.data.products);
        setLinks(res.data.links)
      })
  }

  React.useEffect(()=>{
    fetchBestFarmers();
  }, []);

  return (
    <HomeSaleSection 
    title='Best Farmers'
    data={data} 
    links={links}
    className='bestFarmers'/>
  )
}

export default BestFarmers;