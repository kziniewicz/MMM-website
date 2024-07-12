import { useQuery, useMutation,queryCache } from 'react-query';
import axios from 'axios';

const token = localStorage.getItem('accessToken');

const fetchArticles = async (page) => {
  const response = await axios.get(`http://57.128.194.195/api/v1/knowledgeBase/articles?page=${page}`, {
    
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};


const useArticles = (page) => {
  return useQuery(['articles', page], () => fetchArticles(page));
}

const addArticle = async (newArticle) => {
  const response = await axios.post('http://57.128.194.195/api/v1/knowledgeBase/articles', newArticle, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const useAddArticle = () => {
  return useMutation(addArticle);
};

const deleteArticle = async (articleId) => {
  await axios.delete(`http://57.128.194.195/api/v1/knowledgeBase/articles/${articleId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const useDeleteArticle = () => {
  return useMutation(deleteArticle);
};

const getArticle = async (articleId) => {
  const response = await axios.get(`http://57.128.194.195/api/v1/knowledgeBase/articles/${articleId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const useGetArticle = () => {
  return useQuery('article', getArticle);
};


const useUpdateArticle = () => {
    return useMutation(
        async ({ articleId, categoryId, content, status, title }) => {
            const response = await axios.put(
                `http://57.128.194.195/api/v1/knowledgeBase/articles/${articleId}`,
                { categoryId, content, status, title },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            return response.data;
        },
      
    );
};

  

export { useArticles, useAddArticle, useDeleteArticle, useGetArticle, useUpdateArticle, getArticle };
