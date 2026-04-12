import Hero from "@presentation/pages/home/components/Hero";
import AnchorBlocks from "@presentation/pages/home/components/AnchorBlocks";
import HomeContainer from "@presentation/pages/home/components/HomeContainer";
import { FeatureBlock } from "./components/FeatureBlock";

function Home() {
    return (
        <>
        <title>FraudeBot - Home</title>

        <HomeContainer>
            <Hero />
            <AnchorBlocks />
            <FeatureBlock />

        </HomeContainer>
        </>
    );
}

export default Home;