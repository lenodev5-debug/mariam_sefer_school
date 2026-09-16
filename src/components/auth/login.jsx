import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCab,
    faIdCard,
} from '@fortawesome/free-solid-svg-icons';

import Card from '../ui/spaceCard';
import authService from '../../../lib/auth/authLogin';

import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        setError('');
        setLoading(true);

        try {
            const data = await authService.login(
                email,
                password
            );

            /*
             * Save token and user through AuthContext
             */
            login(
                data.token,
                data.user
            );

            /*
             * Get user role
             */
            const role = data.user.role;

            /*
             * Redirect according to role
             */
            switch (role) {
                case 'Admin':
                    navigate('/user/admin/dashboard');
                    break;

                case 'Teacher':
                    navigate('/user/teacher/dashboard');
                    break;

                case 'Parent':
                    navigate('/user/parent/dashboard');
                    break;

                case 'Student':
                    navigate('/user/student/dashboard');
                    break;

                default:
                    setError(
                        'This account does not have a dashboard.'
                    );
                    break;
            }

        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                setError(
                    error.response.data?.message ||
                    'Login failed.'
                );
            } else {
                setError(
                    'Unable to connect to the server.'
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">

            <div className="absolute inset-0 w-full h-full">
                <Card />
            </div>

            <form
                onSubmit={handleLogin}
                className="relative z-10 flex flex-col gap-2.5 bg-white/95 backdrop-blur-sm p-8 w-[450px] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] font-sans"
            >

                {/* EMAIL */}

                <div className="flex flex-col">
                    <label className="text-[#151717] font-semibold">
                        Email
                    </label>
                </div>

                <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">

                    <i className="fa-regular fa-envelope text-[18px] text-gray-500 mr-2 w-5 text-center"></i>

                    <input
                        placeholder="Enter your Email"
                        className="border-none w-full h-full bg-transparent text-[15px] outline-none placeholder:text-gray-400 placeholder:font-sans"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />

                </div>

                {/* PASSWORD */}

                <div className="flex flex-col">
                    <label className="text-[#151717] font-semibold">
                        Password
                    </label>
                </div>

                <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">

                    <i className="fa-solid fa-lock text-[18px] text-gray-500 mr-2 w-5 text-center"></i>

                    <input
                        placeholder="Enter your Password"
                        className="border-none w-full h-full bg-transparent text-[15px] outline-none placeholder:text-gray-400 placeholder:font-sans"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />

                </div>

                {/* ERROR */}

                {error && (
                    <p className="text-red-500 text-sm mt-1">
                        {error}
                    </p>
                )}

                {/* REMEMBER / FORGOT */}

                <div className="flex flex-row items-center gap-2.5 justify-between">

                    <div className="flex items-center gap-1.5">

                        <input
                            type="checkbox"
                            id="remember"
                            className="m-0 cursor-pointer"
                        />

                        <label
                            htmlFor="remember"
                            className="text-sm text-black font-normal"
                        >
                            Remember me
                        </label>

                    </div>

                    <span className="text-sm text-[#2d79f3] font-medium cursor-pointer">
                        Forgot password?
                    </span>

                </div>

                {/* SIGN IN */}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 mb-2.5 bg-[#151717] hover:bg-[#2d79f3] disabled:opacity-50 text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer transition-colors duration-200"
                >
                    {loading
                        ? 'Signing In...'
                        : 'Sign In'}
                </button>

                {/* CONTACT */}

                <p className="text-center text-black text-sm my-1">

                    Didn't Find Your account?{' '}

                    <span className="text-sm text-[#2d79f3] font-medium cursor-pointer ml-1">
                        Contact
                    </span>

                </p>

                {/* OR */}

                <p className="relative text-center text-gray-500 text-sm my-1 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[30%] before:h-px before:bg-[#e0e0e0] after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[30%] after:h-px after:bg-[#e0e0e0]">
                    Or With
                </p>

                {/* OTHER LOGIN */}

                <div className="flex flex-row items-center gap-2.5 justify-between">

                    <button
                        type="button"
                        className="mt-2.5 w-full h-12.5 rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#ededef] hover:border-[#2d79f3] hover:bg-[#f8faff] bg-white cursor-pointer transition-all duration-200 text-[15px]"
                    >
                        <FontAwesomeIcon icon={faCab} />
                        Google
                    </button>

                    <button
                        type="button"
                        className="mt-2.5 w-full h-12.5 rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#ededef] hover:border-[#2d79f3] hover:bg-[#f8faff] bg-white cursor-pointer transition-all duration-200 text-[15px]"
                    >
                        <FontAwesomeIcon
                            icon={faIdCard}
                            size="2xl"
                        />
                        ID Card
                    </button>

                </div>

            </form>

        </div>
    );
};

export default Login;