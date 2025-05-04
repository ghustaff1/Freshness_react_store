import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Title = styled.h4`
font-family: "Poppins", sans-serif;
color:#151515;
font-weight: 500;
font-size: 16px;
line-height: 1.3;
margin-bottom: 5px;
`;
const Descr = styled.p`
font-size: 15px;
color:#151515;
line-height: 1.3;
margin-bottom: 32px;
`;

const Description = ({ farmId, recipe }) => {

  const farmData = useSelector(({ farms }) => farms.farms.find(farm => farm.farmId == farmId));

  console.log('farmId', farmId)
  console.log('farmData', farmData)


  const data = [
    {
      title: farmData.title,
      descr: farmData.descr
    },
    {
      title: 'How to cook',
      descr: 'fdfdfd'
    }
  ];

  return (
    <>
      {data.map(obj =>
        <li key={obj.title}>
          <Title>{obj.title}</Title>
          <Descr>{obj.descr}</Descr>
        </li>
      )}
    </>
  )
}

export default Description;