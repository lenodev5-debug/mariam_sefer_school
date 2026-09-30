import api from './api';

export const trackVisit = (path = window.location.pathname) => {
    api.post('/api/visits/track', { path }).catch(() => {});
};

export const getVisitStats = async () => {
    const { data } = await api.get('/api/visits/stats');
    return data;
};