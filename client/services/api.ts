import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
})

export const videoService = {
    getAll: async () => {
        const response = await api.get('/videos');
        return response.data
    },

    getById: async (id: string) => {
        const response = await api.get(`/videos/${id}`)
        response.data;
    },

    upload: async (file: File, title: string, image: string, description: string) => {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('image-url', image);
        formData.append('description', description);
    
        const response = await api.post('/videos/upload', formData, {
            headers: {'Content-type': 'multipart/form-data'}
        });

        return response.data;
    }
}