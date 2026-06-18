import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-indigo-500">404</h1>

                <h2 className="mt-4 text-3xl font-bold text-white">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-400 max-w-md mx-auto">
                    The page you are looking for might have been removed, renamed, or is
                    temporarily unavailable.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        Go Back
                    </button>
                </div>

                <div className="mt-10">
                    <i className="ri-ghost-line text-8xl text-gray-600"></i>
                </div>
            </div>
        </div>
    );
};

export default NotFound;