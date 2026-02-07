'use client'
import { useRef, useState } from 'react'
import { UploadCloud, CheckCircle2, Image as ImageIcon, Type, AlignLeft } from 'lucide-react'
import { videoService } from '@/services/api'

export const UploadSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbUrl: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-3xl mx-auto bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all ${
            selectedFile ? "border-green-500/50 bg-green-500/5" : "border-zinc-700 hover:border-purple-500/50 bg-zinc-800/30"
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} 
            accept="video/*" 
            className="hidden" 
          />
          
          <div className={`p-4 rounded-full mb-4 ${selectedFile ? "bg-green-500/10 text-green-500" : "bg-purple-500/10 text-purple-500"}`}>
            {selectedFile ? <CheckCircle2 className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
          </div>
          
          <p className="text-white font-medium text-center">
            {selectedFile ? selectedFile.name : "Clique para selecionar o vídeo"}
          </p>
          <p className="text-zinc-500 text-xs mt-2 text-center">MP4, WebM ou OGG (Max. 500MB)</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <Type className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input 
              name="title"
              placeholder="Título do vídeo"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            />
          </div>

          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input 
              name="thumbUrl"
              placeholder="URL da Thumbnail (ex: https://...)"
              value={formData.thumbUrl}
              onChange={handleInputChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            />
          </div>

          <div className="relative">
            <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <textarea 
              name="description"
              placeholder="Descrição curta..."
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      <button 
        disabled={!selectedFile || !formData.title}
        className="w-full mt-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={() => {
          console.log("Dados prontos para o back:", { ...formData, file: selectedFile })
          if(!selectedFile){
            alert("Selecione um arquivo.")
          }
          videoService.upload(selectedFile!, formData.title, formData.thumbUrl, formData.description)
        }}
      >
        PUBLICAR VÍDEO
      </button>
    </div>
  )
}