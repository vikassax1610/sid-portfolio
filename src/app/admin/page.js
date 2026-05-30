"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Eye, EyeOff, Lock, Layers } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid email or password");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background: #080b14;
          min-height: 100vh;
        }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        /* Animated gradient orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: float 8s ease-in-out infinite;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #1769FF, transparent 70%);
          top: -150px; left: -150px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #6d28d9, transparent 70%);
          bottom: -100px; right: -100px;
          animation-delay: -4s;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #0ea5e9, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -2s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33%       { transform: translate(30px, -20px); }
          66%       { transform: translate(-20px, 15px); }
        }

        /* Grid lines background */
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Card */
        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          padding: 20px 40px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.05),
            0 40px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        /* Logo / badge */
        .logo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px; height: 64px;
          border-radius: 20px;
          background: linear-gradient(135deg, #1769FF, #6d28d9);
          box-shadow: 0 8px 32px rgba(23,105,255,0.4);
          margin-bottom: 28px;
        }

        .card-title {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .card-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 36px;
          line-height: 1.6;
        }

        /* Label */
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }

        /* Input wrapper */
        .input-wrapper {
          position: relative;
          margin-bottom: 24px;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          pointer-events: none;
        }

        .input-field {
          width: 100%;
          padding: 14px 48px 14px 48px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: #fff;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s;
          outline: none;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }
        .input-field:focus {
          border-color: rgba(23,105,255,0.6);
          background: rgba(23,105,255,0.08);
          box-shadow: 0 0 0 3px rgba(23,105,255,0.15);
        }

        .toggle-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        .toggle-btn:hover { color: rgba(255,255,255,0.7); }

        /* Error */
        .error-msg {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fca5a5;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Submit button */
        .login-btn {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #1769FF 0%, #4f46e5 100%);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 8px 24px rgba(23,105,255,0.35);
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(23,105,255,0.5);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer note */
        .footer-note {
          text-align: center;
          margin-top: 28px;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
        }
      `}</style>

      <div className="login-root">
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="card">
          {/* Logo */}
          <div className="logo-badge">
            <Layers size={28} color="#fff" />
          </div>

          <h1 className="card-title">Client Portal</h1>
          <p className="card-subtitle">
            Enter your password to manage the gallery — upload new artwork or remove existing pieces.
          </p>

          <form onSubmit={handleLogin}>
            
            <label htmlFor="admin-password" className="field-label">
              Email
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                <Mail size={16} />
              </span>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
                autoComplete="current-email"
                required
              />
            </div>

            <label htmlFor="admin-password" className="field-label">
              Password
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                <Lock size={16} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="error-msg" role="alert">
                <Lock size={14} />
                {error}
              </div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              className="login-btn"
              disabled={loading || !password}
            >
              {loading && <span className="spinner" />}
              {loading ? "Signing in…" : "Sign In to Dashboard"}
            </button>
          </form>

          <p className="footer-note">
            Secure admin access · Session expires in 8 hours
          </p>
        </div>
      </div>
    </>
  );
}
