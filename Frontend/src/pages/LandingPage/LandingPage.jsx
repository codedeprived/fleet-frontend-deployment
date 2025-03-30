import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/public/123.png')` }}
    >
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Frosted Glass Content */}
      <div className="relative z-10 text-center text-white bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white border-opacity-30 font-roboto">
        <h1 className="text-4xl font-bold mb-4">Perfect Fleet Management System</h1>
        <p className="text-xl mb-8">Efficiently manage your fleet with ease.</p>

        {/* Buttons */}
        <div className="space-x-4">
          <button
            onClick={() => navigate("/registration")}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2"
          >
            Login
          </button>
          <div className="flex mt-8 justify-center gap-4">
            <div>
              <p>Need Help?</p>
              <button
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2"
              >
                Contact Us
              </button>
            </div>
            <div>
              <p>Login as Admin?</p>
              <a
                href="http://localhost:5174/login"
                target="_blank"
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2 inline-block"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
