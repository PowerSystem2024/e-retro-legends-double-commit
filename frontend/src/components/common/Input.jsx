import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  name,
  label,
  error,
  required = false,
  className = '' 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-bold mb-2 text-gray-700">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 focus:outline-none transition-colors ${error ? 'border-red-600' : ''} ${className}`}
      />
      {error && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;

