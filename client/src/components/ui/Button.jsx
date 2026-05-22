import { Link } from 'react-router-dom'

const sizeClass = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const variantClass = {
  primary: 'bg-accent text-text-inverse font-semibold hover:bg-accent-dim transition-colors duration-200',
  ghost:   'border border-border-default text-text-primary hover:border-border-strong hover:bg-surface-01 transition-colors duration-200',
  text:    'relative text-text-secondary hover:text-text-primary transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-text-secondary after:transition-all after:duration-200 hover:after:w-full',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  children,
  disabled = false,
  className = '',
}) {
  const classes = [
    'inline-flex items-center gap-2 font-pretendard rounded-none focus-visible:outline-2 focus-visible:outline-accent',
    sizeClass[size],
    variantClass[variant],
    disabled ? 'opacity-40 pointer-events-none' : '',
    className,
  ].join(' ')

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}
