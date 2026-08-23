import { APP_ROUTES } from "@/common/app-routes";
import Formatter from "@/presentation/shared/utils/formatter";
import SearchInput from "@/presentation/shared/components/SearchInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LookupForm() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchValue) {
      navigate(`${APP_ROUTES.search}?${Formatter.buildSearchQueryString(searchValue)}`);
    }
  }

  function handleInput(value: string) {
    setSearchValue(value);
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex w-full max-w-4xl flex-col items-center rounded-xl bg-white px-5 py-7 shadow-lg sm:px-8"
    >
      <h1 id="home-search-title" className="mb-4 text-center text-3xl font-medium text-gray-900 font-[Nunito] sm:text-4xl">
        <span className="font-bold">FraudeBot</span> te protege de los
        estafadores
      </h1>
      <label htmlFor="lookup-search" className="mb-8 text-center text-lg text-gray-800 font-[Nunito] sm:text-2xl">
        Buscar por{" "}
        <span className="font-bold">
          tarjeta, cuenta, CLABE, nombre, teléfono
        </span>{" "}
        o <span className="font-bold">URL</span>
      </label>
      <SearchInput
        id="lookup-search"
        value={searchValue}
        onInput={(event) =>
          Formatter.FormatInputAndUpdate(event.currentTarget.value, handleInput)
        }
      />
    </form>
  );
}

export default LookupForm;
