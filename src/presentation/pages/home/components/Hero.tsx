import LookupForm from "@/presentation/pages/home/components/LookupForm";
import BackgroundImage from "@presentation/assets/hero.webp";

function Hero() {
    return (
        <section 
            className="w-full h-162.5 bg-cover bg-center flex flex-col items-center pt-8"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >            
            <LookupForm />
        </section>
    );
}

export default Hero;