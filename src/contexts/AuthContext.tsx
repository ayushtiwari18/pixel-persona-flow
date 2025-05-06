
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  checkAdminStatus: (userId?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Check admin status when auth state changes
        if (currentSession?.user) {
          // Use setTimeout to prevent Supabase deadlock with auth events
          setTimeout(() => {
            checkAdminStatus(currentSession.user.id)
              .then(adminStatus => {
                setIsAdmin(adminStatus);
                if (event === 'SIGNED_IN' && !adminStatus && window.location.pathname.startsWith('/admin')) {
                  // If user is not admin and tries to access admin pages
                  navigate('/');
                }
              })
              .catch(err => {
                console.error('Error checking admin status during auth change:', err);
                setIsAdmin(false);
              });
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Check current session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        checkAdminStatus(currentSession.user.id)
          .then(adminStatus => {
            setIsAdmin(adminStatus);
            if (!adminStatus && window.location.pathname.startsWith('/admin')) {
              // If user is not admin and tries to access admin pages
              navigate('/');
            }
          })
          .catch(err => {
            console.error('Error checking initial admin status:', err);
            setIsAdmin(false);
          });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const checkAdminStatus = async (userId?: string): Promise<boolean> => {
    try {
      if (!userId && !user) return false;
      
      const idToCheck = userId || user?.id;
      if (!idToCheck) return false;
      
      const { data, error } = await supabase.rpc('is_admin', { user_id: idToCheck });
      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signUp, 
      signIn, 
      signOut, 
      isAdmin,
      checkAdminStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
