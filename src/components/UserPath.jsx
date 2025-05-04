import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// const UserPathWrapper = styled.div`
// margin-bottom:24px;
// font-size:16px;
// display:flex;
// gap:8px;
// padding-top: 48px;
// `;

const UserPathWrapper = styled.div`
display:flex;
align-items:center;
font-size:16px;
background:#FDFDFD;
gap:8px;
height:50px;
margin-bottom:30px;
`;


//linksArr=[{***path:path, title:title, ***id:id}]


const UserPath = (linksArr) => {

  const currLang = useSelector(({ localiz }) => localiz.language);

  if (typeof linksArr == 'object') {
    linksArr = linksArr.linksArr;
  }

  return (
    Array.isArray(linksArr) ?
      <UserPathWrapper className="userPath">
        <div className='container'>
          <Link to='/' style={{ color: '#A9A9A9' }}>{currLang == 'UA' ? 'Головна' : 'Homepage'} /</Link>
          {
            linksArr.map((item, i) => {
              if (item.path && item.path !== 'blogs') {
                return <Link
                  key={item.path + i}
                  to={`/${item.path}/${item.id}`}
                  style={{ color: '#A9A9A9' }}>{
                  } {`${item.title} /`}
                </Link>
              }
              else if (item.path == 'blogs') {
                return <Link
                  key={item.path + i}
                  to={`/blogs`}
                  style={{ color: '#A9A9A9' }}>{
                  } {`${item.title} /`}
                </Link>
              }
              else {
                return <span key={item.title + i}>{` ${item.title}`}</span>;
              }
            })
          }
        </div>


      </UserPathWrapper> : "error"
  )
}

export default UserPath;