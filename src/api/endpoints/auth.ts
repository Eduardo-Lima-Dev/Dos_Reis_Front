import { api } from '../client';
import type { AuthResponse, JwtPayload, LoginDto } from '../../types/api';

export const login = (dto: LoginDto) =>
  api.post<AuthResponse>('/auth/login', dto).then((r) => r.data);

export const getProfile = () =>
  api.get<JwtPayload>('/auth/profile').then((r) => r.data);
