import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';

function SignInPage() {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const successMessage = location.state?.message || '';

  function handleSubmit(event) {
    event.preventDefault();
    const result = signIn(username, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/');
  }

  return (
    <section className="auth-card">
      <h1>Sign in</h1>

      <StatusMessage error={error} success={Boolean(successMessage)} successText={successMessage} />

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign in</button>
      </form>

      <p>
        New user? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
}

export default SignInPage;
