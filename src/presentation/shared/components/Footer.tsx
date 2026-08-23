import FraudebotLogo from "@presentation/assets/fraudebot-logo.webp";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/common/app-routes";

function Footer() {
    return (
        <footer className="flex w-full flex-col items-center justify-center gap-12 bg-[#242b35] px-8 py-16 md:flex-row md:items-start md:gap-32">
            <div className="flex flex-col items-center gap-4">
                <img src={FraudebotLogo} alt="FraudeBot" className="rounded-2xl" />
                
                <p className="max-w-md text-center text-xl leading-relaxed text-gray-200 font-[Nunito]">
                    “El respeto se gana.<br />
                    La honestidad se aprecia.<br />
                    La confianza se adquiere.<br />
                    La lealtad se devuelve.”
                </p>
            </div>

            <div className="flex flex-col space-y-4 font-[Nunito]">
                <h2 className="mb-2 text-xl text-gray-300">Navegación</h2>
                <Link to={APP_ROUTES.home} className="rounded text-lg font-light text-white underline decoration-1 underline-offset-4 hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Inicio</Link>
                <Link to={APP_ROUTES.search} className="rounded text-lg font-light text-white underline decoration-1 underline-offset-4 hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Buscador</Link>
                <Link to={APP_ROUTES.contact} className="rounded text-lg font-light text-white underline decoration-1 underline-offset-4 hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Contacto</Link>
            </div>

            <div className="flex flex-col space-y-4 font-[Nunito]">
                <h2 className="mb-2 text-xl text-gray-300">En desarrollo</h2>
                <p className="text-lg text-gray-300">Reportes y seguimiento</p>
                <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Próximamente</p>
            </div>
        </footer>
    );
}

export default Footer;