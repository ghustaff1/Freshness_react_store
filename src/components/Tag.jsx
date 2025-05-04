import React from 'react';
import styled from 'styled-components';

const T = styled.span`
  display: inline-block;
  font-family: "Poppins", sans-serif;
  padding: 2px 8px;
  border-radius: 12px;
  background: #f4f8ec;
  color: #6a983c;
  font-weight: 600;
`;

const Tag = ({value}) => {
  return (
    <T>{value}</T>
  )
}

export default Tag