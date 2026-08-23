import JuridicoImage from '@presentation/assets/juridico.webp';
import ReporteImage from '@presentation/assets/reportes.webp';
import ProveedoresImage from '@presentation/assets/proveedores.webp';
import NoticiasImage from '@presentation/assets/noticias.webp';
import AyudaImage from '@presentation/assets/ayuda.webp';

function AnchorBlocks() {
    const blocks = [
        { title: 'Jurídico', imageSrc: JuridicoImage },
        { title: 'Reportes', imageSrc: ReporteImage },
        { title: 'Proveedores', imageSrc: ProveedoresImage },
        { title: 'Noticias', imageSrc: NoticiasImage },
        { title: 'Ayuda', imageSrc: AyudaImage },
    ];

    return (
        <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="resources-title">
            <div className="mb-8 text-center">
                <h2 id="resources-title" className="text-3xl font-bold text-gray-900 font-[Nunito]">Más recursos</h2>
                <p className="mt-2 text-gray-600 font-[Nunito]">Estamos preparando estas secciones para ti.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-9">
            {blocks.map((block, index) => (
                <div
                    key={index}
                    className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-sm bg-gray-900"
                >
                    <img
                        src={block.imageSrc}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                    <span className="relative z-10 flex flex-col items-center text-lg font-bold tracking-wide text-white font-[Nunito] sm:text-xl">
                        {block.title}
                        <span className="mt-2 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-wider">Próximamente</span>
                    </span>
                </div>
            ))}
            </div>
        </section>
    );
}

export default AnchorBlocks;
