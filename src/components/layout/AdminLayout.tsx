
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title = "Admin Dashboard" }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background shadow-sm border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              View Site
            </Link>
            <button 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="w-64 bg-background border-r p-4 hidden md:block">
          <nav className="space-y-1">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/projects"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              Projects
            </Link>
            <Link
              to="/admin/blog"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              Blog Posts
            </Link>
            <Link
              to="/admin/certifications"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              Certifications
            </Link>
            <Link
              to="/admin/coding-profiles"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              Coding Profiles
            </Link>
            <Link
              to="/admin/profile"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              Profile Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
