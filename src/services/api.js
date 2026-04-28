import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://gitongatruham.alwaysdata.net/api/get_product_details');
    return response;
  } catch (error) {
    throw error;
  }
};