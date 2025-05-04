import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getCategories } from "../../services/api";

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    return await getCategories();
  }
)

const initialState = {
  categories: []
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      action.payload.forEach(category=>{
        state.categories.push({
          catId:category.categoryId,
          path:category.path,
          title_us:category.title_us,
          title_ua:category.title_ua,
          loading:false
        })
      });
      console.log('categories in redux', current(state))
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.log('Could not fetch categories')
      state.categories = action.payload.error;
    });

  }
});

export const getPathByCategory1 = (category) => {
  return '/categories/' + Object.keys(initialState.links.find(obj => Object.values(obj)[0] === category))[0];
}

// export const getPathFromCategoryTitle = (state, categoryTitle) => {
//   let link='/';
//   //state.items
//   console.log('initialState', current(state))
//   const category=state.categories.find(item=>item.title==categoryTitle);
//   console.log('category', category)
//   return category.path;
  
//   //console.log('CATEGORY', category)
// }
// export const getCategoryFromPath = (path) => {
//   // return '/categories/' + Object.keys(initialState.links.find(obj => Object.values(obj)[0] === category))[0];
//   // console.log(path)
//   return Object.values(initialState.links.find(obj => Object.keys(obj)[0] === path))[0];
// }

export default categoriesSlice.reducer;
