import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, isAuth, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>TaskForge</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {!isAuth && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}

        {isAuth && user?.role === "user" && (
          <Link to="/user" style={styles.link}>Dashboard</Link>
        )}

        {isAuth && user?.role === "admin" && (
          <Link to="/admin" style={styles.link}>Admin</Link>
        )}

        {isAuth && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

/* ---------------- styles ---------------- */

const styles = {
  navbar: {
    height: "60px",
    background: "#1e1e2f",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  logoutBtn: {
    background: "#e74c3c",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
