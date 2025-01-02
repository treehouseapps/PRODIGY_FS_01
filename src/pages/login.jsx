import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Alert,
    Box,
    Typography,
    Container,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom'
// Copyright Component
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="https://t.me/username">
                Treehouse
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Custom Styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 'theme.spacing(8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: 'theme.spacing(1)',
        backgroundColor: 'theme.palette.secondary.main',
    },
    form: {
        width: '90%',
        marginTop: 'theme.spacing(1)',
    },
    submit: {
        margin: 'theme.spacing(3, 0, 2)',
    },
}));

// SignIn Component
export default function SignIn() {
    const classes = useStyles();

    const theme = createTheme();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [alertVisibility, setAlertVisibility] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (email && password) {

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {

                    const data = await response.json()

                    if (data.message.value == true) {
                        const serverResponse = {
                            authToken: '12345',
                            userData: { name: data.message.text },
                        }
                        sessionStorage.setItem('authToken', serverResponse.authToken);
                        sessionStorage.setItem('userData', JSON.stringify(serverResponse.userData));
                        navigate('/welcome')
                    }
                    else {
                        setMessage(data.message.text)
                        setAlertVisibility(true);
                        setTimeout(() => {
                            setAlertVisibility(false);
                        }, 5000);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setMessage("Fill out the form")
            setAlertVisibility(true);
            setTimeout(() => {
                setAlertVisibility(false);
            }, 5000);
        }
    }
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs"
                sx={{
                    boxShadow: '1px 2px 10px 0.5px lightblue',
                    marginTop: '2rem',
                    padding: '1rem !important',
                    borderRadius: '.5rem',
                    backgroundColor: 'white'
                }}>
                {alertVisibility && (
                    <Alert severity="error" align='center' sx={{ padding: '0' }}>
                        {message}
                    </Alert>
                )}
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bolder', fontFamily: '"Quicksand", "serif"' }}>
                        Login
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <Typography>Email </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            placeholder='Your@gmail.com ...'
                            // label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value) }}
                            InputProps={{
                                sx: {
                                    height: '3rem',
                                },
                            }}
                        /><Typography>Password </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            placeholder='••••••'
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            InputProps={{
                                sx: {
                                    height: '3rem',
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                            aria-label="toggle password visibility"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '1rem' }}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>

                            <Grid item sx={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                                <Typography variant='body2'>Don't have an account?</Typography>
                                <Typography><Link to="signup" style={{ textDecoration: 'none' }}>
                                    {"Sign Up"}
                                </Link></Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
