import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");

    const createRoom = () => {
        const randomRoomId = Math.random().toString(36).substring(2, 8);
        navigate(`/room/${randomRoomId}`);
    };

    const joinRoom = (e) => {
        if (e) e.preventDefault();
        if (!roomId.trim()) return;
        navigate(`/room/${roomId}`);
    };

    // UI Styles Object (No External CSS/Tailwind Required)
    const styles = {
        container: {
            background: "#0a0a0f",
            minHeight: "100vh",
            color: "#f3f4f6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            padding: "20px",
            boxSizing: "border-box"
        },
        card: {
            background: "rgba(26, 26, 36, 0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "40px 32px",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            boxSizing: "border-box"
        },
        iconWrapper: {
            width: "64px",
            height: "64px",
            background: "rgba(168, 85, 247, 0.1)",
            border: "1px solid rgba(168, 85, 247, 0.2)",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px auto",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)"
        },
        title: {
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0",
            background: "linear-gradient(to right, #ffffff, #9ca3af)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },
        subtitle: {
            color: "#9ca3af",
            fontSize: "14px",
            margin: "0 0 32px 0"
        },
        primaryBtn: {
            width: "100%",
            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxSizing: "border-box"
        },
        dividerContainer: {
            display: "flex",
            alignItems: "center",
            margin: "24px 0",
            color: "#4b5563",
            fontSize: "13px",
            fontWeight: "500"
        },
        dividerLine: {
            flexGrow: 1,
            height: "1px",
            background: "rgba(255, 255, 255, 0.08)"
        },
        dividerText: {
            padding: "0 16px"
        },
        input: {
            width: "100%",
            background: "#0a0a0f",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "15px",
            color: "white",
            outline: "none",
            marginBottom: "12px",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease"
        },
        secondaryBtn: {
            width: "100%",
            background: "#232334",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxSizing: "border-box",
            transition: "background 0.2s ease"
        },
        tertiaryBtn: {
            width: "100%",
            background: "transparent",
            color: "#9ca3af",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "color 0.2s ease"
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                
                {/* Brand Icon (Custom SVG Terminal Icon) */}
                <div style={styles.iconWrapper}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 17 10 11 4 5"></polyline>
                        <line x1="12" y1="19" x2="20" y2="19"></line>
                    </svg>
                </div>

                <h1 style={styles.title}>AI Mock Interview</h1>
                <p style={styles.subtitle}>Practice real-time coding with AI feedback</p>

                {/* Create Room */}
                <button 
                    onClick={createRoom} 
                    style={styles.primaryBtn}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Create New Interview
                </button>

                {/* Styled Divider */}
                <div style={styles.dividerContainer}>
                    <div style={styles.dividerLine}></div>
                    <span style={styles.dividerText}>OR</span>
                    <div style={styles.dividerLine}></div>
                </div>

                {/* Join Room Form */}
                <form onSubmit={joinRoom} style={{ margin: 0 }}>
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        style={styles.input}
                        onFocus={(e) => e.currentTarget.style.borderColor = "#8b5cf6"}
                        onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"}
                    />
                    <button
                        type="submit"
                        disabled={!roomId.trim()}
                        style={{
                            ...styles.secondaryBtn,
                            opacity: roomId.trim() ? 1 : 0.5,
                            cursor: roomId.trim() ? "pointer" : "not-allowed"
                        }}
                        onMouseOver={(e) => { if(roomId.trim()) e.currentTarget.style.background = "#2a2a3e" }}
                        onMouseOut={(e) => { e.currentTarget.style.background = "#232334" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        Join Existing Room
                    </button>
                </form>

                {/* View History */}
                <button
                    onClick={() => navigate("/history")}
                    style={styles.tertiaryBtn}
                    onMouseOver={(e) => e.currentTarget.style.color = "#ffffff"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    View Previous Interviews
                </button>

            </div>
        </div>
    );
};

export default Dashboard;