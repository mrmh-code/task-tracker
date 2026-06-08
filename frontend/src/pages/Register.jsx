import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Alert, Paper,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/tasks');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const field = (name, label, type = 'text') => (
    <TextField
      label={label}
      type={type}
      fullWidth
      margin="normal"
      value={form[name]}
      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      error={!!errors[name]}
      helperText={errors[name]}
    />
  );

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
          Create Account
        </Typography>

        {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {field('name', 'Full Name')}
          {field('email', 'Email', 'email')}
          {field('password', 'Password', 'password')}
          {field('confirm', 'Confirm Password', 'password')}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </Box>

        <Typography textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2' }}>Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
