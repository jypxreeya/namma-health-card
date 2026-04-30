import api from './api';
import { Lead, Patient, RegistrationEvent } from '@/lib/types';

export const executiveService = {
  getLeads: async () => {
    const response = await api.get('/field/leads');
    return response.data.data as Lead[];
  },

  getDrafts: async () => {
    const response = await api.get('/registration/drafts');
    return response.data.data as Patient[];
  },

  saveDraft: async (data: Partial<Patient>) => {
    const response = await api.post('/registration/drafts', data);
    return response.data.data as Patient;
  },

  onboardPatient: async (data: any) => {
    const response = await api.post('/registration/onboard', data);
    return response.data.data;
  },

  getPerformance: async () => {
    const response = await api.get('/field/performance');
    return response.data.data;
  }
};
