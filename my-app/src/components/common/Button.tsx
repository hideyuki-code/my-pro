import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {

  const baseStyle = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-blue-500 hover:bg-blue-700 text-white';
      break;
    case 'secondary':
      variantStyle = 'bg-gray-500 hover:bg-gray-700 text-white';
      break;
    case 'danger':
      variantStyle = 'bg-red-500 hover:bg-red-700 text-white';
      break;
    default:
      variantStyle = 'bg-blue-500 hover:bg-blue-700 text-white';
  }

  return (
    <button
      type={props.type || 'button'}
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;