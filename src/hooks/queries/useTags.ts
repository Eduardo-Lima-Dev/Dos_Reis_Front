import { useQuery } from '@tanstack/react-query';
import { listTags } from '../../api/endpoints/tags';

export const tagsKeys = { all: ['tags'] as const };

export function useTags() {
  return useQuery({ queryKey: tagsKeys.all, queryFn: listTags });
}
