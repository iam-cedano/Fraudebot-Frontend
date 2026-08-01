import { useEffect, useRef } from "react";
import { LookupFormProps } from "@/presentation/pages/search/components/types";

function LookupForm({ onSubmit, onInputChange, query }: LookupFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-max flex-col mt-25 mb-8"
    >
      <div className="flex gap-6">
        <input
          ref={inputRef}
          type="text"
          placeholder="número cuenta, tarjeta, telefono, url"
          className="grow p-4 outline-none font-[Nunito] w-lg m-auto"
          style={{
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
          }}
          onInput={onInputChange}
          value={query}
        />

        <button
          type="submit"
          className="bg-gray-200 rounded p-4 font-[Nunito] hover:bg-gray-300 transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

export default LookupForm;
