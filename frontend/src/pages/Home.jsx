import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: <CheckCircleOutlineIcon fontSize="large" color="primary" />,
    title: 'Manage Tasks',
    desc: 'Create, update, and delete tasks. Track what needs to be done, what is in progress, and what is completed.',
  },
  {
    icon: <SearchIcon fontSize="large" color="primary" />,
    title: 'Search & Filter',
    desc: 'Quickly find tasks by title or filter by status — Pending, In Progress, or Completed.',
  },
  {
    icon: <LockIcon fontSize="large" color="primary" />,
    title: 'Secure Access',
    desc: 'Your tasks are private. Register and log in securely with hashed passwords and JWT authentication.',
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: '#fff',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Stay Organised. Get Things Done.
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            TaskTracker helps you manage your daily tasks with ease — all in one place.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Button variant="contained" color="secondary" size="large" component={Link} to="/tasks">
                Go to My Tasks
              </Button>
            ) : (
              <>
                <Button variant="contained" color="secondary" size="large" component={Link} to="/register">
                  Get Started — It&apos;s Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/login"
                  sx={{ color: '#fff', borderColor: '#fff' }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Why TaskTracker?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((f) => (
            <Grid item xs={12} md={4} key={f.title}>
              <Card elevation={2} sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>{f.icon}</Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
