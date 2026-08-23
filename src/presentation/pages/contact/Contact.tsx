import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/common/app-routes";
import Footer from "@/presentation/shared/components/Footer";
import Header from "@/presentation/shared/components/Header";

function Contact() {
    return (
        <>
            <title>FraudeBot - Contacto</title>
            <Header />
            <main className="min-h-screen bg-orange-50 px-4 pb-20 pt-32 font-[Nunito]">
                <section className="mx-auto max-w-2xl rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm sm:p-12">
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-orange-700">
                        Próximamente
                    </p>
                    <h1 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
                        Estamos preparando nuestros canales de contacto
                    </h1>
                    <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-700">
                        Aún no recibimos reportes ni solicitudes desde esta página. Mientras
                        terminamos un canal seguro, puedes consultar la información disponible
                        en FraudeBot.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            to={APP_ROUTES.search}
                            className="rounded-lg bg-orange-700 px-6 py-3 font-bold text-white hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
                        >
                            Ir al buscador
                        </Link>
                        <Link
                            to={APP_ROUTES.home}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-bold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Contact;