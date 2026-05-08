export interface Tag {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Haircut {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  images: string[];
  tags?: Tag[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  cell: string;
  role: 'barber' | 'receptionist';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  cell: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  cell?: string;
}

export interface CreateTagDto {
  name: string;
  description?: string;
}

export interface UpdateTagDto {
  name?: string;
  description?: string;
}

export interface UpdateHaircutDto {
  name?: string;
  price?: number;
  duration?: number;
  description?: string;
}
