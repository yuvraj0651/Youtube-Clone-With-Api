import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../API/Auth/AuthThunk";

const AuthPage = () => {
    const [tab, setTab] = useState("login");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [loginErrors, setLoginErrors] = useState({});
    const [loginPassword, setLoginPassword] = useState(false);
    const [registerData, setRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
        ConfirmPass: "",
    });
    const [registerErrors, setRegisterErrors] = useState({});
    const [registerPassword, setRegisterPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleLoginPassword = () => {
        setLoginPassword((prev) => !prev);
    };
    const toggleRegisterPassword = () => {
        setRegisterPassword((prev) => !prev);
    };

    const toggleConfirmPass = () => {
        setShowConfirmPass((prev) => !prev);
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const validateLogin = () => {
        const loginErrors = {};

        // Email validation
        if (!loginData.email.trim()) {
            loginErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            loginErrors.email = "Invalid email format";
        }

        // Password validation
        if (!loginData.password.trim()) {
            loginErrors.password = "Password is required";
        } else if (loginData.password.trim().length < 6) {
            loginErrors.password = "Password must be at least 6 characters";
        }

        return loginErrors;
    };

    const validateRegister = () => {
        const registerErrors = {};

        // Full Name
        if (!registerData.fullName.trim()) {
            registerErrors.fullName = "Full name is required";
        } else if (registerData.fullName.trim().length < 3) {
            registerErrors.fullName = "Full name must be at least 3 characters";
        }

        // Email
        if (!registerData.email.trim()) {
            registerErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            registerErrors.email = "Invalid email format";
        }

        // Password
        if (!registerData.password.trim()) {
            registerErrors.password = "Password is required";
        } else if (registerData.password.trim().length < 6) {
            registerErrors.password = "Password must be at least 6 characters";
        }

        // Confirm Password
        if (!registerData.ConfirmPass.trim()) {
            registerErrors.ConfirmPass = "Confirm password is required";
        } else if (registerData.ConfirmPass.trim() !== registerData.password.trim()) {
            registerErrors.ConfirmPass = "Passwords do not match";
        }

        return registerErrors;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        let loginValidationErr = validateLogin();
        setLoginErrors(loginValidationErr);

        if (Object.keys(loginValidationErr).length === 0) {

            dispatch(loginUser(loginData))
                .unwrap()
                .then(() => {
                    alert("User Logged In Successfully");
                    setLoginData({
                        email: "",
                        password: "",
                    });

                    setLoginErrors({});
                    navigate("/home");
                })
                .catch((error) => {
                    alert(error);
                })
        };
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        let registerValidationErr = validateRegister();
        setRegisterErrors(registerValidationErr);

        if (Object.keys(registerValidationErr).length === 0) {

            dispatch(registerUser(registerData))
                .unwrap()
                .then(() => {
                    alert("User Registered Successfully");
                    setRegisterData({
                        fullName: "",
                        email: "",
                        password: "",
                        ConfirmPass: "",
                    });

                    setRegisterErrors({});
                    setTab("login");
                })
                .catch((error) => {
                    alert(error);
                })
        };
    };

    return (
        <div className="min-h-screen pt-20 pb-8 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-black dark:to-gray-900 px-4">

            {/* MAIN CARD */}
            <div className="w-full h-[90vh] overflow-y-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border border-white/20 flex">

                {/* LEFT SIDE (CREATIVE SECTION) */}
                <div className="hidden md:flex flex-col justify-between w-1/2 p-10 bg-gradient-to-br from-red-600 to-pink-500 text-white relative">

                    {/* Glow Effect */}
                    <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10"></div>

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-4">YouTube</h1>
                        <p className="text-lg opacity-90">
                            Discover. Watch. Create.
                            Your world of videos starts here.
                        </p>
                    </div>

                    <div className="relative z-10 text-sm opacity-80">
                        🚀 Build your audience
                        <br />
                        🎥 Upload your content
                    </div>
                </div>

                {/* RIGHT SIDE (FORM SECTION) */}
                <div className="w-full md:w-1/2 p-8">

                    {/* Logo */}
                    <h2 className="text-3xl font-bold text-center mb-6">
                        YouTube
                    </h2>

                    {/* Tabs */}
                    <div className="flex mb-6 bg-gray-200 dark:bg-gray-800 rounded-full p-1">
                        <button
                            onClick={() => setTab("login")}
                            className={`flex-1 py-2 rounded-full transition ${tab === "login"
                                ? "bg-white dark:bg-black shadow font-semibold"
                                : "text-gray-500"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setTab("register")}
                            className={`flex-1 py-2 rounded-full transition ${tab === "register"
                                ? "bg-white dark:bg-black shadow font-semibold"
                                : "text-gray-500"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={tab === "login" ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">

                        {tab === "register" && (
                            <input
                                type="text"
                                name="fullName"
                                value={registerData.fullName}
                                onChange={handleRegisterChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none transition"
                            />
                        )}
                        {
                            registerErrors.fullName && (
                                <p className="text-red-500 text-sm">{registerErrors.fullName}</p>
                            )
                        }

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={tab === "login" ? loginData.email : registerData.email}
                            onChange={tab === "login" ? handleLoginChange : handleRegisterChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none transition"
                        />
                        {
                            tab === "login"
                                ? loginErrors.email && (
                                    <p className="text-red-500 text-sm">{loginErrors.email}</p>
                                )
                                : registerErrors.email && (
                                    <p className="text-red-500 text-sm">{registerErrors.email}</p>
                                )
                        }
                        <div className="relative">
                            <input
                                type={
                                    tab === "login"
                                        ? loginPassword ? "text" : "password"
                                        : registerPassword ? "text" : "password"
                                }
                                name="password"
                                placeholder="Password"
                                value={tab === "login" ? loginData.password : registerData.password}
                                onChange={tab === "login" ? handleLoginChange : handleRegisterChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none transition"
                            />
                            <span
                                onClick={tab === "login" ? toggleLoginPassword : toggleRegisterPassword}
                                className="absolute top-3 right-3 capitalize tracking-wide font-medium cursor-pointer text-red-600 text-[0.9rem]">
                                {
                                    tab === "login"
                                        ? loginPassword ? "Hide" : "Show"
                                        : registerPassword ? "Hide" : "Show"
                                }
                            </span>
                            {
                                tab === "login"
                                    ? loginErrors.password && (
                                        <p className="text-red-500 text-sm">{loginErrors.password}</p>
                                    )
                                    : registerErrors.password && (
                                        <p className="text-red-500 text-sm">{registerErrors.password}</p>
                                    )
                            }
                        </div>

                        <div className="relative">
                            {tab === "register" && (
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    name="ConfirmPass"
                                    placeholder="Confirm Password"
                                    value={registerData.ConfirmPass}
                                    onChange={handleRegisterChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none transition"
                                />
                            )}
                            <span
                                onClick={toggleConfirmPass}
                                className="absolute top-3 right-3 capitalize tracking-wide font-medium cursor-pointer text-red-600 text-[0.9rem]">
                                {
                                    showConfirmPass ? "Hide" : "Show"
                                }
                            </span>
                            {
                                tab === "register" && (
                                    registerErrors.ConfirmPass && (
                                        <p className="text-red-500 text-sm">{registerErrors.ConfirmPass}</p>
                                    )
                                )
                            }
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
                            {tab === "login" ? "Login" : "Create Account"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-sm text-gray-500">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-3">
                        <button className="flex-1 py-2 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                            Google
                        </button>
                        <button className="flex-1 py-2 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                            GitHub
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm mt-6 text-gray-500">
                        {tab === "login"
                            ? "Don't have an account?"
                            : "Already have an account?"}

                        <span
                            onClick={() =>
                                setTab(tab === "login" ? "register" : "login")
                            }
                            className="text-red-500 ml-1 cursor-pointer font-medium"
                        >
                            {tab === "login" ? "Register" : "Login"}
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default AuthPage;