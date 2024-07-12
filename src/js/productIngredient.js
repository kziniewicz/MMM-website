import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
const token = localStorage.getItem('accessToken');


export const useAddIngredientMutation = () => {
    return useMutation(
      async (newIngredient) => {
        try {
          const response = await axios.post('http://57.128.194.195/api/v1/products/ingredients', newIngredient, {
            headers: { Authorization: `Bearer ${token}` }
          });
          return response.data;
        } catch (error) {
          throw new Error('Wystąpił błąd podczas dodawania nowego składnika');
        }
      },
    );
  };

export const useUpdateIngredientMutation = () => {
  return useMutation(({ ingredientId, formData }) => axios.put(`http://57.128.194.195/api/v1/products/ingredients/${ingredientId}`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  }));
};

export const useDeleteIngredientMutation = () => {
  return useMutation(ingredientId => axios.delete(`http://57.128.194.195/api/v1/products/ingredients/${ingredientId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }));
};

export const useProductIngredients = () => {
  return useQuery('productIngredients', async () => {
    const response = await axios.get('http://57.128.194.195/api/v1/products/ingredients', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  });
};
