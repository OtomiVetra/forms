import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Input from './common/Input.tsx';
import {
  emailRegex,
  passwordRegex,
  nicknameRegex,
} from '../variables/regex.ts';
import Button from './common/Button.tsx';

interface SignupProps {
  onSubmit: (data: SignupData) => void;
}

interface SignupData {
  name: string;
  nickname: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

interface SignupErrors {
  [key: string]: string | undefined;
}

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    nickname: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<SignupErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: SignupErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }

    if (!nicknameRegex.test(formData.nickname)) {
      newErrors.nickname =
        'Ник должен начинаться с буквы и содержать минимум 3 символа';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.gender) {
      newErrors.gender = 'Выберите пол';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Пароль должен содержать буквы и цифры и быть не короче 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);

    setFormData({
      name: '',
      nickname: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className='bg-white p-6 rounded-lg shadow-md space-y-4'
    >
      <h2 className='text-xl font-bold text-center'>Регистрация</h2>

      <Input
        label='Имя'
        name='name'
        type='text'
        placeholder='Введите имя'
        required
        color='filled'
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <Input
        label='Ник'
        name='nickname'
        type='text'
        placeholder='Введите ник'
        required
        color='filled'
        value={formData.nickname}
        onChange={handleChange}
        icon={<span>@</span>}
        error={errors.nickname}
      />

      <Input
        label='Почта'
        name='email'
        type='email'
        placeholder='Введите почту'
        required
        color='filled'
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <div className='flex flex-col gap-1'>
        <span className='text-sm font-medium text-gray-900'>
          Пол <span className='text-red-500'>*</span>
        </span>
        <div className='flex items-center gap-4'>
          <label className='flex items-center gap-2 text-sm'>
            <input
              type='radio'
              name='gender'
              value='male'
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />
            Мужской
          </label>
          <label className='flex items-center gap-2 text-sm'>
            <input
              type='radio'
              name='gender'
              value='female'
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
            />
            Женский
          </label>
        </div>
        {errors.gender && (
          <p className='text-xs text-red-500 mt-1'>{errors.gender}</p>
        )}
      </div>

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

      <Input
        label='Повторите пароль'
        name='confirmPassword'
        type='password'
        placeholder='Повторите пароль'
        required
        color='filled'
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <Button type='submit'>Зарегистрироваться</Button>
    </form>
  );
};

export default Signup;
