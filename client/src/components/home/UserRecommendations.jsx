import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function UserRecommendations({ users = [], showStudentsOnly = false }) {
    const title = showStudentsOnly ? "Available Students" : "People You May Know";
    const emptyMessage = showStudentsOnly 
        ? "No students have registered yet. Check back later!"
        : "No other users have joined yet. Invite your friends!";

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                
                {users.length === 0 ? (
                    <div className="text-center py-8">
                        <UserPlusIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">{emptyMessage}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {users.slice(0, 3).map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                        alt={user.name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {user.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {user.field}
                                            {user.semester && ` • Semester ${user.semester}`}
                                        </p>
                                    </div>
                                </div>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition-colors">
                                    Connect
                                </button>
                            </div>
                        ))}
                        
                        {users.length > 3 && (
                            <button className="w-full text-center py-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Show more ({users.length - 3} more)
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}