import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

export default function CompanyContacts({ companies = [] }) {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Empresas que Podrían Interesarte
                </h2>
                
                {companies.length === 0 ? (
                    <div className="text-center py-8">
                        <BuildingOfficeIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">
                            No hay empresas registradas aún. ¡Vuelve más tarde para ver oportunidades de prácticas!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {companies.slice(0, 3).map((company) => (
                            <div
                                key={company.id}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${company.name}`}
                                        alt={company.name}
                                        className="h-12 w-12 rounded-lg"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {company.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {company.industry} • {company.size}
                                        </p>
                                    </div>
                                </div>
                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors">
                                    Seguir
                                </button>
                            </div>
                        ))}
                        
                        {companies.length > 3 && (
                            <button className="w-full text-center py-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Mostrar más ({companies.length - 3} más)
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}