import React from 'react'
import './Blog.scss';
import { Link, useParams } from 'react-router-dom';
import AsideTitle from '../../components/AsideTitle';
import Tag from '../../components/Tag';
import UserPath from '../../components/UserPath';
import { errorSvg, loadingSvg } from '../../App';
import { getBlogs, getTagsByBlogId, getAuthorById } from '../../services/api';
import { useSelector } from 'react-redux';
const Blog = () => {
  const { blogId } = useParams();

  const [blog, setBLog] = React.useState();
  const [tags, setTags] = React.useState();
  const [author, setAuthor] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const currLang = useSelector(({ localiz }) => localiz.language);

  React.useEffect(() => {

    const fetchData = async () => {
      const blogData = await getBlogs({ blogId })
      await setBLog(blogData[0]);
      setLoading(false);
    }
    const fetchTags = async () => {
      const tagsData = await getTagsByBlogId(blogId);
      console.log('tagsdata', tagsData)
      setTags(tagsData);
    }

    fetchData();
    fetchTags();
  }, []);

  React.useEffect(() => {
    const fetchAuthor = async (authorId) => {
      const authorData = await getAuthorById(authorId);
      setAuthor(authorData);
    }
    if (blog)
      fetchAuthor(blog.authorId);
  }, [blog])

  console.log('blog', blog)

  return (
    loading ?
      loadingSvg :
      error ?
        errorSvg :

        <div className="blog">
          <UserPath linksArr={[{ title: currLang == 'UA' ? 'Блог' : 'Blogs', path: 'blogs' }, { title: blog.title_ua }]} />
          <div className="container">

            <div className="blog-top">
              <div className="blog-top__bg">
                <img src={blog.bgImg} alt="bgImg" />
              </div>
              <div className="blog-top__content">
                <dl className="blog-top__info">
                  <div>
                    <dt>{currLang == 'UA' ? 'Дата' : 'Date'}:</dt>
                    <dd>{blog.date}</dd>
                  </div>
                  <div>
                    <dt>{currLang == 'UA' ? 'Автор' : 'Author'}:</dt>
                    <dd>{author.name}</dd>
                  </div>
                </dl>
                <h1 className="blog-top__title">
                  {currLang == 'UA' ? blog.title_ua : blog.title_us}
                </h1>
              </div>
            </div>
            <div className="blog-main main">
              <div className="main__aside aside">
                <div className="aside__item">
                  <AsideTitle value={currLang == 'UA' ? 'Теги' : 'Tags'} />
                  <div className="aside__tags">
                    {tags?.map(tag =>
                      <Tag value={currLang == 'UA' ? tag.title_ua : tag.title_us} key={tag.tagId + tag.title_us} />
                    )}
                  </div>
                </div>
                <Link to='/blogs' className='backToBlogBtn'>
                  <svg width="19" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4.5H10.6667C11.0203 4.5 11.3594 4.64048 11.6095 4.89052C11.8595 5.14057 12 5.47971 12 5.83333V14.5" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33246 6.5L3.4258 4.56C3.41287 4.54813 3.40254 4.53371 3.39548 4.51764C3.38841 4.50158 3.38477 4.48422 3.38477 4.46667C3.38477 4.44912 3.38841 4.43176 3.39548 4.41569C3.40254 4.39962 3.41287 4.3852 3.4258 4.37333L5.33246 2.5" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>{currLang == 'UA' ? 'Назад' : 'Back to Blog'}</p>
                </Link>
              </div>
              <div className="main__content">
                {currLang == 'UA' ?
                  blog.topicTitles_ua.map((item, i) =>
                    <>
                      <h3 className="topic__title">
                        {item}
                      </h3>
                      <p className="topic__text">
                        {blog.topicTexts_ua[i]}
                      </p>
                    </>)
                  :
                  blog.topicTitles_us.map((item, i) =>
                    <>
                      <h3 className="topic__title">
                        {item}
                      </h3>
                      <p className="topic__text">
                        {blog.topicTexts_us[i]}
                      </p>
                    </>)
                }

              </div>
            </div>
          </div>
        </div>
  )
}

export default Blog