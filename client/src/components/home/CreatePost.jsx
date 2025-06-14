import { useState } from "react";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function CreatePost({ onNewPost, username, userType }) {
    const [postContent, setPostContent] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (postContent.trim() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await onNewPost({ content: postContent });
                setPostContent("");
                setIsExpanded(false);
            } catch (error) {
                console.error("Error creating post:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`}
                    alt={username}
                    className="h-12 w-12 rounded-full"
                />
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                >
                    {userType === "student" 
                        ? "Comparte tu experiencia de prácticas..." 
                        : "Comparte oportunidades o noticias de la empresa..."}
                </button>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder={userType === "student" 
                            ? "¿Qué tienes en mente sobre tu carrera profesional?" 
                            : "Comparte oportunidades de trabajo o noticias de la empresa..."}
                        className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows="4"
                        autoFocus
                        disabled={isSubmitting}
                    />
                    
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                                disabled={isSubmitting}
                            >
                                <PhotoIcon className="h-5 w-5" />
                                <span className="text-sm">Foto</span>
                            </button>
                        </div>
                        
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsExpanded(false);
                                    setPostContent("");
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={!postContent.trim() || isSubmitting}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Publicando..." : "Publicar"}
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {!isExpanded && (
                <div className="flex justify-between border-t pt-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-50">
                        <PencilSquareIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Escribir artículo</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-50">
                        <PhotoIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Agregar foto</span>
                    </button>
                </div>
            )}
        </div>
    );
}