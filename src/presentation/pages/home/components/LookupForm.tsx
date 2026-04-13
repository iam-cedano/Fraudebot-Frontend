function LookupForm() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl px-8 py-7 bg-white rounded-xl shadow-sm relative top-25">
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
                <span className="font-bold">Fraudebot</span> te protege de los estafadores
            </h1>
            <p className="text-2xl text-gray-800 mb-8">
                Buscar por <span className="font-bold">tarjeta, cuenta, clabe, nombre, telefono</span> o <span className="font-bold">url</span>
            </p>
            <div className="flex w-full border border-gray-300 rounded-md overflow-hidden bg-white">
                <input
                    type="text"
                    placeholder="número cuenta, tarjeta, telefono, url"
                    className="grow px-4 py-4 outline-none text-gray-400 placeholder-gray-400 text-lg"
                />
                <button className="px-8 py-4 bg-white border-l border-gray-300 hover:bg-gray-50 transition-colors text-gray-900 text-lg">
                    Buscar
                </button>
            </div>
        </div>
    );
}
export default LookupForm;
