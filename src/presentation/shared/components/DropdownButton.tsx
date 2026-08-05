import { useEffect, useRef, useState } from "react";
import { DropdownButtonProps } from "@presentation/shared/components/types";

function DropdownButton({
  label,
  options,
  className = "cursor-pointer inline-flex items-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-sky-600",
  iconSrc,
  align = "right",
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleOptionClick(option: DropdownButtonProps["options"][number]) {
    if (option.disabled) {
      return;
    }

    option.onClick();
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        className={className}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {label}
        {iconSrc && (
          <img
            src={iconSrc}
            alt=""
            aria-hidden
            className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {isOpen && (
        <ul
          role="menu"
          className={`absolute z-10 mt-1 min-w-44 overflow-hidden rounded-md border border-gray-100 bg-white py-1 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((option) => (
            <li key={option.id} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={option.disabled}
                className="cursor-pointer flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handleOptionClick(option)}
              >
                {option.iconSrc && (
                  <img
                    src={option.iconSrc}
                    alt=""
                    aria-hidden
                    className="h-4 w-4"
                  />
                )}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownButton;
