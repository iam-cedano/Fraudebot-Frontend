import { useEffect, useRef } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada: ${alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="absolute right-4 top-4 z-20 min-h-11 rounded-lg bg-white px-4 py-2 font-bold text-gray-950 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label="Cerrar vista de foto"
        onClick={onClose}
      >
        Cerrar
      </button>
      <img
        src={src}
        alt={alt}
        className="relative z-10 max-h-[85vh] max-w-[90vw] object-contain"
      />
    </div>
  );
}

export default ImageLightbox;
