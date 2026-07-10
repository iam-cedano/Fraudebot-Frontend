import { LookupFormProps } from "@/presentation/pages/search/components/types";

function LookupForm({ onSubmit, onInputChange, query }: LookupFormProps) {
  return (
    <div className="flex w-max flex-col mt-25">
      <div className="flex gap-6">
        <input
          type="text"
          placeholder="número cuenta, tarjeta, telefono, url"
          className="grow p-4 outline-none font-[Nunito] w-lg m-auto"
          style={{
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
          }}
          onInput={onInputChange}
          value={query}
        ></input>

        <button
          type="submit"
          className="bg-gray-200 rounded p-4 font-[Nunito] hover:bg-gray-300 transition-colors cursor-pointer"
          onClick={onSubmit}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default LookupForm;
