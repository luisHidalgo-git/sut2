export default function CompanyContacts() {
    // This would typically fetch data from your API
    const mockCompanies = [
        { id: 1, name: "Tech Corp", industry: "Technology", size: "Large" },
        { id: 2, name: "Design Studio", industry: "Design", size: "Small" },
        { id: 3, name: "Finance Plus", industry: "Finance", size: "Medium" },
    ];

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Companies You Might Like
                </h2>
                <div className="space-y-4">
                    {mockCompanies.map((company) => (
                        <div
                            key={company.id}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${company.name}`}
                                    alt={company.name}
                                    className="h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium">
                                        {company.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {company.industry} · {company.size}
                                    </p>
                                </div>
                            </div>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-500">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
