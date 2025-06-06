export default function LandingMessage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Your Perfect Internship Opportunity
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with top companies and kickstart your professional career.
              PracticePro helps students find their ideal internship placements
              while enabling companies to discover fresh talent.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/register/student"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register as Student
              </a>
              <a
                href="/register/company"
                className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
              >
                Register as Company
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}