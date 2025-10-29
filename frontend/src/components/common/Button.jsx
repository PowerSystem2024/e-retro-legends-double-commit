import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  disabled = false,
  className = '' 
}) => {
  const baseStyles = 'font-bold border-2 cursor-pointer transition-all duration-200 uppercase';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white border-blue-800 hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-400 text-black border-gray-600 hover:bg-gray-500 active:bg-gray-600',
    success: 'bg-green-600 text-white border-green-800 hover:bg-green-700 active:bg-green-800',
    danger: 'bg-red-600 text-white border-red-800 hover:bg-red-700 active:bg-red-800',
    outline: 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50 active:bg-blue-100'
  };
  
  const sizeStyles = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

