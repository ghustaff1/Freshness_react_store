import React from 'react'
import './Categories.scss';
import CategoriesItem from '../CategoriesItem/CategoriesItem';
import { useSelector } from 'react-redux';
import { getFarmsByCategory } from '../../services/api';

const Categories = () => {

  const categories = useSelector(({ categories }) => categories.categories);
  const farms = useSelector(({ farms }) => farms.farms);
  const currLang=useSelector(({localiz})=>localiz.language);
  
  return (
    <div className='categories'>
      <div className='container'>
        <ul className='categories-list'>
          {
            categories?.map((category) => {
              //console.log('categories', category);
              return (
                <CategoriesItem
                  key={`${category?.title_us}+${category.catId}`}
                  categoryTitle={currLang=='UA'?category.title_ua:category.title_us}
                  categoryPath={category.path}
                  catId={category.catId}
                  currLang={currLang}
                />
              )
            }
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Categories;