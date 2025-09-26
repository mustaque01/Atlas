import React from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

const FormField = ({ 
  label,
  name,
  type = 'text',
  placeholder,
  icon,
  rightIcon,
  required = false,
  helperText,
  className,
  containerClassName,
  value,
  onChange,
  onBlur,
  error,
  success,
  disabled,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        icon={icon}
        rightIcon={rightIcon}
        helperText={helperText}
        className={className}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        success={success}
        disabled={disabled}
        required={required}
        {...props}
      />
    </div>
  );
};

export default FormField;