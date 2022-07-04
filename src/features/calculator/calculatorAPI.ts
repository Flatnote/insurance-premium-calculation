import axios from 'axios';

const apiHost = process.env.REACT_APP_API_HOST || 'http://localhost:5001';

export const doGetProduct = async (payload: any) => {
  //   setFormLoading(true);
  const response = await axios.post(`${apiHost}/getProduct`, payload);
  const product = response.data;
  //   setFormLoading(false);
  return product;
};
