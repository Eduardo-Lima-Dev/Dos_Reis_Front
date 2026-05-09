import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listUsers, listReceptionists, getUser, createReceptionist } from '../../api/endpoints/users';

export const usersKeys = {
  all: ['users'] as const,
  receptionists: ['users', 'receptionists'] as const,
  detail: (id: string) => ['users', id] as const,
};

export function useUsers() {
  return useQuery({ queryKey: usersKeys.all, queryFn: listUsers });
}

export function useReceptionists() {
  return useQuery({ queryKey: usersKeys.receptionists, queryFn: listReceptionists });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

export function useCreateReceptionist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReceptionist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.receptionists });
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}
