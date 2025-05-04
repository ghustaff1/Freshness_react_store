import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getFarms } from "../../services/api";
import { getFarms_Categories } from "../../services/api";

export const fetchFarms = createAsyncThunk(
  'farms/fetchFarms',
  async () => {

    const farms = await getFarms();

    const farms_categories = await getFarms_Categories();

    const updatedFarms = farms.map(farm => {
      // Находим первую категорию для текущего farmId
      const category = farms_categories.find(cat => cat.farmId === farm.farmId);
      // Если категория найдена, добавляем catId, иначе возвращаем исходный объект
      return { ...farm, catId: category.categoryId }
    });

    return updatedFarms;



  }
)

const initialState = {
  farms: [],
};

const farmsSlice = createSlice({
  name: 'farms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFarms.fulfilled, (state, action) => {
      action.payload.forEach(farm => {
        state.farms.push({
          farmId: farm.farmId,
          title_us: farm.title_us,
          title_ua: farm.title_ua,
          descr: farm.descr,
          catId: farm.catId
        })
      });

      console.log('farms in redux', current(state))
    });

    builder.addCase(fetchFarms.rejected, (state, action) => {
      console.log('Could not fetch farms');
      state.farms = action.payload.error;
    })
  }
});

export default farmsSlice.reducer;
