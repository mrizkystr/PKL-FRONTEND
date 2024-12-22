import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Grid, Alert } from '@mui/material';
import { salesCodesApi } from '../../api/api';
import Sidebar from '../../components/layout/Sidebar'; // Import Sidebar component

const SalesCodeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesCode, setSalesCode] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchSalesCode();
    }
  }, [id]);

  const fetchSalesCode = async () => {
    try {
      const response = await salesCodesApi.getDetail(id);
      setSalesCode(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sales code details:', error);
      setError('Failed to load sales code details.');
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#001F3D', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
        <Paper style={{ width: '100%', maxWidth: '800px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" gutterBottom style={{ color: '#0D47A1', fontWeight: 'bold' }}>
            Sales Code Details
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={3}>
            {Object.keys(salesCode).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 'bold' }}>
                  {key.replace('_', ' ')}
                </Typography>
                <Typography variant="body1" style={{ color: '#424242' }}>
                  {salesCode[key] || '-'}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <div style={{ marginTop: 16 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/sales-codes')}
              style={{
                borderColor: '#0D47A1',
                color: '#0D47A1',
                width: '100%',
                padding: '12px 0',
                fontWeight: 'bold',
              }}
            >
              Back
            </Button>
          </div>
        </Paper>
      </main>
    </div>
  );
};

export default SalesCodeDetail;
