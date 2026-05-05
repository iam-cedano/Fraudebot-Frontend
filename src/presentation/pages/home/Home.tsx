import Hero from "@presentation/pages/home/components/Hero";
import AnchorBlocks from "@presentation/pages/home/components/AnchorBlocks";
import HomeContainer from "@presentation/pages/home/components/HomeContainer";
import Reviews from "@presentation/pages/home/components/Reviews";
import FeatureBlock from "@presentation/pages/home/components/FeatureBlock";
import Footer from "@/presentation/shared/components/Footer";
import Header from "@/presentation/shared/components/Header";

function Home() {
    return (
        <>
        <title>FraudeBot - Home</title>

        <Header />
        <HomeContainer>                
            <Hero />
            <AnchorBlocks />
            <FeatureBlock />
            <Reviews />
        </HomeContainer>

        <Footer />
        </>
    );
}

export default Home;