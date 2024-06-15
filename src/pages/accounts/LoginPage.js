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
import Cookies from 'universal-cookie';
import getCurrentUser from "../../functions/getCurrentUser";


export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage , seterrorMessage ] = useState('');
  const cookies = new Cookies();

  const loginUser = (data) => {
    axios.post("http://127.0.0.1:8000/accounts/token/", data)
      .then(res => {
        const responseData = res.data;
        cookies.set('access', responseData.access, { path: '/', expires: new Date(Date.now() + 3600000) });
        cookies.set('refresh', responseData.refresh, { path: '/', expires: new Date(Date.now() + 3600000) });
        console.log(responseData);
        getCurrentUser();
        console.log(cookies.getAll());
        navigate("/");
      })
      .catch(error => {
        seterrorMessage(error.response.data.detail);
      });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginUser(data);
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="off"
              autoFocus
              sx={{'& .MuiOutlinedInput-root': { backgroundColor: '#E5DDC5'}}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              sx={{'& .MuiOutlinedInput-root': { backgroundColor: '#E5DDC5'}}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {errorMessage && (
              <Alert severity="warning" variant='filled' align="center">
                {errorMessage}
              </Alert>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/accounts/registration" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    
  );
}