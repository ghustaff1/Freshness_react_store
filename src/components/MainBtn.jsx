import React from 'react';
import styled from 'styled-components';


//Тернарный оператор не хочет работать в styled-components
const Button = styled.button`
  position:relative;
  display:flex;
  align-items:center;
  gap:6px;
  right:15px;
  position: relative;
  right: 15px;
    border: ${props => {
    if (props.type === '1') return '1px solid #92C064';
    else if (props.type === '2') return '2px solid #46760A';
    else return 'none';
  }};
    background-color:${props => {
    if (props.type === '1') return 'transparent';
    else if (props.type === '2') return '#6A983C';
    else if (props.type === '3') return '#F5F5F5';
    else return '#FFFFFF';
  }};
    border-radius: 12px;
    padding:${props => {
    if (props.size === 'small') return '7px 12px';
    else if (props.size === 'medium') return '13px 16px';
    else if (props.size === 'large') return '16px 48px';
    else return '13px 16px';
  }};
    cursor:pointer;
    transition:all .2s ease;
    &:hover{
      transform:translateY(-1px);
    }
  `;

const Text = styled.p`
  font-family: 'Poppins', sans-serif;
  color: ${props => {
    if (props.type === '2') return '#FFFFFF';
    else return '#151515';
  }};
  fontSize: 16px;
  font-weight: 700;
  line-height: 1.4;
`;

const MainBtn = ({ size, type, text, dir, currLang }) => {

  return (
    <Button size={size} type={type}>
      {dir === 'prev' ?
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.46658 4.81332L6.72658 7.55332C6.60241 7.67823 6.53271 7.8472 6.53271 8.02332C6.53271 8.19945 6.60241 8.36842 6.72658 8.49332L9.39324 11.16" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>

        :
        null}
      <Text type={type}>{text}</Text>
      {
        dir === 'next' ?
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5332 11.1867L9.2732 8.44666C9.39737 8.32175 9.46706 8.15279 9.46706 7.97666C9.46706 7.80054 9.39737 7.63157 9.2732 7.50666L6.60654 4.84" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
          </svg>

          :
          null
      }
    </Button>
  )
}

export default MainBtn;