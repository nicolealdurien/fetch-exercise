import React, { createContext, ReactNode, useState } from 'react';

interface AuthContextType {
  email: string;
  name: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <AuthContext.Provider
      value={{
        name,
        email,
        setName,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export type { AuthContextType };
