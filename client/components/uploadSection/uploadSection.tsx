export const UploadSection = () => {
    return (
    <div className="max-w-2xl mx-auto bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center">
        <div className="mb-4 flex justify-center text-purple-500">
            <div className="p-4 bg-purple-500/10 rounded-full">
                {/* Use o ícone de upload aqui */}
            </div>
        </div>
        <h2 className="text-xl font-bold text-white">Subir novo vídeo</h2>
        <p className="text-zinc-500 mt-2">Arraste e solte o arquivo MP4 aqui</p>
        <button className="mt-6 px-6 py-2 bg-linear-to-r from-pink-500 to-purple-600 rounded-full font-bold">Selecionar Arquivo</button>
    </div>
    )
}