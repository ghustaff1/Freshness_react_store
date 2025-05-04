import React from 'react'
import styled from 'styled-components';

const Title = styled.h2`
font-family: 'Poppins', sans-serif;
font-size:32px;
lint-height:1.5;
font-weight:600;
color:#151515;
margin-bottom:16px;
`;

const MainTitle = ({value}) => {
  return (
    <Title>{value}</Title>
  )
}

export default MainTitle;