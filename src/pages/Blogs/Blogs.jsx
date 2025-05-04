import React from 'react'
import BlogCardBig from '../../components/BlogsPage/BlogCardBig/BlogCardBig';
import BlogCardSmall from '../../components/BlogsPage/BlogCardSmall/BlogCardSmall';
import './Blogs.scss';
import MainTitle from '../../components/MainTitle';
import UserPath from '../../components/UserPath';
import Pagination from '../../components/Pagination/Pagination';
import { errorSvg } from '../../App';
import { getBlogs } from '../../services/api';
import { useSelector } from 'react-redux';

const Blogs = () => {

  const [error, setError] = React.useState(false);
  const [blogsBig, setBlogsBig] = React.useState();
  const [blogsSmall, setBlogsSmall] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(0);
  const pagesAmount = React.useRef(1);
  
  const currLang = useSelector(({ localiz }) => localiz.language);

  React.useEffect(() => {

    const fetchData = async () => {

      const data = await getBlogs();
      // const { data, error } = await supabase
      //   .from('blogs')
      //   .select();

      if (data) {
        pagesAmount.current = Math.ceil(data.filter(obj => obj.view === 'small').length / 8);
        setBlogsBig(data.filter(obj => obj.viewId == 1));
        setBlogsSmall(data.filter(obj => obj.viewId == 2).slice(currentPage * 8, currentPage * 8 + 8));

        console.log('blog data', data)

      }
      if (error)
        setError(true);
    }

    fetchData();


  }, [])

  console.log('pages', pagesAmount.current)
  console.log('blog big', blogsBig)
  console.log('blog small', blogsSmall)

  if (!blogsBig) return 'loading';
  const path = [{ title: 'Blogs' }]


  const content = <div className="blogs ">
    <UserPath linksArr={[{ title: currLang == 'UA' ? 'Блог' : 'Blogs' }]} />
    <div className='container'>
      <MainTitle value={currLang=='UA'?'':'Blogs'} />
      <div className='blogs__top'>
        {blogsBig.map(item => <BlogCardBig key={item.blogId} {...item} />)}
      </div>
      <div className="blogs__main">
        {
          blogsSmall.map(item =>
            <BlogCardSmall key={item.blogId} {...item} />
          )
        }
      </div>
      <Pagination
        pagesAmount={pagesAmount.current}
        setPage={i => setCurrentPage(i)}
        currentPage={currentPage} />
    </div>
  </div>


  //сделать скелетон
  return (
    error ?
      errorSvg :
      content


  )
}

export default Blogs