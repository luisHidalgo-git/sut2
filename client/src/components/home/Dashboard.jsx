import { useState, useEffect } from "react";
import axios from "axios";
import UserRecommendations from "./UserRecommendations";
import CompanyContacts from "./CompanyContacts";
import PostFeed from "./PostFeed";
import CreatePost from "./CreatePost";

export default function Dashboard({ username, userType }) {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stats, setStats] = useState({
        posts_count: 0,
        connections_count: 0,
        profile_views: 127
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch posts
                const postsResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/posts/`,
                    axiosConfig
                );
                setPosts(postsResponse.data);

                // Fetch students
                const studentsResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/students/`,
                    axiosConfig
                );
                setUsers(studentsResponse.data);

                // Fetch companies
                const companiesResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/companies/`,
                    axiosConfig
                );
                setCompanies(companiesResponse.data);

                // Fetch dashboard stats
                const statsResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/dashboard/stats/`,
                    axiosConfig
                );
                setStats(statsResponse.data);

                setError(null);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError("Error al cargar los datos del dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNewPost = async (postData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/posts/create/`,
                { content: postData.content },
                axiosConfig
            );
            
            // Add the new post to the beginning of the posts array
            setPosts([response.data, ...posts]);
            
            // Update stats
            setStats(prev => ({
                ...prev,
                posts_count: prev.posts_count + 1
            }));
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Error al crear la publicación");
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/posts/${postId}/like/`,
                {},
                axiosConfig
            );
            
            // Update the post in the posts array
            setPosts(posts.map(post => 
                post.id === postId 
                    ? { 
                        ...post, 
                        is_liked: response.data.liked,
                        likes_count: response.data.likes_count 
                    }
                    : post
            ));
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - Profile */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                            <div className="text-center">
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`}
                                    alt={username}
                                    className="h-20 w-20 rounded-full mx-auto mb-4 border-4 border-gray-100"
                                />
                                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                                    {username}
                                </h2>
                                <p className="text-gray-600 capitalize mb-4 text-sm">
                                    {userType === "student" ? "Estudiante" : "Empresa"}
                                </p>
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Vistas del perfil</span>
                                        <span className="font-semibold text-gray-900">{stats.profile_views}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Publicaciones</span>
                                        <span className="font-semibold text-gray-900">{stats.posts_count}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Conexiones</span>
                                        <span className="font-semibold text-gray-900">{stats.connections_count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <CreatePost onNewPost={handleNewPost} username={username} userType={userType} />
                        <PostFeed posts={posts} onLike={handleLike} />
                    </div>

                    {/* Right Sidebar - Recommendations */}
                    <div className="lg:col-span-1 space-y-6">
                        {userType === "student" ? (
                            <>
                                <UserRecommendations users={users} />
                                <CompanyContacts companies={companies} />
                            </>
                        ) : (
                            <UserRecommendations users={users} showStudentsOnly={true} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}