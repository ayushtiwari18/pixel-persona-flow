
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "@/components/admin/LoginForm";
import { ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to website
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-background rounded-lg shadow-lg p-8"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
}
