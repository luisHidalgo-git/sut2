import { useState, useEffect } from "react";
import UserRecommendations from "./UserRecommendations";
import CompanyContacts from "./CompanyContacts";
import PostFeed from "./PostFeed";
import CreatePost from "./CreatePost";

export default function Dashboard({ username, userType }) {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call with timeout
        const timer = setTimeout(() => {
            // Mock posts data
            setPosts([
                {
                    id: 1,
                    author: "Alice Johnson",
                    authorType: "student",
                    content: "¡Acabo de completar mi primera solicitud de prácticas! Emocionada por las oportunidades que se avecinan. Espero ganar experiencia del mundo real en desarrollo de software.",
                    timestamp: "hace 2 horas",
                    likes: 12,
                    comments: 3
                },
                {
                    id: 2,
                    author: "Tech Corp",
                    authorType: "company",
                    content: "Estamos buscando estudiantes talentosos para unirse a nuestro programa de verano. Gran oportunidad para trabajar con tecnologías de vanguardia y mentores experimentados. ¡Aplica ahora!",
                    timestamp: "hace 5 horas",
                    likes: 25,
                    comments: 8
                },
                {
                    id: 3,
                    author: "María García",
                    authorType: "student",
                    content: "¡Asistiendo a la feria de carreras hoy! Emocionada de conocer empleadores potenciales y aprender sobre oportunidades de prácticas en mi campo.",
                    timestamp: "hace 1 día",
                    likes: 8,
                    comments: 2
                }
            ]);

            // Mock users data
            setUsers([
                { id: 1, name: "Alice Johnson", field: "Ciencias de la Computación", semester: 6 },
                { id: 2, name: "Bob Smith", field: "Ingeniería Mecánica", semester: 4 },
                { id: 3, name: "Carol White", field: "Administración de Empresas", semester: 8 },
                { id: 4, name: "David Chen", field: "Ingeniería Eléctrica", semester: 2 },
                { id: 5, name: "Emma Wilson", field: "Marketing", semester: 6 }
            ]);

            // Mock companies data
            setCompanies([
                { id: 1, name: "Tech Corp", industry: "Tecnología", size: "Grande" },
                { id: 2, name: "Design Studio", industry: "Diseño y Creatividad", size: "Pequeña" },
                { id: 3, name: "Finance Plus", industry: "Servicios Financieros", size: "Mediana" },
                { id: 4, name: "Green Energy Co", industry: "Energía Renovable", size: "Mediana" }
            ]);

            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
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
                                        <span className="font-semibold text-gray-900">127</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Conexiones</span>
                                        <span className="font-semibold text-gray-900">45</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <CreatePost onNewPost={handleNewPost} username={username} userType={userType} />
                        <PostFeed posts={posts} />
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