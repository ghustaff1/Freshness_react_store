import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY='ca512db5fb941cbd13022812 ';

export const fetchExchangeRate = createAsyncThunk(
  'localization/fetchExchangeRate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/exchange-rate');
      return response.data.rate;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  language:'UA',
  exchangeRate:41.5,
  status:'idle'
};

const localizSlice = createSlice({
  name: 'localiz',
  initialState,
  reducers: {

    setLanguage(state, action) {
      state.language = action.payload;
      console.log('language changed to', state.language)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exchangeRate = action.payload; // Обновляем курс
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setLanguage } = localizSlice.actions;

// Селектор для получения текущего курса
export const getExchangeRate = (state) => state.localization.exchangeRate;
export const getLanguage = (state) => state.localization.language;

export default localizSlice.reducer;