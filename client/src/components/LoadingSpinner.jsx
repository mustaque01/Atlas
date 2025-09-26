import { Loader2, Heart, Zap } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'default', 
  variant = 'default', 
  text = 'Loading...', 
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    default: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinners = {
    default: <Loader2 className={`${sizeClasses[size]} animate-spin`} />,
    heart: <Heart className={`${sizeClasses[size]} animate-pulse text-red-500`} />,
    pulse: <div className={`${sizeClasses[size]} bg-rose-500 rounded-full animate-pulse`} />,
    dots: (
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    ),
    bars: (
      <div className="flex items-end space-x-1">
        <div className="w-1 bg-rose-500 animate-pulse" style={{ height: '20px', animationDelay: '0ms' }}></div>
        <div className="w-1 bg-rose-500 animate-pulse" style={{ height: '30px', animationDelay: '150ms' }}></div>
        <div className="w-1 bg-rose-500 animate-pulse" style={{ height: '25px', animationDelay: '300ms' }}></div>
        <div className="w-1 bg-rose-500 animate-pulse" style={{ height: '35px', animationDelay: '450ms' }}></div>
      </div>
    ),
    ripple: (
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-rose-500 border-opacity-30 rounded-full`}></div>
        <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-rose-500 border-t-transparent rounded-full animate-spin`}></div>
      </div>
    )
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        {spinners[variant]}
        
        {/* Glow effect for certain variants */}
        {variant === 'default' && (
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-lg animate-pulse"></div>
        )}
      </div>
      
      {showText && (
        <p className={`text-gray-400 font-medium ${textSizeClasses[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;