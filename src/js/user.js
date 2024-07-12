import { useQuery } from 'react-query';
import axios from 'axios';

export const useLoggedInUserId = () => {
    return useQuery('loggedInUserId', async () => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://57.128.194.195/api/v1/users/me/profile', {
            headers: { 'accept': '*/*', 'Authorization': `Bearer ${token}` }
        });
        return response.data.id; 
    });
};

export const useLoggedInUser = () => {
    return useQuery('loggedInUserId', async () => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://57.128.194.195/api/v1/users/me/profile', {
            headers: { 'accept': '*/*', 'Authorization': `Bearer ${token}` }
        });
        return response.data; 
    });
};