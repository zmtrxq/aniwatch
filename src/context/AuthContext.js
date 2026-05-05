import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'aniwatch_user';

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(() => sessionStorage.getItem(AUTH_KEY) || '');

  function signUp(username, password, repeatPassword) {
    if (!username || !password || !repeatPassword) {
      return { ok: false, message: 'Fill all fields' };
    }

    if (password.length <= 8) {
      return { ok: false, message: 'Password must be more than 8 characters' };
    }

    if (password !== repeatPassword) {
      return { ok: false, message: 'Passwords do not match' };
    }

    if (accounts.some((account) => account.username === username)) {
      return { ok: false, message: 'Username already exists' };
    }

    setAccounts((current) => [...current, { username, password }]);
    return { ok: true, message: 'Account created. Please sign in' };
  }

  function signIn(username, password) {
    const account = accounts.find(
      (item) => item.username === username && item.password === password
    );

    if (!account) {
      return { ok: false, message: 'Incorrect username or password' };
    }

    sessionStorage.setItem(AUTH_KEY, username);
    setUser(username);
    return { ok: true, message: 'Signed in' };
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
