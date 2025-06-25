import { use, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';

const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const { signInWithGoogle, loginUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const from = location.state?.from?.pathname || '/';
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Google Login Successful!',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Google Login Failed',
          text: err.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Login
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="w-1/5 border-t border-gray-600"></span>
            <span>OR</span>
            <span className="w-1/5 border-t border-gray-600"></span>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 border border-gray-600 text-white hover:bg-gray-800 rounded-md transition"
          >
            Continue with Google
          </button>

          {/* Go to Register */}
          <p className="text-sm text-center text-gray-400">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
