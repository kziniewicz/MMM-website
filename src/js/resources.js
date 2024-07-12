import axios from 'axios';
import { queryCache } from 'react-query';
import { useQuery, useMutation } from 'react-query';

const token = localStorage.getItem('accessToken');

export const useResourceQueries = (resourceType,size) => {
  const getResource = async () => {
    const response = await axios.get(`http://57.128.194.195/api/v1/${resourceType}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { size:4000} // Dodanie parametru limit do żądania HTTP

    });
    return response.data.content;
  };

  const addResourceMutation = useMutation(
    async (newResourceName) => {
      await axios.post(`http://57.128.194.195/api/v1/${resourceType}`, { name: newResourceName }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
    
  );

  const editResourceMutation = useMutation(
    async ({ resourceId, newResourceName }) => {
      await axios.put(`http://57.128.194.195/api/v1/${resourceType}/${resourceId}`, { name: newResourceName }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
    
  );

  const deleteResourceMutation = useMutation(
    async (resourceId) => {
      await axios.delete(`http://57.128.194.195/api/v1/${resourceType}/${resourceId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
 
  );

  return { getResource, addResourceMutation, editResourceMutation, deleteResourceMutation };
};
