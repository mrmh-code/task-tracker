import { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Card, CardContent, Avatar,
  Divider, CircularProgress, Grid, Chip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/tasks');
        const counts = { total: data.length, Pending: 0, 'In Progress': 0, Completed: 0 };
        data.forEach((t) => { if (counts[t.status] !== undefined) counts[t.status]++; });
        setStats(counts);
      } catch {
        setStats({ total: 0, Pending: 0, 'In Progress': 0, Completed: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2 }}>
              <PersonIcon sx={{ fontSize: 48 }} />
            </Avatar>
            <Typography variant="h5" fontWeight={700}>{user?.name}</Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" fontWeight={600} gutterBottom>Task Summary</Typography>
          <Grid container spacing={2}>
            {[
              { label: 'Total Tasks', value: stats.total, color: 'default' },
              { label: 'Pending', value: stats.Pending, color: 'warning' },
              { label: 'In Progress', value: stats['In Progress'], color: 'info' },
              { label: 'Completed', value: stats.Completed, color: 'success' },
            ].map((item) => (
              <Grid item xs={6} key={item.label}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" fontWeight={700}>{item.value}</Typography>
                  <Chip label={item.label} color={item.color} size="small" sx={{ mt: 0.5 }} />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" color="text.secondary">
            Member since:{' '}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })
              : '—'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
