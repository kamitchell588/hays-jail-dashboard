interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export default function KPICard({ title, value, subtitle, className = '' }: KPICardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
        {title}
      </h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>
      {subtitle && (
        <p className="mt-2 text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}