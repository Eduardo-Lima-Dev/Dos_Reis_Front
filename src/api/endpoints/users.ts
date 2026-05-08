import { api } from '../client';
import type { User, CreateUserDto, UpdateUserDto } from '../../types/api';

export const listUsers = () =>
  api.get<User[]>('/users/all').then((r) => r.data);

export const listReceptionists = () =>
  api.get<User[]>('/users/all/receptionists').then((r) => r.data);

export const getUser = (id: string) =>
  api.get<User>(`/users/${id}`).then((r) => r.data);

export const createBarber = (dto: CreateUserDto) =>
  api.post<User>('/users', dto).then((r) => r.data);

export const createReceptionist = (dto: CreateUserDto) =>
  api.post<User>('/users/receptionist', dto).then((r) => r.data);

export const updateUser = (id: string, dto: UpdateUserDto) =>
  api.put<User>(`/users/${id}`, dto).then((r) => r.data);

export const deleteUser = (id: string) =>
  api.delete(`/users/${id}`).then((r) => r.data);
