import { useLogic } from './useLogic';
import { Template } from './Template';

export default function Register() {
  const { form, onSubmit, error } = useLogic();

  return <Template form={form} onSubmit={onSubmit} error={error} />;
}
