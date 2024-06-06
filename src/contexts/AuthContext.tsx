import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useLoading } from "./LoadingContext";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface IUser {
  email?: string;
  id: string;
  paymentStatusAtivo?: boolean;
}

interface AuthCtxProps {
  children: ReactNode;
}

interface AuthCtxData {
  user: IUser | null;
  paymentStatusAtivo: boolean | null;
  register: (credentials: SignCredentials) => Promise<void>;
  login: (credentials: SignCredentials) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface SignCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthCtxData);

export function AuthProvider({ children }: AuthCtxProps) {
  const { toggleLoading } = useLoading();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [paymentStatusAtivo, setPaymentStatusAtivo] = useState<boolean | null>(null);

  async function logout() {
    try {
      toggleLoading(true);
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      toggleLoading(false);
    }
  }

  async function register({ email, password }: SignCredentials) {
    try {
      toggleLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      setUser({
        email: user.email ?? "",
        id: user.uid
      });
      await setInitialPaymentStatus(user.uid);  // Adiciona o campo paymentStatusAtivo
      navigate("/");
    } catch (err) {
      toast.error("An unexpected error occurred while signing up");
    } finally {
      toggleLoading(false);
    }
  }

  async function login({ email, password }: SignCredentials) {
    try {
      toggleLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        email: user.email ?? "",
        id: user.uid
      });
      const userData = await fetchUserData(user.uid);
      if (userData) {
        setPaymentStatusAtivo(userData.paymentStatusAtivo);
      }
      navigate("/");
    } catch (err) {
      toast.error("Email or password incorrect!");
    } finally {
      toggleLoading(false);
    }
  }

  async function resetPassword(email: string) {
    try {
      toggleLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error("An error occurred while trying to reset the password.");
    } finally {
      toggleLoading(false);
    }
  }

  async function setInitialPaymentStatus(userId: string) {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { paymentStatusAtivo: false }, { merge: true });
      toast.success("User payment status initialized.");
    } catch (err) {
      toast.error("An error occurred while setting the payment status.");
    }
  }

  async function fetchUserData(userId: string) {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData);
        return userData;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }
  

  useEffect(() => {
    onAuthStateChanged(auth, async (fireUser) => {
      if (fireUser) {
        setUser({
          email: String(fireUser.email),
          id: fireUser.uid
        });
        const userData = await fetchUserData(fireUser.uid);
        if (userData) {
          setPaymentStatusAtivo(userData.paymentStatusAtivo);
        }
      } else {
        navigate("/login");
      }
      toggleLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, paymentStatusAtivo, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
