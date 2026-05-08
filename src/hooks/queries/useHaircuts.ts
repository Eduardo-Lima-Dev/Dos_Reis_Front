import { useQuery } from '@tanstack/react-query';
import { listHaircuts, getHaircut } from '../../api/endpoints/haircuts';

export const haircutsKeys = {
  all: ['haircuts'] as const,
  detail: (id: string) => ['haircuts', id] as const,
};

export function useHaircuts() {
  return useQuery({ queryKey: haircutsKeys.all, queryFn: listHaircuts });
}

export function useHaircut(id: string) {
  return useQuery({
    queryKey: haircutsKeys.detail(id),
    queryFn: () => getHaircut(id),
    enabled: !!id,
  });
}
