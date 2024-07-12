import { useQuery, useMutation,queryCache } from 'react-query';

import axios from 'axios';

export const useLoginMutation = () => {
    return useMutation(async ({ email, password }) => {
      try {
        const response = await axios.post('http://57.128.194.195/api/v1/auth/authenticate', {
          email,
          password
        });
        console.log('Login request successful. Response:', response.data);
        return response.data.accessToken;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    });
  };
  


  export const useRegisterMutation = () => {
    return useMutation(async (formData) => {
      const response = await axios.post('http://57.128.194.195/api/v1/auth/register', formData);
      console.log('Registration request successful. Response:', response.data);
      return response.data; 
    });
  };
  
