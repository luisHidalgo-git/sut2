import { useState } from "react";
import { 
    HeartIcon, 
    ChatBubbleOvalLeftIcon, 
    ShareIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function PostFeed({ posts }) {
    const [likedPosts, setLikedPosts] = useState(new Set());

    const handleLike = (postId) => {
        const newLikedPosts = new Set(likedPosts);
        if (newLikedPosts.has(postId)) {
            newLikedPosts.delete(postId);
        } else {
            newLikedPosts.add(postId);
        }
        setLikedPosts(newLikedPosts);
    };

    if (posts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-500">
                    <ChatBubbleOvalLeftIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                    <p>Be the first to share something with the community!</p>
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
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                                    alt={post.author}
                                    className="h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {post.author}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {post.authorType === "student" ? "Student" : "Company"} • {post.timestamp}
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
                        <p className="text-gray-900 leading-relaxed">
                            {post.content}
                        </p>
                    </div>

                    {/* Post Stats */}
                    <div className="px-6 py-2 border-t border-b border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)} likes</span>
                            <span>{post.comments} comments</span>
                        </div>
                    </div>

                    {/* Post Actions */}
                    <div className="px-6 py-3">
                        <div className="flex items-center justify-around">
                            <button
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                                    likedPosts.has(post.id) ? "text-red-600" : "text-gray-600"
                                }`}
                            >
                                {likedPosts.has(post.id) ? (
                                    <HeartIconSolid className="h-5 w-5" />
                                ) : (
                                    <HeartIcon className="h-5 w-5" />
                                )}
                                <span className="text-sm font-medium">Like</span>
                            </button>
                            
                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">Comment</span>
                            </button>
                            
                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                                <ShareIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}