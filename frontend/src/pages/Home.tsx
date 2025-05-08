// pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Shield,
  Code2,
  Brackets,
  Database,
  ChevronRight,
  Rocket,
} from "lucide-react";

const Home: React.FC = () => {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar - Responsive and modern design */}

      {/* Hero Section - Modernized with gradient background and animated elements */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-500">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24 md:py-32">
            <div className="text-center relative z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                <span className="animate-pulse mr-1">•</span>Lorem ipsum
              </span>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl mb-6">
                <span className="block">Lorem, ipsum</span>
                <span className="block text-blue-200 mt-1">
                  Lorem ipsum dolor sit amet
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                labore, porro repudiandae dolorum quas veritatis sapiente
                maxime, unde saepe ex odit esse. Voluptatem, eos!
              </p>
              <div className="mt-10 sm:flex sm:justify-center">
                {auth.isAuthenticated ? (
                  <div className="rounded-md shadow">
                    <Link
                      to={auth.user?.role === "admin" ? "/admin" : "/dashboard"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition duration-300 md:py-4 md:text-lg md:px-10"
                    >
                      Go to Dashboard
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md shadow">
                      <Link
                        to="/signup"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition duration-300 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                        <Rocket className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition duration-300 md:py-4 md:text-lg md:px-10"
                      >
                        Log In
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div
          className="absolute bottom-0 left-0 w-full h-20 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}
        ></div>
      </div>

      {/* Features Section - Redesigned with cards */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full uppercase">
              Features
            </span>
            <h2 className="mt-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              doloremque!
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="p-2 bg-indigo-100 rounded-lg inline-block mb-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lorem ipsum dolor sit.
                </h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  porro eius eum, autem error molestias debitis in laudantium
                  doloremque.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="p-2 bg-indigo-100 rounded-lg inline-block mb-4">
                  <Code2 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laudantium, consequuntur?
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="p-2 bg-indigo-100 rounded-lg inline-block mb-4">
                  <Brackets className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, molestiae.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="p-2 bg-indigo-100 rounded-lg inline-block mb-4">
                  <Database className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore, saepe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section - New section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Trusted by developers worldwide
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {/* Add 5-6 gray logos here */}
            <div className="h-12 w-32 bg-gray-300 rounded-md"></div>
            <div className="h-12 w-32 bg-gray-300 rounded-md"></div>
            <div className="h-12 w-28 bg-gray-300 rounded-md"></div>
            <div className="h-12 w-36 bg-gray-300 rounded-md"></div>
            <div className="h-12 w-32 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
