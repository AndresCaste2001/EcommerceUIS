import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await auth.login({ username, password: 'ignored' });
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-5">
          <div className="card p-4">
            <h4 className="mb-3">Iniciar sesión</h4>
            {err && <div className="alert alert-danger">{err}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa un usuario"
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                {loading ? 'Ingresando…' : 'Ingresar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}