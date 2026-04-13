import { ReviewCardProps } from "@presentation/pages/home/components/types";

function Reviews() {
  const REVIEWS_DATA: ReviewCardProps[] = [
    {
      name: "Jaqueline Garcia",
      review: "Fraudebot me ha servido para evitar ser estafada",
    },
    {
      name: "Jaqueline Garcia",
      review: "Fraudebot me ha servido para evitar ser estafada",
    },
  ];

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center justify-center bg-red-500">
      <h2 className="text-white text-3xl sm:text-4xl font-bold text-center mb-10">
        Mira que dice la sociedad sobre Fraudebot
      </h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
        {REVIEWS_DATA.map((data, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-100 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                {data.avatarUrl ? (
                  <img
                    src={data.avatarUrl}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300"></div> /* Placeholder for image */
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black">
                {data.name}
              </h3>
            </div>
            <p className="text-xl sm:text-2xl text-black leading-snug">
              "{data.review}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
