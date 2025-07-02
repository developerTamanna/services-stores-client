import { use, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';

const Register = () => {
  useEffect(() => {
    document.title = 'Register';
  }, []);

  const { createUser, signInWithGoogle, updateUserProfile } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { name, email, photo, password } = Object.fromEntries(
      formData.entries()
    );

    if (password.length < 6) {
      return Swal.fire(
        'Password too short',
        'At least 6 characters needed',
        'error'
      );
    }
    if (!/[A-Z]/.test(password)) {
      return Swal.fire(
        'Uppercase required',
        'Include at least one capital letter',
        'error'
      );
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire(
        'Lowercase required',
        'Include at least one small letter',
        'error'
      );
    }

    createUser(email, password)
      .then((result) => {
        updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          const userProfile = {
            name,
            email,
            photo,
            creationTime: result.user?.metadata?.creationTime,
            lastSignInTime: result.user?.metadata?.lastSignInTime,
          };

          fetch('https://services-code-server.vercel.app/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userProfile),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Account created successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            });
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error', error.message, 'error');
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userProfile = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          creationTime: user.metadata?.creationTime,
          lastSignInTime: user.metadata?.lastSignInTime,
        };

        fetch('https://services-code-server.vercel.app/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Google Login Successful',
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(from, { replace: true });
            }
          });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-black bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 dark:bg-gray-900 bg-white rounded-xl shadow-xl dark:text-white text-gray-900">
        <h2 className="text-3xl font-bold text-center">Register</h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-2 rounded-md dark:bg-gray-800 bg-gray-100 border border-gray-300 dark:border-gray-600 dark:text-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="w-full px-4 py-2 rounded-md dark:bg-gray-800 bg-gray-100 border border-gray-300 dark:border-gray-600 dark:text-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              name="photo"
              type="text"
              placeholder="Your photo URL"
              className="w-full px-4 py-2 rounded-md dark:bg-gray-800 bg-gray-100 border border-gray-300 dark:border-gray-600 dark:text-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              required
              className="w-full px-4 py-2 rounded-md dark:bg-gray-800 bg-gray-100 border border-gray-300 dark:border-gray-600 dark:text-white text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Register
          </button>
        </form>

        <div className="text-center text-gray-400 dark:text-gray-500">Or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
