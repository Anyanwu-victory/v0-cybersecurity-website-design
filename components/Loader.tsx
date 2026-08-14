interface LoaderProps {
  label?: string
  fullPage?: boolean
}

// Shared accessible spinner used by route boundaries and client-side loading states.
export default function Loader({
  label = "Loading content",
  fullPage = false,
}: LoaderProps) {
  return (
    <div
      className={`flex w-full items-center justify-center ${fullPage ? "min-h-[70vh]" : "min-h-48"}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {/* A highlighted top border creates a simple circular loading animation. */}
      <div
        className="h-11 w-11 animate-spin rounded-full border-4 border-white/15 border-t-[#E11D2E] shadow-[0_0_20px_rgba(225,29,46,0.25)]"
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
