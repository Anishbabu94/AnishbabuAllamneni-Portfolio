interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span aria-hidden="true" className={`brand-mark ${className}`}>
      <span className="brand-mark__letters">AB</span>
      <span className="brand-mark__signal" />
    </span>
  );
}
