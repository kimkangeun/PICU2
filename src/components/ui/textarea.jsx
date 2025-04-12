export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border rounded p-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  )
}
