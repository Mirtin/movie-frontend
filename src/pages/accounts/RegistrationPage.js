import { useState } from 'react';
import { 
  Avatar, 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Grid, 
  Box, 
  Typography, 
  Container,
  Alert, 
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
  const navigate = useNavigate();
  const [errorMessage , seterrorMessage ] = useState('');

  const registerUser = (data) => {
    axios.post("http://127.0.0.1:8000/accounts/register/", data)
      .then(res => {
        const responseData = res.data;
        console.log(responseData);
        navigate("/accounts/login");
      })
      .catch(error => {
        seterrorMessage(Object.values(error.response.data));
      });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('username') || !data.get('email') || !data.get('password') || !data.get('password_confirm')) {
      seterrorMessage('All fields are required.');
      return 0;
    }
    registerUser(data);

  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{'& .MuiOutlinedInput-root': { backgroundColor: '#E5DDC5'}}}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="off"
                  />
                </Grid>
              <Grid item xs={12} sx={{'& .MuiOutlinedInput-root': { backgroundColor: '#E5DDC5'}}}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sx={{'& .MuiOutlinedInput-root': { backgroundColor: '#E5DDC5'}}}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sx={{'& .MuiOutlinedInput-root': { backgroundColor: '#E5DDC5'}}}>
                <TextField
                  required
                  fullWidth
                  name="password_confirm"
                  label="Password confirm"
                  type="password"
                  id="password_confirm"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {errorMessage && (
              <Alert severity="warning" variant='filled' align="center">
                {errorMessage}
              </Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/accounts/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default RegistrationPage;