import React from 'react';
import styled from 'styled-components';

const P = styled.p`
font-family: "Poppins", sans-serif;
color:#151515;
font-weight:700;
font-size:16px;
lint-height:1.4;
`;
const Wrapper = styled.div`
cursor: pointer;
display: flex;
align-items:center;
gap:8px;
margin-top:30px;
`;

const AddToWishList = ({ id }) => {

  //временная переменная, показывает есть ли элемент по id в виш-листе. 
  //В будущем сделать логику с redux хранилищем.
  let tempExist = false;

  const [added, setAdded] = React.useState(tempExist);

  return (
    <Wrapper onClick={() => setAdded(!added)}>
      <svg style={{ fill: added ? '#E6704B' : 'none' }} width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.62281 2.76001C9.25933 2.12349 10.1226 1.7659 11.0228 1.7659C11.923 1.7659 12.7863 2.12349 13.4228 2.76001C14.0593 3.39653 14.4169 4.25984 14.4169 5.16001C14.4169 6.06019 14.0593 6.92349 13.4228 7.56001L12.5495 8.43334L7.74948 13.2333L2.94948 8.43334L2.07614 7.56001C1.43962 6.92349 1.08203 6.06019 1.08203 5.16001C1.08203 4.25984 1.43962 3.39653 2.07614 2.76001C2.71266 2.12349 3.57597 1.7659 4.47614 1.7659C5.37632 1.7659 6.23962 2.12349 6.87614 2.76001L7.74948 3.63334L8.62281 2.76001Z" stroke="#E6704B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <P>Add to my wish list</P>
    </Wrapper>
  )
}

export default AddToWishList;