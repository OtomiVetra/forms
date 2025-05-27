import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Input from './common/Input.tsx';
import { emailRegex, passwordRegex } from '../variables/regex.ts';
import Button from './common/Button.tsx';

interface SigninProps {
  onSubmit: (data: SigninData) => void;
}

interface SigninData {
  email: string;
  password: string;
}

interface SigninErrors {
  email?: string;
  password?: string;
}

const Signin: React.FC<SigninProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SigninData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<SigninErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: SigninErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Пароль должен содержать буквы, цифры и быть не короче 6 символов';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);

    setFormData({ email: '', password: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className='bg-white p-6 rounded-lg shadow-md space-y-4'
    >
      <h2 className='text-xl font-bold text-center'>Вход</h2>
      <Input
        label='Email'
        name='email'
        type='email'
        placeholder='Введите email'
        required
        color='filled'
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label='Пароль'
        name='password'
        type='password'
        placeholder='Введите пароль'
        required
        color='filled'
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Button type='submit'>Войти</Button>
    </form>
  );
};

export default Signin;
