import React from 'react'
import './CategoriesItem.scss';
import { Link } from 'react-router-dom';
import { getFarmsByCategoryId } from '../../services/api';


const CategoriesItem = ({ categoryTitle, categoryPath, catId, currLang  }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [farms, setFarms]=React.useState(null);

  React.useEffect(()=>{

    const farmsByCategory=async()=>{
      const data=await getFarmsByCategoryId(catId);
      setFarms(data);
    };

    farmsByCategory();
    //console.log('farms123', farms)

  }, [])

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='categoriesItem'>
      <Link
        to={`/${categoryPath}/${catId}`}
        className='categoriesItem__link'>
        <p>{categoryTitle}</p>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.61035 1.40001L3.66535 3.45501C3.75903 3.54814 3.88576 3.60041 4.01785 3.60041C4.14994 3.60041 4.27667 3.54814 4.37035 3.45501L6.37035 1.45501" stroke="#6A983C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>
      </Link>
      {isHovered &&
        <ul className="categoriesItem-popup">
          {farms?.map(farm =>
            <li key={farm.farmId+farm.title_us}>
              <Link
                to={`/${categoryPath}/${catId}?farm=${farm.farmId}`}>{currLang=='UA'?farm.title_ua:farm.title_us}
              </Link>
            </li>
          )}
        </ul>}
    </li>
  )
}

export default CategoriesItem;