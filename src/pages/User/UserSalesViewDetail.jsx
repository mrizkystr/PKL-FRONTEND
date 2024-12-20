import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Grid } from '@mui/material';
import { userApi } from '../../api/api';
import SidebarUser from '../../components/layout/SidebarUser'; // Import Sidebar component

const UserSalesViewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesCode, setSalesCode] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSalesCode();
    }
  }, [id]);

  const fetchSalesCode = async () => {
    try {
      const response = await userApi.salesCodesApi.getDetail(id);
      setSalesCode(response.data);
    } catch (error) {
      console.error('Error fetching sales code details:', error);
    }
  };

  if (!salesCode) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f5f5f5', padding: '20px', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}>
        <SidebarUser /> {/* Sidebar */}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h4" gutterBottom>
            Sales Code Details
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(salesCode).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="subtitle2" color="textSecondary">
                  {key.replace('_', ' ')}
                </Typography>
                <Typography variant="body1">{salesCode[key] || '-'}</Typography>
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: 16 }}>
            <Button variant="outlined" onClick={() => navigate('/user/sales-codes')}>
              Back
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default UserSalesViewDetail;
