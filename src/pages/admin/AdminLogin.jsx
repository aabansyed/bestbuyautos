import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      setError(signInError.message || "Login failed. Check your credentials.");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="admin-auth-wrap">
      <div className="admin-auth-card">
        <div className="admin-auth-header">
          <div className="admin-auth-title"><i className="fas fa-user-shield"></i> Admin Login</div>
        </div>
        <p className="admin-auth-sub">Sign in to manage BestBuy Auto's stock cars.</p>

        {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="admin@bbajapan.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button className="btn-submit" type="submit" disabled={loading}>
            <i className="fas fa-sign-in-alt"></i> {loading ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
