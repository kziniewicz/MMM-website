import { useQuery, useMutation,queryCache } from 'react-query';
import axios from 'axios';
const token = localStorage.getItem('accessToken'); 

//WSZYSTKIE PRZEPISY
export const useRecipesQuery = (currentPage, searchTerm, sortDirection) => {
  return useQuery(['recipes', currentPage, searchTerm, sortDirection], async () => {
    try {
      const response = await axios.get(`http://57.128.194.195/api/v1/recipes`, {
        params: {
          size: 9,
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

//PRZEPIS DNIA
export const useRecipeOfDayQuery = () => {
  return useQuery('recipeOfDay', async () => {
    try {
      const token = localStorage.getItem('accessToken'); 
      const response = await axios.get('http://57.128.194.195/api/v1/recipes/user/recipe-of-the-day', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Wystąpił błąd podczas pobierania przepisu dnia');
    }
  });
};


//PRZEPIS PO ID
export const useRecipeIdQuery = (recipeId) => {
    return useQuery(['recipe', recipeId], async () => {
      try {
        const response = await axios.get(`http://57.128.194.195/api/v1/recipes/${recipeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      } catch (error) {
        throw new Error('Wystąpił błąd podczas pobierania danych przepisu');
      }
    });
  };


  // Aktualizacja przepisu
export const useUpdateRecipeMutation = () => {
    return useMutation(
      async ({ recipeId, updatedRecipe }) => {
        try {
          const response = await axios.put(`http://57.128.194.195/api/v1/recipes/${recipeId}`, updatedRecipe, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
          });
          return response.data;
        } catch (error) {
          throw new Error('Wystąpił błąd podczas aktualizacji przepisu');
        }
      },
      
    );
  };
  
  // Dodawanie nowego przepisu
  export const useAddRecipeMutation = () => {
    return useMutation(
      async (newRecipe) => {
        try {
            console.log('dane w axios'+newRecipe)
          const response = await axios.post('http://57.128.194.195/api/v1/recipes', newRecipe, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
          });
          return response.data;
        } catch (error) {
          throw new Error('Wystąpił błąd podczas dodawania nowego przepisu');
        }
      },
    );
  };

  export const useDeleteRecipeMutation = () => {
    return useMutation(
      async (recipeId) => {
        try {
          await axios.delete(`http://57.128.194.195/api/v1/recipes/${recipeId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          throw new Error('Błąd podczas usuwania przepisu');
        }
      },
    );
  };