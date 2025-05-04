import React from 'react'
import { Link } from 'react-router-dom'
import './BlogCardBig.scss';
import Tag from '../../Tag';
import { getAuthorById, getTagsByBlogId } from '../../../services/api';
import { useSelector } from 'react-redux';

const BlogCardBig = ({ blogId, title_us, title_ua, bgImg, date, authorId }) => {

  const [author, setAuthor] = React.useState();
  const [tag, setTag] = React.useState([0, 1]);

  const currLang = useSelector(({ localiz }) => localiz.language);


  React.useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await getAuthorById(authorId);
      setAuthor(authorData);
    }
    const fetchTags = async () => {
      const tagsData = await getTagsByBlogId(blogId);
      console.log('tagsdata', tagsData)
      setTag([tagsData[0].title_ua, tagsData[0].title_us]);
    }
    fetchAuthor();
    fetchTags();
  }, [])


  return (
    <Link to={`/blogs/${blogId}`} className='blogCardBig'>
      <div className='blogCardBig__bg'>
        <img src={bgImg} alt="background" />
      </div>
      <div className="blogCardBig__body">
        <div className='blogCardBig__top'>
          <Tag value={currLang == 'UA' ? tag[0] : tag[1]} />
        </div>
        <div className='blogCardBig___bottom'>
          <h2 className='blogCardBig__title'>{currLang == 'UA' ? title_ua : title_us}</h2>
          <div className="blogCardBig__info">
            <div className="blogCardBig__author author">
              <div className="author__img">
                <img src={author?.authorImg} alt="authorImg" />
              </div>
              <p>{author?.name}</p>
            </div>
            <time dateTime={`${date[2]}-${date[1]}-${date[0]}`}>
              {date[0]}. {date[1]}. {date[2]}
            </time>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCardBig