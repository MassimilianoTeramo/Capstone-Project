import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Aggiungi il token a tutte le richieste
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Token dal localStorage:', token);
        
        console.log('Token salvato:', localStorage.getItem('token'));
        
        if (token) {
            const trimmedToken = token.trim();
            // Rimuovo eventuali spazi e il prefisso Bearer se presente
            const cleanToken = trimmedToken.startsWith('Bearer ') 
        ? trimmedToken 
        : `Bearer ${trimmedToken}`;
            console.log('Token pulito:', cleanToken);
    
            // Aggiungo sempre il prefisso Bearer
            config.headers.Authorization = cleanToken;
            console.log('Header Authorization finale:', config.headers.Authorization);
        }
        return config;
    },
    (error) => {
        console.error('Errore nell\'interceptor:', error);
        return Promise.reject(error);
    }
);

// Gestisci gli errori di autenticazione
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Token non valido o scaduto');
            // Token scaduto o non valido
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);



export default api;


