import LookupForm from "@/presentation/pages/home/components/LookupForm";
import BackgroundImage from "@presentation/assets/hero.webp";

function Hero() {
    return (
        <section 
            className="w-full h-162.5 bg-cover bg-center flex flex-col items-center pt-8"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <header className="w-full max-w-4xl h-16 bg-white mb-16 rounded shadow-sm">
                {/* Header content */}
            </header>
            
            <LookupForm />
        </section>
    );
}

export default Hero;