import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Wordmark } from '../../components/ui/Wordmark';
import { Field } from '../../components/ui/Field';
import { login as loginApi } from '../../api/endpoints/auth';
import { useAuth } from '../../contexts/AuthContext';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (!data?.access_token) {
        toast.error('Erro do servidor: token não recebido.');
        return;
      }
      login(data.access_token);
      navigate('/admin');
    },
    onError: () => toast.error('Credenciais inválidas. Verifique seu e-mail e senha.'),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <button
        onClick={() => navigate('/')}
        className="mx-[22px] sm:mx-8 md:mx-auto md:max-w-md md:w-full mt-[8px] self-start font-mono text-[9px] tracking-[0.22em] uppercase flex items-center gap-[6px] py-[8px]"
        style={{ color: 'var(--color-cream-3)' }}
      >
        ← Voltar ao catálogo
      </button>

      <div className="px-[22px] sm:px-8 md:px-0 md:max-w-md md:mx-auto md:w-full pt-[32px] flex-1">
        <Wordmark className="h-10" />

        <div className="mt-[38px]">
          <div className="font-mono text-[9px] tracking-[0.32em] uppercase mb-[10px]" style={{ color: 'var(--color-gold)' }}>
            Acesso da Equipe
          </div>
          <h1
            className="m-0 text-[42px] leading-[1]"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-cream)',
            }}
          >
            Bem-vindo<br />de volta.
          </h1>
        </div>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="mt-[36px] flex flex-col gap-[16px]"
        >
          <Field
            label="E-mail"
            type="email"
            registration={register('email')}
            error={errors.email?.message}
          />
          <Field
            label="Senha"
            type="password"
            registration={register('password')}
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-[16px] w-full font-mono tracking-[0.28em] uppercase font-bold transition-all duration-[180ms]"
            style={{
              padding: '20px 24px',
              fontSize: 13,
              background: mutation.isPending ? 'var(--color-ink-3)' : 'var(--color-gold)',
              color: mutation.isPending ? 'var(--color-cream-3)' : 'var(--color-ink)',
              cursor: mutation.isPending ? 'wait' : 'pointer',
              letterSpacing: '0.28em',
            }}
          >
            {mutation.isPending ? 'Entrando...' : 'Entrar →'}
          </button>
        </form>
      </div>

      <div className="px-[22px] py-[28px] text-center">
        <div className="font-mono text-[9px] tracking-[0.32em] uppercase" style={{ color: 'var(--color-cream-3)' }}>
          Barbearia dos Reis · Área Restrita
        </div>
      </div>
    </div>
  );
}
