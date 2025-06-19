import {
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    ShareIcon,
    EllipsisHorizontalIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";

export default function PostFeed({ posts, onLike }) {
    const [expandedComments, setExpandedComments] = useState({});
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [loadingComments, setLoadingComments] = useState({});

    const token = localStorage.getItem("token");
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const toggleComments = async (postId) => {
        if (expandedComments[postId]) {
            setExpandedComments((prev) => ({ ...prev, [postId]: false }));
        } else {
            setExpandedComments((prev) => ({ ...prev, [postId]: true }));

            // Load comments if not already loaded
            if (!comments[postId]) {
                setLoadingComments((prev) => ({ ...prev, [postId]: true }));
                try {
                    const response = await axios.get(
                        `${
                            import.meta.env.VITE_API_URL
                        }/posts/${postId}/comments/`,
                        axiosConfig
                    );
                    setComments((prev) => ({
                        ...prev,
                        [postId]: response.data,
                    }));
                } catch (error) {
                    console.error("Error loading comments:", error);
                } finally {
                    setLoadingComments((prev) => ({
                        ...prev,
                        [postId]: false,
                    }));
                }
            }
        }
    };

    const handleAddComment = async (postId) => {
        const commentText = newComment[postId]?.trim();
        if (!commentText) return;

        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_URL
                }/posts/${postId}/comments/create/`,
                { content: commentText },
                axiosConfig
            );

            // Add new comment to the list
            setComments((prev) => ({
                ...prev,
                [postId]: [...(prev[postId] || []), response.data],
            }));

            // Clear the input
            setNewComment((prev) => ({ ...prev, [postId]: "" }));
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleKeyPress = (e, postId) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddComment(postId);
        }
    };

    if (posts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-500">
                    <ChatBubbleOvalLeftIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">
                        No hay publicaciones aún
                    </h3>
                    <p>¡Sé el primero en compartir algo con la comunidad!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow">
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author_name}`}
                                    alt={post.author_name}
                                    className="h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {post.author_name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {post.author_type === "student"
                                            ? "Estudiante"
                                            : "Empresa"}{" "}
                                        • {post.time_since_created}
                                    </p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-6 pb-4">
                        {post.content && (
                            <p className="text-gray-900 leading-relaxed whitespace-pre-wrap mb-4">
                                {post.content}
                            </p>
                        )}

                        {/* Post Image */}
                        {post.image_url && (
                            <div className="mt-4">
                                <img
                                    src={post.image_url}
                                    alt="Post image"
                                    className="w-full max-h-96 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    {/* Post Stats */}
                    <div className="px-6 py-2 border-t border-b border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{post.likes_count} me gusta</span>
                            <span>{post.comments_count} comentarios</span>
                        </div>
                    </div>

                    {/* Post Actions */}
                    <div className="px-6 py-3">
                        <div className="flex items-center justify-around">
                            <button
                                onClick={() => onLike(post.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                                    post.is_liked
                                        ? "text-red-600"
                                        : "text-gray-600"
                                }`}
                            >
                                {post.is_liked ? (
                                    <HeartIconSolid className="h-5 w-5" />
                                ) : (
                                    <HeartIcon className="h-5 w-5" />
                                )}
                                <span className="text-sm font-medium">
                                    Me gusta
                                </span>
                            </button>

                            <button
                                onClick={() => toggleComments(post.id)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                            >
                                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    Comentar
                                </span>
                            </button>

                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                                <ShareIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    Compartir
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    {expandedComments[post.id] && (
                        <div className="px-6 pb-6 border-t border-gray-100">
                            {/* Add Comment */}
                            <div className="flex items-start space-x-3 mt-4">
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${localStorage.getItem(
                                        "username"
                                    )}`}
                                    alt="You"
                                    className="h-8 w-8 rounded-full"
                                />
                                <div className="flex-1 flex items-end space-x-2">
                                    <textarea
                                        value={newComment[post.id] || ""}
                                        onChange={(e) =>
                                            setNewComment((prev) => ({
                                                ...prev,
                                                [post.id]: e.target.value,
                                            }))
                                        }
                                        onKeyPress={(e) =>
                                            handleKeyPress(e, post.id)
                                        }
                                        placeholder="Escribe un comentario..."
                                        className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        rows="2"
                                    />
                                    <button
                                        onClick={() =>
                                            handleAddComment(post.id)
                                        }
                                        disabled={!newComment[post.id]?.trim()}
                                        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <PaperAirplaneIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Comments List */}
                            <div className="mt-4 space-y-3">
                                {loadingComments[post.id] ? (
                                    <div className="text-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
                                    </div>
                                ) : (
                                    comments[post.id]?.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="flex items-start space-x-3"
                                        >
                                            <img
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author_name}`}
                                                alt={comment.author_name}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="bg-gray-100 rounded-lg p-3">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <span className="font-medium text-sm text-gray-900">
                                                            {
                                                                comment.author_name
                                                            }
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {
                                                                comment.time_since_created
                                                            }
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
