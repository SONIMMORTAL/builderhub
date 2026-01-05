import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    User,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth, isConfigured } from '../firebase/config';

interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    provider: 'google' | 'github';
}

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isConfigured: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isConfigured || !auth) {
            setIsLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
            if (firebaseUser) {
                // Determine provider
                const providerId = firebaseUser.providerData[0]?.providerId;
                const provider = providerId?.includes('google') ? 'google' : 'github';

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    provider,
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        if (!auth) {
            setError('Firebase not configured');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            console.error('Google sign in error:', err);
            setError(err.message || 'Failed to sign in with Google');
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGithub = async () => {
        if (!auth) {
            setError('Firebase not configured');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            console.error('GitHub sign in error:', err);
            setError(err.message || 'Failed to sign in with GitHub');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        if (!auth) return;

        try {
            await signOut(auth);
        } catch (err: any) {
            console.error('Logout error:', err);
            setError(err.message || 'Failed to log out');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isConfigured,
                signInWithGoogle,
                signInWithGithub,
                logout,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
