import React from 'react'
import { Box, Slider } from '@mui/material';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';

const PriceSlider = ({ minPrice, maxPrice, setPrices, language }) => {
  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const currRate = useSelector(({ localiz }) => localiz.exchangeRate)

  React.useEffect(() => {
    setValue([0, maxPrice])
  }, [minPrice, maxPrice])

  const updateSliderPrices = React.useCallback(
    debounce((newValue) => {
      setPrices(newValue)
    }, 1000),
     [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateSliderPrices(newValue);
  };

  

  return (
    <Box>
      <div className="slider-info" style={{display:'flex', alignItems:'center', gap:'30px', marginBottom:'20px'}}>
        <p style={{padding:'10px', minWidth:'50px', textAlign:'center', border:'1px solid #d1d1d1', borderRadius:'12px', backgroundColor:'#f0f0f0'}}>{language=='UA'?(value[0]*currRate).toFixed(2):value[0]}</p>
        -
        <p style={{padding:'10px', minWidth:'50px', textAlign:'center', border:'1px solid #d1d1d1', borderRadius:'12px', backgroundColor:'#f0f0f0'}}>{language=='UA'?(value[1]*currRate).toFixed(2):value[1]}</p>
      </div>
      <Slider
        value={value}
        onChange={handleChange}
        
        max={maxPrice}
        step={0.01}
        sx={{
          '& .MuiSlider-track': {
            backgroundColor: '#6A983C',
            border: 'none',
            height: '6px'
          },
          '& .MuiSlider-thumb': {
            backgroundColor: '#FFFFFF'
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: '#6A983C',

          },
          '& .MuiSlider-valueLabelLabel': {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: '500',
            fontSize: '16px',
            color: '#FFFFFF'
          }
        }}
        aria-labelledby="non-linear-slider"
      />
    </Box>

  )
}

export default PriceSlider