import { useQuery, useMutation, queryCache } from 'react-query';
import axios from 'axios';
const token = localStorage.getItem('accessToken');


export const useProductsQuery = (currentPage, searchTerm, sortDirection) => {
  return useQuery(['products', currentPage, searchTerm, sortDirection], async () => {
    try {
      const response = await axios.get(`http://57.128.194.195/api/v1/products`, {
        params: {
          size:9,
          page: currentPage,
          name: searchTerm,
          sortBy: 'name',
          sortDirection: sortDirection
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Wystąpił błąd podczas pobierania danych przepisów');
    }
  });
};

export const useProductIdQuery = (id) => {
    return useQuery(['product', id], async () => {
      try {
        const response = await axios.get(`http://57.128.194.195/api/v1/products/${id}`, {
          headers: { 'accept': '*/*', 'Authorization': `Bearer ${token}` }
        });
        return response.data;
      } catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych:', error);
        throw new Error('Wystąpił błąd podczas pobierania danych');
      }
    });
  };


  export const useDeleteProductMutation = () => {
    return useMutation(
      async (productId) => {
        try {
          const response = await axios.delete(`http://57.128.194.195/api/v1/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('udalo sie')
          return response.data;
        } catch (error) {
          throw new Error('Błąd podczas usuwania produktu');
        }
      },
    );
  };

  export const useAddProductMutation = () => {
    return useMutation(
      async (postData) => {
        try {
            console.log('dane w axios'+postData)
          const response = await axios.post('http://57.128.194.195/api/v1/products', postData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
          });
          return response.data;
        } catch (error) {
          throw new Error('Wystąpił błąd podczas dodawania nowego przepisu');
        }
      },
    );
  };
  
  export const useUpdateProductMutation = () => {
    return useMutation(
      async ({ productId, updatedProduct }) => {
        console.log('dane w axios'+updatedProduct)

        try {
          const response = await axios.put(`http://57.128.194.195/api/v1/products/${productId}`,
            updatedProduct,
            {
              headers: { 'accept': '*/*', 'Authorization': `Bearer ${token}` }
            }
          );
          return response.data;
        } catch (error) {
          throw new Error('Błąd podczas aktualizacji produktu');
        }
      },
    );
  };
  