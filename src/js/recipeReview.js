import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const token = localStorage.getItem('accessToken');

export const useFetchReviews = (recipeId) => {
  return useQuery(['reviews', recipeId], async () => {
    const response = await axios.get(`http://57.128.194.195/api/v1/recipes/${recipeId}/reviews`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.content;
  });
};

export const useAddReviewMutation = () => {
  return useMutation(async ({ recipeId, comment, rating }) => {
    await axios.post(`http://57.128.194.195/api/v1/recipes/${recipeId}/reviews`, { comment, rating }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  });
};

export const useEditReviewMutation = () => {
  return useMutation(async ({ recipeId, reviewId, comment, rating }) => {
    await axios.put(`http://57.128.194.195/api/v1/recipes/${recipeId}/reviews/${reviewId}`, { comment, rating }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  });
};

export const useDeleteReviewMutation = () => {
  return useMutation(async ({ recipeId, reviewId }) => {
    await axios.delete(`http://57.128.194.195/api/v1/recipes/${recipeId}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  });
};
