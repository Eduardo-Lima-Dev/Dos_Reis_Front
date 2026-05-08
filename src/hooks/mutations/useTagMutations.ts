import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createTag, updateTag, deleteTag } from '../../api/endpoints/tags';
import { tagsKeys } from '../queries/useTags';

export function useCreateTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tagsKeys.all });
      toast.success('Tag criada!');
    },
    onError: () => toast.error('Erro ao criar tag.'),
  });
}

export function useUpdateTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof updateTag>[1] }) =>
      updateTag(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tagsKeys.all });
      toast.success('Tag atualizada!');
    },
    onError: () => toast.error('Erro ao atualizar tag.'),
  });
}

export function useDeleteTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tagsKeys.all });
      toast.success('Tag removida.');
    },
    onError: () => toast.error('Erro ao remover tag.'),
  });
}
