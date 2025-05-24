export function Textarea({ value, onChange, placeholder, className = "" }: any) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 rounded text-sm ${className}`}
    />
  );
}