import { HomeContainerProps } from "@presentation/pages/home/components/types";

function HomeContainer({ children }: HomeContainerProps) {
    return (
        <main>
            {children}
        </main>
    );
}

export default HomeContainer;