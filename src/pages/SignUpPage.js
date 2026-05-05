import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', repeatPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = signUp(form.username, form.password, form.repeatPassword);

    if (!result.ok) {
      setError(result.message);
      setMessage('');
      return;
    }

    setError('');
    setMessage(result.message);
    navigate('/signin', { state: { message: result.message } });
  }

  return (
    <section className="auth-card">
      <h1>Sign up</h1>

      <StatusMessage error={error} success={Boolean(message)} successText={message} />

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.username}
          onChange={(event) => updateField('username', event.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={form.password}
          onChange={(event) => updateField('password', event.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={form.repeatPassword}
          onChange={(event) => updateField('repeatPassword', event.target.value)}
          placeholder="Repeat password"
        />
        <button type="submit">Sign up</button>
      </form>

      <p>
        Have an account? <Link to="/signin">Sign in</Link>
      </p>
    </section>
  );
}

export default SignUpPage;
