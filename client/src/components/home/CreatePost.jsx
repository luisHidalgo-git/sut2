import { useState, useRef } from "react";
import { PencilSquareIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function CreatePost({ onNewPost, username, userType }) {
    const [postContent, setPostContent] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((postContent.trim() || selectedImage) && !isSubmitting) {
            setIsSubmitting(true);
            try {
                const formData = new FormData();
                formData.append('content', postContent);
                if (selectedImage) {
                    formData.append('image', selectedImage);
                }
                
                await onNewPost(formData);
                setPostContent("");
                setSelectedImage(null);
                setImagePreview(null);
                setIsExpanded(false);
            } catch (error) {
                console.error("Error creating post:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert("La imagen debe ser menor a 5MB");
                return;
            }
            
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCancel = () => {
        setIsExpanded(false);
        setPostContent("");
        removeImage();
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

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-full h-64 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                                disabled={isSubmitting}
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                                disabled={isSubmitting}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
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
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={(!postContent.trim() && !selectedImage) || isSubmitting}
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
                    <button 
                        onClick={() => setIsExpanded(true)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                        <PencilSquareIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Escribir artículo</span>
                    </button>
                    <button 
                        onClick={() => {
                            setIsExpanded(true);
                            setTimeout(() => fileInputRef.current?.click(), 100);
                        }}
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                        <PhotoIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Agregar foto</span>
                    </button>
                </div>
            )}
        </div>
    );
}