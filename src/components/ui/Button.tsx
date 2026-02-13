// =============================================================================
// Button Component
// =============================================================================
// A reusable button with multiple visual variants and sizes.
// Usage examples:
//   <Button variant="primary">Click Me</Button>
//   <Button variant="secondary" size="sm">Small Button</Button>
//   <Button variant="accent" size="lg">Big Green Button</Button>
// =============================================================================

import React from 'react'

// Define the props this component accepts
interface ButtonProps {
  children: React.ReactNode          // The text or elements inside the button
  variant?: 'primary' | 'secondary' | 'accent'  // Visual style
  size?: 'sm' | 'md' | 'lg'         // Button size
  onClick?: () => void               // Optional click handler
  className?: string                 // Additional CSS classes to merge in
  type?: 'button' | 'submit' | 'reset' // HTML button type
}

export default function Button({
  children,
  variant = 'primary',   // Default to blue/primary
  size = 'md',           // Default to medium size
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {

  // -------------------------------------------------------
  // Map variant names to Tailwind CSS classes
  // -------------------------------------------------------
  const variantClasses = {
    primary:   'bg-blue-800 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-blue-800 border-2 border-blue-800 hover:bg-blue-50 focus:ring-blue-500',
    accent:    'bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500',
  }

  // -------------------------------------------------------
  // Map size names to Tailwind CSS classes
  // -------------------------------------------------------
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        font-semibold rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        cursor-pointer
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
