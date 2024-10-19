import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import registrationImage from "../components/Images/Login.png";
import "../Styles/NGOSignInUp.css"; // Link the CSS

const VolunteerSignInUp = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isRegister, setIsRegister] = useState(false); // State to manage form type
    const [user, setUser] = useState({
        username: "",  // Updated field for username
        email: "",
        phone: "",  // Only required during registration
        city: "",   // Only required during registration
        darpan: "", // Only required during registration
        password: "",
        confirmPassword: "" // Field for registration
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
                // Ensure passwords match during registration
                if (user.password !== user.confirmPassword) {
                    setError("Passwords do not match");
                    setLoading(false);
                    return;
                }

                // Registration API Call
                const { data } = await axios.post("http://localhost:5000/api/auth/register", {
                    username: user.username, // Use username instead of name
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    darpan: user.darpan,
                    password: user.password,
                });

                console.log("Registration successful:", data);
                alert("Registration successful!");

                // Navigate to login page after registration
                navigate('/ngo/NGOLogin'); // Change this to your login path
            } else {
                // Login API Call
                const { data } = await axios.post("http://localhost:5000/api/auth/login", {
                    email: user.email,
                    password: user.password,
                });

                console.log("Login successful:", data);
                alert("Login successful!");
                // You can store the token if needed
                localStorage.setItem("token", data.token);

                // Navigate to volunteer dashboard after login
                navigate('/dashboard'); // Change this to your volunteer dashboard path
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
                                            name="username" // Updated field name for username
                                            placeholder="Enter your username"
                                            id="username"
                                            autoComplete="off"
                                            value={user.username} // Updated value for username
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
                                    <div>
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Enter your city"
                                            id="city"
                                            autoComplete="off"
                                            value={user.city}
                                            onChange={handleInput}
                                            required={isRegister}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="darpan">Darpan ID</label>
                                        <input
                                            type="text"
                                            name="darpan"
                                            placeholder="Enter your Darpan ID"
                                            id="darpan"
                                            autoComplete="off"
                                            value={user.darpan}
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

                        {/* Toggle link */}
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
