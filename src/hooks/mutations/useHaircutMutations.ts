import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createHaircut,
  updateHaircut,
  deleteHaircut,
} from '../../api/endpoints/haircuts';
import { haircutsKeys } from '../queries/useHaircuts';

export function useCreateHaircut() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createHaircut,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: haircutsKeys.all });
      toast.success('Corte criado com sucesso!');
    },
    onError: () => toast.error('Erro ao criar corte.'),
  });
}

export function useUpdateHaircut() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof updateHaircut>[1] }) =>
      updateHaircut(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: haircutsKeys.all });
      toast.success('Corte atualizado!');
    },
    onError: () => toast.error('Erro ao atualizar corte.'),
  });
}

export function useDeleteHaircut() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteHaircut,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: haircutsKeys.all });
      toast.success('Corte removido.');
    },
    onError: () => toast.error('Erro ao remover corte.'),
  });
}
