import { useState, useEffect } from "react";
import UserRecommendations from "./UserRecommendations";
import CompanyContacts from "./CompanyContacts";

export default function Dashboard({ username, userType }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`}
                            alt={username}
                            className="h-16 w-16 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {username}
                            </h2>
                            <p className="text-gray-600 capitalize">
                                {userType}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {userType === "student" ? (
                        <>
                            <UserRecommendations />
                            <CompanyContacts />
                        </>
                    ) : (
                        <UserRecommendations showStudentsOnly={true} />
                    )}
                </div>
            </div>
        </div>
    );
}
