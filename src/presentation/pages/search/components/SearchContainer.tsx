import { SearchContainerProps } from "@presentation/pages/search/components/types";

function SearchContainer({children}: SearchContainerProps) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            {children}
        </div>
    );
}

export default SearchContainer;