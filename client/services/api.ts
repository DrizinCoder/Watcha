import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3030/api',
})

export const videoService = {
    getAll: async () => {
        const response = await api.get('/video');
        return response.data
    },

    getById: async (id: string) => {
        const response = await api.get(`/video/${id}/play`)
        response.data;
    },

    upload: async (file: File, title: string, image: string, description: string) => {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('image_url', image);
        formData.append('description', description);
    
        const response = await api.post('/video', formData, {
            headers: {'Content-type': 'multipart/form-data'}
        });

        return response.data;
    }
}