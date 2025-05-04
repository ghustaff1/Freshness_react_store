import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getFarms = async () => {
    const response = await axios.get(`${API_URL}/farms`);
    return response.data;
};

export const getProducts = async (filters = {}) => {
  const response = await axios.get(`${API_URL}/products`, {
      params: filters 
  });
  return response.data;
};
export const getProductsByTitle = async (searchQuery) => {
  try {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: { query: searchQuery },
    });
    const data = response.data;
    data.map(item => item.imgUrl = JSON.parse(item.imgUrl))
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const getProductsAmountByCategoryId=async(filters = {})=>{
  const response = await axios.get(`${API_URL}/products`, {
    params: filters 
});
  return response.data.length;
}

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  //console.log('server', response.data);
  return response.data;
};

export const getBlogs = async (filters={}) => {
  const response = await axios.get(`${API_URL}/blogs`, {
    params: filters 
});
  return response.data;
};

export const getFarms_Categories = async () => {
  const response = await axios.get(`${API_URL}/farms_categories`);
  //console.log('server', response.data);
  return response.data;
};

export const getFarmsByCategoryId=async(catId)=>{
  const categories = getCategories();
  const farms = await getFarms();
  const response = await axios.get(`${API_URL}/farms_categories`);
  const correlation=response.data;
  const farmIds=correlation
  .filter(item=>item.categoryId==catId)
  .map(item=>({id:item.farmId}));

  const result = farms
    .filter(farm => 
        farmIds.find(idObj => idObj.id === farm.farmId)
    )
    .map(farm => {
      return {farmId:farm.farmId, title_us:farm.title_us, title_ua:farm.title_ua}
    });

  return result;
}

export const getFarmById=async(farmId)=>{
  const response = await axios.get(`${API_URL}/farms`);
  const res=response.data.filter(item=>item.farmId==farmId);
  return res;
}

export const getCategoryByProductId=async(productId)=>{
  const product = await getProducts({productId});
  //console.log('product', product)
  const categories= await getCategories();
  //console.log('categories', categories)
  const category=categories.find(item=>item.categoryId==product[0].categoryId);
 // console.log('result', category)
  return category;
}

export const getAuthorById=async(authorId)=>{
  const response = await axios.get(`${API_URL}/authors`);
  const res=response.data.filter(item=>item.authorId==authorId);
  return res[0];
}

export const getTagsByBlogId=async(blogId)=>{
  const response = await axios.get(`${API_URL}/blogs_tags`);
  const tagIds=response.data.filter(item=>item.blogId==blogId).map(item=>item.tagId);
  const response2 = await axios.get(`${API_URL}/tagsdir`);
  const result=response2.data.filter(item=>tagIds.includes(item.tagId))
  return result;
}

export const getMeasures = async () => {
  const response = await axios.get(`${API_URL}/measuredir`);
  //console.log('server', response.data);
  return response.data;
};

export const loginFunc=async(email, password)=>{
  
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    const data = response.data;
    console.log('data', data)
    const loginTime= Date.now();
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('userEmail', data.userEmail);
    localStorage.setItem('userPhone', data.userPhone);
    localStorage.setItem('userName', data.userName);
    localStorage.setItem('userSurname', data.userSurname);
    localStorage.setItem('loginTime', loginTime)
    //localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
    console.log('data', data)
    
    return true;
    //setMessage('Успешная авторизация');
  } catch (error) {
    console.error(error)
    return false;
    //setMessage(error.response?.data.error || 'Ошибка при авторизации');
  }
}

export const postOrder=async(order, usersOrdersProducts, address)=>{
  console.log('making order')
  try{
    await axios.post(`${API_URL}/addresses`, {...address});
    await axios.post(`${API_URL}/order`, {...order});
   // await axios.post(`${API_URL}/users_orders_products`, {...usersOrdersProducts});
    await usersOrdersProducts.forEach(item=>axios.post(`${API_URL}/users_orders_products`, {...item}))
    console.log('making order success')
  }
  catch(error){
    console.error('making order error:', error)
  }

}

export const registerFunc=async(email, password, name, surname, phone)=>{
  try {
    const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
        surname,
        phone
    });
    console.log('SUCCESS')
    return true;
    //setMessage(response.data.message);
} catch (error) {
  console.error(error)
  return false;
    //setMessage(error.response?.data.error || 'Ошибка при регистрации');
}
}

export const getOrdersByUserId=async(userId)=>{
  const response=await axios.get(`${API_URL}/users_orders_products`);
  const result=response.data.filter(item=>item.userId==userId);
  return result;
}

export const getOrders=async(orderIds)=>{
  const response=await axios.get(`${API_URL}/orders`);
  if(orderIds) return response.data.filter(item=>orderIds.includes(item.orderId));
  else return response.data;
  
}

export const getReviews=async()=>{
  const response=await axios.get(`${API_URL}/reviews`);
  return response.data;
}

export const getIdForOrder=async()=>{
  const response = await axios.get(`${API_URL}/last_order`);
  return response.data[0].orderId+1;
}
export const getIdForAddress=async()=>{
  const response = await axios.get(`${API_URL}/last_address`);
  return response.data[0].addressId+1;
}





// export const getFarmsByCategoryPath=async(catPath)=>{
//   const categories = getCategories();
//   const farms = await getFarms();
//   const response = await axios.get(`${API_URL}/farms_categories`);
//   const correlation=response.data;
//   console.log('correlation', correlation);
//   const farmIds=correlation
//   .filter(item=>item.path==catPath)
//   .map(item=>({id:item.farmId}));

//   const result = farms
//     .filter(farm => 
//         farmIds.find(idObj => idObj.id === farm.farmId)
//     )
//     .map(farm => farm.title);
//     console.log('RESULTPATH', result);
//   return result;
  
// }
