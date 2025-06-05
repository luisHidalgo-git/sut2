export default function UserRecommendations({ showStudentsOnly = false }) {
    // This would typically fetch data from your API
    const mockUsers = [
        {
            id: 1,
            name: "Alice Johnson",
            role: "Student",
            field: "Computer Science",
        },
        { id: 2, name: "Bob Smith", role: "Student", field: "Engineering" },
        { id: 3, name: "Carol White", role: "Student", field: "Business" },
    ];

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    {showStudentsOnly
                        ? "Available Students"
                        : "People You May Know"}
                </h2>
                <div className="space-y-4">
                    {mockUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                    alt={user.name}
                                    className="h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium">{user.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        {user.field}
                                    </p>
                                </div>
                            </div>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-500">
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
