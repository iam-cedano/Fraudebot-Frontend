import JuridicoImage from '@presentation/assets/juridico.webp';
import ReporteImage from '@presentation/assets/reportes.webp';
import ProveedoresImage from '@presentation/assets/proveedores.webp';
import NoticiasImage from '@presentation/assets/noticias.webp';
import AyudaImage from '@presentation/assets/ayuda.webp';

function AnchorBlocks() {
    const blocks = [
        { title: 'Juridico', href: '#', imageSrc: JuridicoImage },
        { title: 'Reportes', href: '#', imageSrc: ReporteImage },
        { title: 'Proveedores', href: '#', imageSrc: ProveedoresImage },
        { title: 'Noticias', href: '#', imageSrc: NoticiasImage },
        { title: 'Ayuda', href: '#', imageSrc: AyudaImage },
    ];

    return (
        <section className="flex flex-wrap justify-center gap-9 py-12 px-4 max-w-6xl mx-auto">
            {blocks.map((block, index) => (
                <a
                    key={index}
                    href={block.href}
                    className="group relative flex items-center justify-center w-48 h-48 sm:w-48 sm:h-48 overflow-hidden bg-gray-900 rounded-sm hover:-translate-y-1 transition-transform duration-300"
                >
                    <img
                        src={block.imageSrc}
                        alt={block.title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    />
                    <span className="relative z-10 text-white text-lg sm:text-xl font-medium tracking-wide font-[Nunito]">
                        {block.title}
                    </span>
                </a>
            ))}
        </section>
    );
}

export default AnchorBlocks;
