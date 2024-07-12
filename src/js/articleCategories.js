import { useQuery, useMutation, queryCache } from 'react-query';
import axios from 'axios';
const token = localStorage.getItem('accessToken');


export const useArticleCategoriesQuery = () => {
  return useQuery('articleCategory', async () => {
    const response = await axios.get(`http://57.128.194.195/api/v1/knowledgeBase/categories`, {
        params: {
            page: 0,
            size: 30,
            sortBy: 'id',
            sortDirection: 'ASC'
        },
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data.content;
  });
};

export const useAddArticleCategorynMutation = () => {
  return useMutation(
    async (newCategoryName) => {
      await axios.post(`http://57.128.194.195/api/v1/knowledgeBase/categories`, { name: newCategoryName }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
   
  );
};

export const useEditArticleCategoryMutation = () => {
  return useMutation(
    async ({ categoryId, newCategoryName }) => {
      await axios.put(`http://57.128.194.195/api/v1/knowledgeBase/categories/${categoryId}`, { name: newCategoryName }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
   
  );
};

export const useDeleteArticleCategoryMutation = () => {
  return useMutation(
    async (categoryId) => {
      await axios.delete(`http://57.128.194.195/api/v1/knowledgeBase/categories/${categoryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
    
    
  );
};
