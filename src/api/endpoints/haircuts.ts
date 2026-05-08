import { api } from '../client';
import type { Haircut, UpdateHaircutDto } from '../../types/api';

export const listHaircuts = () =>
  api.get<Haircut[]>('/haircut').then((r) => r.data);

export const getHaircut = (id: string) =>
  api.get<Haircut>(`/haircut/${id}`).then((r) => r.data);

export const createHaircut = (formData: FormData) =>
  api.post<Haircut>('/haircut', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);

export const updateHaircut = (id: string, dto: UpdateHaircutDto) =>
  api.put<Haircut>(`/haircut/${id}`, dto).then((r) => r.data);

export const deleteHaircut = (id: string) =>
  api.delete(`/haircut/${id}`).then((r) => r.data);
