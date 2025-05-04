import React from 'react'

const GreenLink = ({underline, value, path}) => {
  const style={
    fontSize: '16px',
    color:'#6A983C',
    textDecoration:underline?'underline':'none',
  }
  return (
    <p style={style}>{value}</p>
  )
}

export default GreenLink;