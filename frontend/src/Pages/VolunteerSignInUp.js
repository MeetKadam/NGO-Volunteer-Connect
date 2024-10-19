import { useState } from "react";
import axios from "axios";
import registrationImage from "../components/Images/Login.png";
import "../Styles/NGOSignInUp.css";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from '../store/auth'; // Import the auth store
import { toast } from "react-toastify";

const VolunteerSignInUp = () => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth(); // Destructure storeTokenInLS

    const [isRegister, setIsRegister] = useState(false);
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isRegister) {
                if (user.password !== user.confirmPassword) {
                    setError("Passwords do not match");
                    return;
                }

                const { data } = await axios.post("http://localhost:5000/api/auth/register", {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                });

                toast.success("Registration successful!");
                setIsRegister(false); // Switch to login after successful registration
            } else {
                const { data } = await axios.post("http://localhost:5000/api/auth/login", {
                    email: user.email,
                    password: user.password,
                });

                toast.success("Login successful!");
                storeTokenInLS(data.token); // Use storeTokenInLS to save the token
                navigate('/'); // Navigate after successful login
            }
        } catch (error) {
            console.error("Error:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-page">
            <main>
                <div className="section-Login">
                    <div className="login-img">
                        <img src={registrationImage} alt="Login" />
                    </div>

                    <div className="login-form">
                        <h1 className="main-heading">{isRegister ? "Register Form" : "Login Form"}</h1>

                        <form onSubmit={handleSubmit}>
                            {isRegister && (
                                <>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Enter your username"
                                            id="username"
                                            autoComplete="off"
                                            value={user.username}
                                            onChange={handleInput}
                                            required={isRegister}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            id="phone"
                                            autoComplete="off"
                                            value={user.phone}
                                            onChange={handleInput}
                                            required={isRegister}
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    id="email"
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    id="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            {isRegister && (
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        id="confirmPassword"
                                        autoComplete="off"
                                        value={user.confirmPassword}
                                        onChange={handleInput}
                                        required={isRegister}
                                    />
                                </div>
                            )}

                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? "Processing..." : isRegister ? "Register Now" : "Login Now"}
                            </button>
                        </form>

                        {error && <p className="error-message">{error}</p>}

                        <p>
                            {isRegister ? "Already have an account? " : "Don't have an account? "}
                            <span onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer', color: '#41B2A5' }}>
                                {isRegister ? "Login" : "Register Now"}
                            </span>
                        </p>
                    </div>
                </div>
            </main>
        </section>
    );
}

export default VolunteerSignInUp;
