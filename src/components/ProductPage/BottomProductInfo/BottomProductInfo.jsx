import React from 'react';
import './BottomProductInfo.scss';
import Description from '../Description/Description';
import Reviews from '../Reviews/Reviews';

const categories = ['Description', 'Reviews'];

const BottomProductInfo = ({ farmId, reviews, recipe, id }) => {

  const [activeCat, setActiveCat] = React.useState(categories[0]);

  const content = activeCat === categories[0] ?
    (
      <Description farmId={farmId} recipe={recipe} />
    ) :
    <Reviews reviews={reviews} />;

  return (
    <div className="BottomProductInfo">
      <div className="BottomProductInfo__categories">
        {categories.map(cat =>
          <h3 key={cat}
            className={cat === activeCat ?
              'BottomProductInfo__category active' :
              'BottomProductInfo__category'}
            onClick={e => setActiveCat(e.currentTarget.textContent)}>{cat}</h3>)
        }
      </div>
      <ul className="BottomProductInfo__content">
        {content}
      </ul>
    </div>
  )
}

export default BottomProductInfo;