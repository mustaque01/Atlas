import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validators = {
    required: (value, message = 'This field is required') => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return message;
      }
      return '';
    },
    
    email: (value, message = 'Please enter a valid email address') => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        return message;
      }
      return '';
    },
    
    phone: (value, message = 'Please enter a valid phone number') => {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (value && !phoneRegex.test(value)) {
        return message;
      }
      return '';
    },
    
    minLength: (minLength, message) => (value) => {
      if (value && value.length < minLength) {
        return message || `Must be at least ${minLength} characters`;
      }
      return '';
    },
    
    maxLength: (maxLength, message) => (value) => {
      if (value && value.length > maxLength) {
        return message || `Must be no more than ${maxLength} characters`;
      }
      return '';
    },
    
    match: (fieldToMatch, message = 'Fields do not match') => (value, allValues) => {
      if (value && allValues[fieldToMatch] && value !== allValues[fieldToMatch]) {
        return message;
      }
      return '';
    },
    
    pattern: (regex, message = 'Invalid format') => (value) => {
      if (value && !regex.test(value)) {
        return message;
      }
      return '';
    },
    
    custom: (validatorFn, message) => (value, allValues) => {
      if (!validatorFn(value, allValues)) {
        return message || 'Invalid value';
      }
      return '';
    }
  };

  // Validate a single field
  const validateField = useCallback((fieldName, value, allValues = values) => {
    const fieldRules = validationRules[fieldName];
    if (!fieldRules) return '';

    for (const rule of fieldRules) {
      let error = '';
      
      if (typeof rule === 'string') {
        // Simple validation type
        error = validators[rule]?.(value, allValues);
      } else if (typeof rule === 'object') {
        // Object with type and options
        const { type, message, ...options } = rule;
        
        if (type === 'minLength' || type === 'maxLength') {
          error = validators[type](options.value || options.length, message)?.(value);
        } else if (type === 'match') {
          error = validators[type](options.field, message)?.(value, allValues);
        } else if (type === 'pattern') {
          error = validators[type](options.regex, message)?.(value);
        } else if (type === 'custom') {
          error = validators[type](options.validator, message)?.(value, allValues);
        } else {
          error = validators[type]?.(value, message);
        }
      } else if (typeof rule === 'function') {
        // Custom function
        error = rule(value, allValues) || '';
      }
      
      if (error) return error;
    }
    
    return '';
  }, [validationRules, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, [validationRules, values, validateField]);

  // Handle field change
  const handleChange = useCallback((fieldName) => (e) => {
    const value = e.target ? e.target.value : e;
    
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Validate field if it has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  }, [touched, validateField]);

  // Handle field blur
  const handleBlur = useCallback((fieldName) => () => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, values[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  }, [values, validateField]);

  // Set field value
  const setValue = useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  }, [touched, validateField]);

  // Set multiple values
  const updateValues = useCallback((newValues) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback((onSubmit) => async (e) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validationRules, validateForm]);

  // Get field props for easier integration with input components
  const getFieldProps = useCallback((fieldName) => ({
    value: values[fieldName] || '',
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
    error: touched[fieldName] ? errors[fieldName] : '',
  }), [values, errors, touched, handleChange, handleBlur]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    validateField,
    resetForm,
    getFieldProps,
    isValid: Object.keys(errors).length === 0,
    hasErrors: Object.values(errors).some(error => error),
  };
};

export default useFormValidation;