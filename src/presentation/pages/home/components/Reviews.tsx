import { ReviewCardProps } from "@presentation/pages/home/components/types";
import HeroAlternativeImage from "@presentation/assets/hero-alternative.webp";
import JaquelineImage from "@presentation/assets/jaqueline-garcia.webp";
import RebecaImage from "@presentation/assets/rebeca-rodriguez.webp";

function Reviews() {
  const REVIEWS_DATA: ReviewCardProps[] = [
    {
      name: "Jaqueline Garcia",
      review: "He potenciado las ventas de mi negocio de gorras gracias a Fraudebot",
      avatarUrl: JaquelineImage
    },
    {
      name: "Rebeca Rodriguez",
      review: "Fraudebot me ha servido para evitar ser estafada, es mi mano derecha para comprar en línea",
      avatarUrl: RebecaImage
    },
  ];

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(${HeroAlternativeImage})`}}>
      <h2 className="text-white text-3xl sm:text-4xl font-bold text-center mb-10 font-[Nunito]">
        Mira que dice la sociedad sobre Fraudebot
      </h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
        {REVIEWS_DATA.map((data, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-100 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                {data.avatarUrl ? (
                  <img
                    src={data.avatarUrl}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300"></div>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black font-[Nunito]">
                {data.name}
              </h3>
            </div>
            <p className="text-xl sm:text-2xl text-black leading-snug font-[Nunito]">
              "{data.review}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
