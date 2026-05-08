import { api } from '../client';
import type { Tag, CreateTagDto, UpdateTagDto } from '../../types/api';

export const listTags = () =>
  api.get<Tag[]>('/tags').then((r) => r.data);

export const getTag = (id: string) =>
  api.get<Tag>(`/tags/${id}`).then((r) => r.data);

export const createTag = (dto: CreateTagDto) =>
  api.post<Tag>('/tags', dto).then((r) => r.data);

export const updateTag = (id: string, dto: UpdateTagDto) =>
  api.put<Tag>(`/tags/${id}`, dto).then((r) => r.data);

export const deleteTag = (id: string) =>
  api.delete(`/tags/${id}`).then((r) => r.data);
