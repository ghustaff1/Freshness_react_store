import React from 'react'
import './BlogCardSmall.scss';
import { Link } from 'react-router-dom';
import Tag from '../../Tag';
import { getAuthorById, getTagsByBlogId } from '../../../services/api';
import { useSelector } from 'react-redux';

const BlogCardSmall = ({ blogId, title_us, title_ua, bgImg, date, authorId }) => {

  const [author, setAuthor] = React.useState();
  const [tag, setTag] = React.useState([0,1]);

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
    <Link to={`/blogs/${blogId}`} className="BlogCardSmall">
      <div className="BlogCardSmall__img">
        <img src={bgImg} alt="bgImg" />
      </div>
      <div className="BlogCardSmall__body">
        <Tag value={currLang == 'UA' ? tag[0] : tag[1]} />
        <h3 className="BlogCardSmall__title">{currLang == 'UA' ? title_ua : title_us}</h3>
        <div className="BlogCardSmall__info">
          <p className="BlogCardSmall__authorName">{author?.name}</p>
          <time dateTime={`${date[2]}-${date[1]}-${date[0]}`}>
            {date[0]}. {date[1]}. {date[2]}
          </time>
        </div>
      </div>
    </Link>
  )
}

export default BlogCardSmall