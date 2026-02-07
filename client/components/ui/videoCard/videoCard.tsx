'use client'

interface VideoCardProps {
    title: string;
    thumbnail: string;
    onClick: () => void;
}

export const VideoCard = ({title, thumbnail, onClick}: VideoCardProps) => {
    return (
        <div 
            onClick={onClick}
            className="group cursor-pointer rounded-lg overflow-hidden bg-zinc-900 hover:scale-105 transition-all"
            >
            <img src={thumbnail} alt={title} className="w-full aspect-video object-cover" />
            <div className="p-3">
                <h3 className="text-white font-medium group-hover:text-red-500">{title}</h3>
            </div>
        </div>
    )
}