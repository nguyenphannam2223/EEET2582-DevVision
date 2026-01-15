import { useLogic } from './useLogic';
import { Template } from './Template';

export default function Login() {
  const { form, onSubmit, error } = useLogic();

  return <Template form={form} onSubmit={onSubmit} error={error} />;
}
