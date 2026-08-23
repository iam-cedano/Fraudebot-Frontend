import React from 'react';
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/common/app-routes";
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
                    Estamos desarrollando una forma segura de seguir reportes y recibir novedades. Esta función todavía no está disponible.
                </>
            ),
            imageSrc: ManWithScreensImage,
            imageAlt: 'Ilustración de Seguimiento de Reportes',
            reverse: false,
            buttons: [
                { label: 'Seguimiento: próximamente', variant: 'primary', disabled: true },
                { label: 'Buscar reportes', variant: 'secondary', href: APP_ROUTES.search },
            ]
        },
        {
            id: 'promociona',
            title: 'Promociona tu negocio con nosotros',
            description: (
                <>
                    Estamos evaluando opciones transparentes para negocios. Aún no aceptamos promociones ni solicitudes comerciales desde el sitio.
                </>
            ),
            imageSrc: GirlWithScreensImage,
            imageAlt: 'Ilustración de Promocionar Negocio',
            reverse: true,
            buttons: [
                { label: 'Promoción: próximamente', variant: 'primary', disabled: true }
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
                                {feature.buttons.map((btn, btnIdx) => {
                                    const className = `rounded px-6 py-2.5 font-medium shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700 ${
                                        btn.disabled
                                            ? 'cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-500'
                                            :
                                            btn.variant === 'primary' 
                                            ? 'bg-[#c95f28] hover:bg-[#a94c1e] text-white' 
                                            : 'bg-white border border-[#c95f28] text-[#9a451d] hover:bg-orange-50'
                                    }`;

                                    return btn.disabled ? (
                                        <button key={btnIdx} type="button" disabled className={className}>
                                            {btn.label}
                                        </button>
                                    ) : (
                                        <Link key={btnIdx} to={btn.href!} className={className}>
                                            {btn.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                    {index !== features.length - 1 && (
                        <div className="w-full  border-b border-gray-100"></div>
                    )}
                </React.Fragment>
            ))}
        </section>
    );
}

export default FeatureBlock;