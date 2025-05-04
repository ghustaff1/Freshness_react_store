import React from 'react';
import './FooterLinks.scss';
import { Link } from 'react-router-dom';
import GreenLink from '../../GreenLink';
import AsideTitle from '../../AsideTitle';
import { loadingSvg } from '../../../App';
import { errorSvg } from '../../../App';
import { useSelector } from 'react-redux';


const linksUS = [
  { id: "title1", title: 'Get in touch', path: [{ "path": "/about", "text": "About Us" }, { "path": "/careers", "text": "Careers" }, { "path": "/blog", "text": "Blog" }] },
  { id: "title2", title: 'Connections', path: [{ "path": "https://facebook.com", "text": "Facebook" }, { "path": "https://twitter.com", "text": "Twitter" }, { "path": "https://www.youtube.com", "text": "Youtube" }, { "path": "https://www.instagram.com", "text": "Instagram" }, { "path": "https://www.linkedin.com/", "text": "LinkedIn" }] },
  { id: "title3", title: 'Account', path: [{ "path": "/user", "text": "Your account" }, { "path": "/returns", "text": "Returns Centre" }, { "path": "/protection", "text": "100 % purchase protection" }, { "path": "/chat", "text": "Chat with us" }, { "path": "/help", "text": "Help" }] }
]

const linksUA = [
  { id: "title1", title: 'Зв\'язок з нами', path: [{ "path": "/about", "text": "Про нас" }, { "path": "/careers", "text": "Постачальники" }, { "path": "/blog", "text": "Блоги" }] },
  { id: "title2", title: 'Соціальні мережі', path: [{ "path": "https://facebook.com", "text": "Facebook" }, { "path": "https://twitter.com", "text": "Twitter" }, { "path": "https://www.youtube.com", "text": "Youtube" }, { "path": "https://www.instagram.com", "text": "Instagram" }, { "path": "https://www.linkedin.com/", "text": "LinkedIn" }] },
  { id: "title3", title: 'Аккаунт', path: [{ "path": "/user", "text": "Ваш аккаунт" }, { "path": "/returns", "text": "Правила повернень" }, { "path": "/protection", "text": "100 % захист покупки" }, { "path": "/help", "text": "Допомога" }] }
]

const FooterLinks = () => {

  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(false);
    const currLang = useSelector(({ localiz }) => localiz.language);
  
  React.useEffect(() => {

    // const fetchData = async () => {
    //   const { data, error } = await supabase
    //     .from('footerLinks')
    //     .select();

    //   if (data)
    //     setData(data);
    //   if (error)
    //     setError(true);
    // }
    // fetchData();
    if(currLang=='UA'){
      setData(linksUA);
    }
    else{
      setData(linksUS);
    }
    

  }, []);


  return (
    error ? (
      <div>
        <p>Error loading footer</p>
        {errorSvg}
      </div>
    ) :
      data === null ?
        loadingSvg :
        <div className="footer-links__refs refs">
          {
            data.map(obj =>
              <div key={obj.id} className="refs__item">
                <AsideTitle value={obj.title} />
                <ul className="refs__list">
                  {obj.path.map(item =>
                    <li key={item.text} className='refs__link'>
                      <Link to={item.path}>
                        <GreenLink path={item.path} value={item.text} />
                      </Link>
                    </li>)}
                </ul>
              </div>
            )
          }
        </div>

  )
}

export default FooterLinks