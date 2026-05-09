import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Wordmark } from '../../components/ui/Wordmark';
import { Field } from '../../components/ui/Field';
import { TagPill } from '../../components/ui/TagPill';
import { useTags, tagsKeys } from '../../hooks/queries/useTags';
import { useHaircut } from '../../hooks/queries/useHaircuts';
import {
  useCreateHaircut,
  useUpdateHaircut,
  useDeleteHaircut,
} from '../../hooks/mutations/useHaircutMutations';
import { createTag } from '../../api/endpoints/tags';
import { ImagePlus, Plus, Trash2, X } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  price: z.string().min(1, 'Preço inválido'),
  duration: z.string().min(1, 'Duração inválida'),
  description: z.string().min(10, 'Descreva o corte (mín. 10 caracteres)'),
});

type FormData = z.infer<typeof schema>;

export function CutFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id && id !== 'novo';

  const { data: cut } = useHaircut(isEdit ? id! : '');
  const { data: tags = [] } = useTags();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useCreateHaircut();
  const updateMutation = useUpdateHaircut();
  const deleteMutation = useDeleteHaircut();

  const [showNewTag, setShowNewTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const queryClient = useQueryClient();
  const createTagMutation = useMutation({
    mutationFn: createTag,
    onSuccess: (tag) => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.all });
      setSelectedTags((prev) => [...prev, tag.id]);
      setNewTagName('');
      setShowNewTag(false);
      toast.success(`Tag "${tag.name}" criada.`);
    },
    onError: () => toast.error('Não foi possível criar a tag.'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: cut ? {
      name: cut.name,
      price: String(cut.price),
      duration: String(cut.duration),
      description: cut.description,
    } : undefined,
  });

  function toggleTag(tagId: string) {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  }

  function onSubmit(data: FormData) {
    const price = Number(data.price);
    const duration = Number(data.duration);

    if (isEdit) {
      updateMutation.mutate(
        { id: id!, dto: { name: data.name, price, duration, description: data.description } },
        { onSuccess: () => navigate('/admin') }
      );
    } else {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', String(price));
      formData.append('duration', String(duration));
      formData.append('description', data.description);
      selectedTags.forEach((t) => formData.append('tags[]', t));
      imageFiles.forEach((f) => formData.append('images', f));
      createMutation.mutate(formData, { onSuccess: () => navigate('/admin') });
    }
  }

  function handleDelete() {
    if (isEdit && confirm('Remover este corte permanentemente?')) {
      deleteMutation.mutate(id!, { onSuccess: () => navigate('/admin') });
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="flex justify-between items-center px-[22px] sm:px-8 md:px-12 pt-[10px] pb-[18px]"
        style={{ borderBottom: '1px solid var(--color-line-2)' }}
      >
        <Wordmark className="h-7" />
        <button
          onClick={() => navigate('/admin')}
          className="font-mono text-[9px] tracking-[0.22em] uppercase"
          style={{ color: 'var(--color-cream-3)' }}
        >
          ← Cancelar
        </button>
      </header>

      <div className="px-[22px] sm:px-8 md:px-12 pt-[26px]">
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[8px]" style={{ color: 'var(--color-gold)' }}>
          {isEdit ? 'Editar corte' : 'Novo corte'}
        </div>
        <h1
          className="m-0 text-[32px] leading-[1]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'var(--color-cream)',
          }}
        >
          {isEdit ? 'Editar Corte' : 'Cadastrar Corte'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-[22px] sm:px-8 md:px-12 pt-[28px] pb-[40px] flex flex-col gap-[20px] flex-1">
        <Field label="Nome do corte" registration={register('name')} error={errors.name?.message} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Preço (R$)" type="number" registration={register('price')} error={errors.price?.message} />
          <Field label="Duração (min)" type="number" registration={register('duration')} error={errors.duration?.message} />
        </div>

        <Field label="Descrição" registration={register('description')} error={errors.description?.message} />

        {/* Tags */}
        <div>
          <div className="flex items-center justify-between mb-[10px]">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: 'var(--color-cream-3)' }}>
              Tags
            </div>
            <button
              type="button"
              onClick={() => { setShowNewTag((v) => !v); setNewTagName(''); }}
              className="flex items-center gap-[4px] font-mono text-[9px] tracking-[0.18em] uppercase"
              style={{ color: showNewTag ? 'var(--color-cream-3)' : 'var(--color-gold)' }}
            >
              {showNewTag ? <X size={11} /> : <Plus size={11} />}
              {showNewTag ? 'Cancelar' : 'Nova tag'}
            </button>
          </div>

          {showNewTag && (
            <div className="flex gap-2 mb-[10px]">
              <input
                autoFocus
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); if (newTagName.trim()) createTagMutation.mutate({ name: newTagName.trim() }); }
                  if (e.key === 'Escape') setShowNewTag(false);
                }}
                placeholder="Nome da tag"
                style={{
                  flex: 1, background: 'transparent', border: 'none',
                  borderBottom: '1px solid var(--color-gold)', outline: 'none',
                  color: 'var(--color-cream)', fontFamily: 'var(--font-body)',
                  fontSize: 14, padding: '6px 0',
                }}
              />
              <button
                type="button"
                disabled={!newTagName.trim() || createTagMutation.isPending}
                onClick={() => { if (newTagName.trim()) createTagMutation.mutate({ name: newTagName.trim() }); }}
                className="font-mono text-[9px] tracking-[0.18em] uppercase px-[12px] py-[6px]"
                style={{
                  background: newTagName.trim() ? 'var(--color-gold)' : 'var(--color-ink-3)',
                  color: newTagName.trim() ? 'var(--color-ink)' : 'var(--color-cream-3)',
                  transition: 'all 0.15s',
                }}
              >
                {createTagMutation.isPending ? '...' : 'Criar'}
              </button>
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <TagPill
                key={t.id}
                size="sm"
                active={selectedTags.includes(t.id)}
                onClick={() => toggleTag(t.id)}
              >
                {t.name}
              </TagPill>
            ))}
            {tags.length === 0 && !showNewTag && (
              <span className="font-mono text-[10px]" style={{ color: 'var(--color-cream-3)' }}>
                Nenhuma tag. Crie a primeira.
              </span>
            )}
          </div>
        </div>

        {/* Images — only on create */}
        {!isEdit && (
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-[10px]" style={{ color: 'var(--color-cream-3)' }}>
              Fotos
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {imagePreviews.map((src, i) => (
                  <img key={i} src={src} className="w-[80px] h-[80px] object-cover" style={{ border: '1px solid var(--color-line)' }} />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-[14px] py-[10px] font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ border: '1px solid var(--color-line)', color: 'var(--color-cream-2)' }}
            >
              <ImagePlus size={14} />
              {imageFiles.length > 0 ? `${imageFiles.length} foto(s) selecionada(s)` : 'Adicionar fotos'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-[10px] mt-auto pt-[10px]">
          <button
            type="submit"
            disabled={isPending}
            className="py-[16px] font-mono text-[11px] tracking-[0.22em] uppercase font-semibold transition-all"
            style={{
              background: isPending ? 'var(--color-ink-3)' : 'var(--color-gold)',
              color: isPending ? 'var(--color-cream-3)' : 'var(--color-ink)',
            }}
          >
            {isPending ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar corte'}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="py-[14px] flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ border: '1px solid rgba(220,80,80,0.4)', color: 'rgba(220,80,80,0.85)' }}
            >
              <Trash2 size={13} />
              Remover corte
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
