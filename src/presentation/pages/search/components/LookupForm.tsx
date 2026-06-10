import { LookupFormProps } from "@/presentation/pages/search/components/types";

function LookupForm({defaultQuery, onSubmit, onInputChange}: LookupFormProps) {
    return (
          <div className="flex w-max flex-col mt-25">
            <div className="flex">
              <input
                type="text"
                placeholder="número cuenta, tarjeta, telefono, url"
                className="grow p-4 outline-none font-[Nunito] w-lg m-auto"
                style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
                defaultValue={defaultQuery || ""}
                onChange={onInputChange}
              ></input>

              <button type="submit" onClick={onSubmit}>
                Buscar
              </button>
            </div>
          </div>
    )
}

export default LookupForm;