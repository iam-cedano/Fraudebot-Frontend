import FraudeBotLogo from '@presentation/assets/fraudebot-logo.webp'

function Header() {
    return (
        <header className="w-full max-w-6xl h-20 bg-white mb-16 rounded shadow-sm flex items-center justify-between px-8 font-[Nunito]">
            <a href="#" className="flex items-center gap-2">
                <img src={FraudeBotLogo} alt="Fraudebot Logo" className="h-14" />
            </a>

            <nav className="flex items-center gap-12">
                <a href="#" className="font-semibold text-gray-700 hover:text-orange-600 transition-colors">Reportar</a>
                <a href="#" className="font-semibold text-gray-700 hover:text-orange-600 transition-colors">Blog</a>
                <a href="#" className="font-semibold text-gray-700 hover:text-orange-600 transition-colors">Nuestra misión</a>
                <a href="#" className="font-semibold text-gray-700 hover:text-orange-600 transition-colors">Herramientas</a>
            </nav>

            <a href="#" className="bg-orange-600 text-white text-center font-bold py-2 px-4 rounded-lg text-sm leading-tight hover:bg-orange-700 transition-colors">
                Promociona<br />tu negocio
            </a>
        </header>
    )
}

export default Header;