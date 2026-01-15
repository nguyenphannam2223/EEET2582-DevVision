import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { formSchema } from './schema';
import type { RegisterFormValues } from './schema';

export function useLogic() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      country: "",
      city: "",
      address: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      setError(null);
      await register(values);
      navigate('/');
    } catch (err: any) {
       setError(err.response?.data?.errors?.[0]?.message || "Registration failed. Please try again.");
    }
  }

  return {
    form,
    onSubmit,
    error,
    navigate
  };
}
