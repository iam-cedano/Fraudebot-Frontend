import FraudebotLogo from "@presentation/assets/fraudebot-logo.webp";

function Footer() {
    return (
        <footer className="bg-[#242b35] py-16 px-8 flex flex-col md:flex-row justify-center items-start gap-12 md:gap-32 w-full">
            <div className="flex flex-col items-center gap-4">
                <img src={FraudebotLogo} alt="Logo" className="rounded-2xl" />
                
                <p className="text-gray-200 text-2xl text-center leading-relaxed font-[Nunito]">
                    “El respeto se gana.<br />
                    La honestidad se aprecia.<br />
                    La confianza se adquiere.<br />
                    La lealtad se devuelve.”
                </p>
            </div>

            <div className="flex flex-col space-y-4 font-[Nunito]">
                <h3 className="text-gray-400 text-2xl mb-2">Comunidad</h3>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Facebook</a>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Twitter</a>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Youtube</a>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Instagram</a>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Telegram</a>
            </div>

            <div className="flex flex-col space-y-4 font-[Nunito]">
                <h3 className="text-gray-400 text-2xl mb-2">Herramientas</h3>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Buscador</a>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Seguimiento</a>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">API</a>
                <a href="#" className="text-white text-2xl hover:text-gray-300 underline decoration-1 underline-offset-4 font-light">Sugerencias</a>
            </div>
        </footer>
    );
}

export default Footer;