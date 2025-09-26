import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = forwardRef(({ className, type, error, success, icon: Icon, rightIcon, label, helperText, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          type={inputType}
          className={cn(
            "flex h-12 w-full rounded-lg border bg-zinc-800/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            // Dynamic styling based on state
            error 
              ? "border-red-500 focus-visible:ring-red-500 text-red-100" 
              : success
              ? "border-emerald-500 focus-visible:ring-emerald-500 text-emerald-100"
              : isFocused
              ? "border-rose-500 focus-visible:ring-rose-500 text-white"
              : "border-zinc-600 text-white hover:border-zinc-500",
            // Padding adjustments for icons
            Icon && "pl-10",
            (rightIcon || type === "password") && "pr-12",
            className
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {/* Right side icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          
          {rightIcon && (
            <div className="text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Focus ring effect */}
        {isFocused && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-500/20 to-pink-500/20 -z-10 blur-sm"></div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(error || success || helperText) && (
        <div className="mt-2 text-sm">
          {error && <p className="text-red-400">{error}</p>}
          {!error && success && <p className="text-emerald-400">{success}</p>}
          {!error && !success && helperText && <p className="text-gray-400">{helperText}</p>}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };