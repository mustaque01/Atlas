import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building, 
  CreditCard,
  Calendar,
  MapPin,
  Save,
  ArrowRight
} from 'lucide-react';
import FormField from './FormField';
import { Button } from './ui/button-enhanced';
import useFormValidation from '../hooks/useFormValidation';

const ModernFormDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    loanAmount: '',
    income: '',
    employer: '',
    address: '',
    dateOfBirth: '',
  };

  const validationRules = {
    firstName: ['required'],
    lastName: ['required'],
    email: ['required', 'email'],
    phone: ['required', 'phone'],
    password: ['required', { type: 'minLength', length: 6, message: 'Password must be at least 6 characters' }],
    confirmPassword: [
      'required',
      { type: 'match', field: 'password', message: 'Passwords must match' }
    ],
    loanAmount: ['required'],
    income: ['required'],
    employer: ['required'],
    address: ['required'],
    dateOfBirth: ['required'],
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    resetForm
  } = useFormValidation(initialValues, validationRules);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    
    setIsSubmitting(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4">
            Modern Form Components
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcase of reusable form components with validation, modern design, and smooth animations
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-rose-500" />
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                name="firstName"
                placeholder="John"
                icon={User}
                required
                value={values.firstName}
                onChange={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={touched.firstName ? errors.firstName : ''}
              />
              
              <FormField
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                icon={User}
                required
                value={values.lastName}
                onChange={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={touched.lastName ? errors.lastName : ''}
              />
              
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                icon={Mail}
                required
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email ? errors.email : ''}
                helperText="We'll never share your email"
              />
              
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="9876543210"
                icon={Phone}
                required
                value={values.phone}
                onChange={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={touched.phone ? errors.phone : ''}
              />
              
              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                icon={Calendar}
                required
                value={values.dateOfBirth}
                onChange={handleChange('dateOfBirth')}
                onBlur={handleBlur('dateOfBirth')}
                error={touched.dateOfBirth ? errors.dateOfBirth : ''}
              />
              
              <FormField
                label="Address"
                name="address"
                placeholder="123 Main Street"
                icon={MapPin}
                required
                value={values.address}
                onChange={handleChange('address')}
                onBlur={handleBlur('address')}
                error={touched.address ? errors.address : ''}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-emerald-500" />
              Security
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                required
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password ? errors.password : ''}
                helperText="At least 6 characters"
              />
              
              <FormField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                required
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : ''}
              />
            </div>
          </div>

          {/* Loan Information */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-500" />
              Loan Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                label="Loan Amount"
                name="loanAmount"
                type="number"
                placeholder="50000"
                icon={CreditCard}
                required
                value={values.loanAmount}
                onChange={handleChange('loanAmount')}
                onBlur={handleBlur('loanAmount')}
                error={touched.loanAmount ? errors.loanAmount : ''}
                helperText="Amount in ₹"
              />
              
              <FormField
                label="Monthly Income"
                name="income"
                type="number"
                placeholder="75000"
                icon={CreditCard}
                required
                value={values.income}
                onChange={handleChange('income')}
                onBlur={handleBlur('income')}
                error={touched.income ? errors.income : ''}
                helperText="Gross monthly income"
              />
              
              <FormField
                label="Employer"
                name="employer"
                placeholder="ABC Corp"
                icon={Building}
                required
                value={values.employer}
                onChange={handleChange('employer')}
                onBlur={handleBlur('employer')}
                error={touched.employer ? errors.employer : ''}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              type="submit"
              variant="default"
              size="lg"
              loading={isSubmitting}
              disabled={!isValid}
              leftIcon={<Save className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="min-w-48"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset Form
            </Button>
          </div>

          {/* Form State Debug Info */}
          <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Form State (Debug)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-2">Form Valid:</p>
                <p className={`font-semibold ${isValid ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isValid ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Fields with Errors:</p>
                <p className="text-amber-400 font-semibold">
                  {Object.keys(errors).length}
                </p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Touched Fields:</p>
                <p className="text-blue-400 font-semibold">
                  {Object.keys(touched).length}
                </p>
              </div>
            </div>
            
            {Object.keys(errors).length > 0 && (
              <div className="mt-4">
                <p className="text-red-400 font-semibold mb-2">Current Errors:</p>
                <ul className="space-y-1 text-sm text-red-300">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field} className="flex">
                      <span className="font-medium min-w-24">{field}:</span>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModernFormDemo;