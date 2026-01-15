import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { formSchema } from './schema';
import type { LoginFormValues } from './schema';

export function useLogic() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      setError(null);
      await login(values);
      navigate('/');
    } catch (err: any) {
        setError(err.response?.data?.errors?.[0]?.message || "Invalid credentials. Please try again.");
    }
  }

  return {
    form,
    onSubmit,
    error
  };
}
