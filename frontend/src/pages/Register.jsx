import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                username,
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
        } catch (error) {
            console.error("Register error:", error);
            alert("Registration failed! Try a different email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Create Account 🚀</h1>
                <p style={styles.subtext}>Join the platform and start practicing</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{...styles.button, opacity: loading ? 0.7 : 1}}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.link}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

// --- MODERN UI STYLES (Same as Login) ---
const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        padding: '20px'
    },
    card: {
        backgroundColor: '#1e1e1e',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        border: '1px solid #333'
    },
    heading: {
        color: '#ffffff',
        margin: '0 0 10px 0',
        textAlign: 'center',
        fontSize: '28px'
    },
    subtext: {
        color: '#a0a0a0',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '14px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        color: '#e0e0e0',
        fontSize: '14px',
        fontWeight: '500'
    },
    input: {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #444',
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        fontSize: '16px',
        outline: 'none',
    },
    button: {
        padding: '14px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#007acc',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
    },
    footerText: {
        color: '#a0a0a0',
        textAlign: 'center',
        marginTop: '25px',
        fontSize: '14px'
    },
    link: {
        color: '#007acc',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

export default Register;