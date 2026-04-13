import Hero from "@presentation/pages/home/components/Hero";
import AnchorBlocks from "@presentation/pages/home/components/AnchorBlocks";
import HomeContainer from "@presentation/pages/home/components/HomeContainer";
import Reviews from "@presentation/pages/home/components/Reviews";
import FeatureBlock from "@presentation/pages/home/components/FeatureBlock";

function Home() {
    return (
        <>
        <title>FraudeBot - Home</title>

        <HomeContainer>
            
            <Hero />
            <AnchorBlocks />
            <FeatureBlock />
            <Reviews />

        </HomeContainer>
        </>
    );
}

export default Home;