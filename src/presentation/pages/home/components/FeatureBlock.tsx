import React from 'react';
import ManWithScreensImage from "@presentation/assets/man-with-screens.webp"
import GirlWithScreensImage from "@presentation/assets/girl-with-screens.webp"
import { FeatureProps } from "@presentation/pages/home/components/types";

function FeatureBlock() {
    const features: FeatureProps[] = [
        {
            id: 'seguimiento',
            title: 'Seguimiento de Reportes',
            description: (
                <>
                    Puedes añadir la información de contacto de un vendedor y te avisaremos si hay noticias sobre él. Dale clic en <strong>"Dar Seguimiento"</strong> y comienza con el proceso. No tiene ningún costo.
                </>
            ),
            imageSrc: ManWithScreensImage,
            imageAlt: 'Ilustración de Seguimiento de Reportes',
            reverse: false,
            buttons: [
                { label: 'Dar Seguimiento', variant: 'primary', href: '#' },
                { label: 'Buscar Reportes', variant: 'secondary', href: '#' },
            ]
        },
        {
            id: 'promociona',
            title: 'Promociona tu negocio con nosotros',
            description: (
                <>
                    <strong>Fraudebot</strong> es visitado y confiado por miles de personas en México al hacer negocios online. Con nuestra infraestructura puede promocionar su negocio en un nicho en específico. Da clic en <strong>"Saber más"</strong> para conocer más.
                </>
            ),
            imageSrc: GirlWithScreensImage,
            imageAlt: 'Ilustración de Promocionar Negocio',
            reverse: true,
            buttons: [
                { label: 'Saber más', variant: 'primary', href: '#' }
            ]
        }
    ];

    return (
        <section className="flex flex-col w-full max-w-6xl mx-auto py-12 px-6 font-[Nunito]">
            {features.map((feature, index) => (
                <React.Fragment key={feature.id}>
                    <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${feature.reverse ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Image Container */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img 
                                src={feature.imageSrc} 
                                alt={feature.imageAlt} 
                                className="max-w-md w-full h-auto object-contain"
                            />
                        </div>
                        
                        {/* Text and Buttons Container */}
                        <div className="w-full md:w-1/2 flex flex-col gap-4 text-left">
                            <h2 className="text-3xl font-semibold text-gray-900">
                                {feature.title}
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {feature.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mt-2">
                                {feature.buttons.map((btn, btnIdx) => (
                                    <a
                                        key={btnIdx}
                                        href={btn.href}
                                        onClick={btn.onClick}
                                        className={`px-6 py-2.5 rounded shadow-sm font-medium transition-colors ${
                                            btn.variant === 'primary' 
                                            ? 'bg-[#ed7c42] hover:bg-[#d96a32] text-white' 
                                            : 'bg-white border border-[#ed7c42] text-[#ed7c42] hover:bg-orange-50'
                                        }`}
                                    >
                                        {btn.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Horizontal Separator */}
                    {index !== features.length - 1 && (
                        <div className="w-full my-16 border-b border-gray-100"></div>
                    )}
                </React.Fragment>
            ))}
        </section>
    );
}

export default FeatureBlock;