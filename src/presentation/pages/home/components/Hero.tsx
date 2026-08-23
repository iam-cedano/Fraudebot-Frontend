import LookupForm from "@/presentation/pages/home/components/LookupForm";
import BackgroundImage from "@presentation/assets/hero.webp";

function Hero() {
    return (
        <section 
            className="flex min-h-[38rem] w-full flex-col items-center bg-cover bg-center px-4 pb-12 pt-32 sm:justify-center"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
            aria-labelledby="home-search-title"
        >            
            <LookupForm />
        </section>
    );
}

export default Hero;