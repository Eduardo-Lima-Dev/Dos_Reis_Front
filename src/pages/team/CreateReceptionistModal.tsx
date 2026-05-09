import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '../../components/ui/Field';
import { useCreateReceptionist } from '../../hooks/queries/useUsers';

const schema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  cell: z.string().min(10, 'Celular inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

interface CreateReceptionistModalProps {
  onClose: () => void;
}

export function CreateReceptionistModal({ onClose }: CreateReceptionistModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createReceptionist, isPending } = useCreateReceptionist();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await createReceptionist(data);
      onClose();
    } catch (err) {
      alert('Erro ao criar recepcionista. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center items-end sm:items-center animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md max-h-[92vh] overflow-y-auto animate-slide-up relative bg-ink"
        style={{
          background: 'var(--color-ink)',
          borderTop: '1px solid var(--color-gold)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        }}
      >
        <div className="flex justify-center pt-2 sm:hidden">
          <div className="w-9 h-[3px] rounded-sm" style={{ background: 'var(--color-line)' }} />
        </div>

        <button
          onClick={onClose}
          className="absolute top-[18px] right-[18px] w-[34px] h-[34px] rounded-full flex items-center justify-center text-[16px] z-[2]"
          style={{
            border: '1px solid var(--color-line)',
            color: 'var(--color-cream)',
            background: 'rgba(10,10,10,0.6)',
          }}
        >
          ×
        </button>

        <div className="p-[28px_22px_32px]">
          <h2
            className="m-0 text-[32px] leading-[1] mb-[24px]"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-cream)',
            }}
          >
            Adicionar <br />
            <span style={{ color: 'var(--color-gold)' }}>Recepcionista</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Field
              label="Nome"
              placeholder="Nome completo"
              registration={register('name')}
              error={errors.name?.message}
            />

            <Field
              label="Email"
              type="email"
              placeholder="email@exemplo.com"
              registration={register('email')}
              error={errors.email?.message}
            />

            <Field
              label="Celular"
              placeholder="(88) 99999-9999"
              registration={register('cell')}
              error={errors.cell?.message}
            />

            <Field
              label="Senha"
              type="password"
              placeholder="Senha de acesso"
              registration={register('password')}
              error={errors.password?.message}
            />

            <div className="mt-4">
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isPending}
              >
                {isPending ? 'Criando...' : 'Criar Recepcionista'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
