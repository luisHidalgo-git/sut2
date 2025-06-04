export default function WelcomeMessage({ username, userType }) {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome, {username}!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {userType === "student"
                ? "Start exploring internship opportunities that match your career goals."
                : "Start posting internship opportunities and find talented students."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}