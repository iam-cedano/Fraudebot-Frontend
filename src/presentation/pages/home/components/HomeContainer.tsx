import { HomeContainerProps } from "@presentation/pages/home/components/types";

function HomeContainer({ children }: HomeContainerProps) {
    return (
        <div>
            {children}
        </div>
    );
}

export default HomeContainer;