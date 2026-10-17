export default function Toast({ message, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[120] bg-brand-purple text-white font-medium text-sm px-5 py-3 rounded-2xl shadow-2xl pointer-events-none transition-all duration-300 max-w-[85vw] text-center ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {message}
    </div>
  );
}
