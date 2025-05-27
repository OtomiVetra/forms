interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  required?: boolean;
  description?: string;
  error?: string;
  className?: string;
  color?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  required,
  description,
  error,
  className = '',
  color = 'default',
  size = 'md',
  radius = 'md',
  icon,
  ...props
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-base px-4',
    lg: 'h-12 text-lg px-5',
  };

  const radiusClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const colorClasses: Record<string, string> = {
    default: 'bg-white',
    filled: 'bg-gray-200',
  };

  const borderClass = error
    ? 'border border-red-500 focus:ring-red-500 placeholder-red-400 text-red-600'
    : 'border border-gray-300 focus:ring-blue-500';

  const paddingLeft = icon ? 'pl-10' : '';

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label className='text-sm font-medium text-gray-900'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      {description && (
        <p className='text-xs text-gray-500 -mt-1 mb-1'>
          {description}
        </p>
      )}

      <div className='relative'>
        {icon && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500'>
            {icon}
          </div>
        )}
        <input
          className={`w-full focus:outline-none focus:ring-2 ${sizeClasses[size]} ${radiusClasses[radius]} ${colorClasses[color]} ${borderClass} ${paddingLeft} ${className}`}
          required={required}
          {...props}
        />
      </div>

      {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
    </div>
  );
};

export default Input;
