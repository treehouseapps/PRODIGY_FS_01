import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Alert,
    Grid,
    Box,
    Typography,
    Container,
    CircularProgress
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

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

export default function SignUp() {
    const classes = useStyles();
    const theme = createTheme();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cPassword, SetCpassword] = useState()
    const [message, setMessage] = useState('Default')
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [text, setText] = useState("Sign up")

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const navigate = useNavigate();

    // Simulate login response from the server , Session
    const serverResponse = {
        authToken: '12345678910',
        userData: { userName: "name" },
    };
    const alert = () => {
        setAlertVisibility(true);
        setTimeout(() => {
            setAlertVisibility(false);
        }, 5000);
    }
    const check = async (data) => {
        const info = await fetch('https://secure-user-backend.vercel.app/check', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (info) {
            const data = await response.json()
            if (data.message.value == true) {
                setMessage('Email is taken try another')
                alert()
                validate = false
            }
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        let validate = true

        if (!name) {
            setMessage('name is required')
            alert()
            validate = false
        } else if (name.length < 3) {
            setMessage('name is too short')
            alert()
            validate = false
        }
        if (!email) {
            setMessage('Email is required')
            alert()
            validate = false
        } else if (!emailRegex.test(email)) {
            setMessage('Invalid email format')
            alert()
            validate = false
        }
        if (!password) {
            setMessage('Password is required')
            alert()
            validate = false
        } else if (password.length < 6) {
            setMessage('Password must be at least 6 characters')
            alert()
            validate = false
        }
        if (password !== cPassword) {
            setMessage('Password is not same')
            alert()
            validate = false
        }
        if (email) { check(data) }
        if (validate == true) {
            try {
                setText(<CircularProgress sx={{ color: "white" }} />)
                const response = await fetch('https://secure-user-backend.vercel.app/signup', {
                    method: 'POST',
                    body: JSON.stringify({ email }),
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
                        navigate('/welcome');
                    } else {
                        setMessage('INCORRECT')
                        alert()
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

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
                    <Alert severity="error" sx={{ padding: '0' }}>
                        {message}
                    </Alert>
                )}
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOpenIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bolder', fontFamily: '"Quicksand", "serif"' }}>
                        Sign-Up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <Typography>Full Name </Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            placeholder='Alexander'
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            InputProps={{
                                sx: {
                                    height: '3rem',
                                    marginBottom: '.5rem'
                                },
                            }}
                        />
                        <Typography>Email Address</Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            placeholder='Your@gmail.com ...'
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            InputProps={{
                                sx: {
                                    height: '3rem',
                                    marginBottom: '.5rem'
                                },
                            }}
                        /><Typography>Password </Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            placeholder='••••••'
                            name="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            InputProps={{
                                sx: {
                                    height: '3rem',
                                    marginBottom: '.5rem'
                                },
                            }}
                        /><Typography>Confirm Password </Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="confirmpassword"
                            placeholder='••••••'
                            name="confirmpassword"
                            value={cPassword}
                            onChange={(e) => { SetCpassword(e.target.value) }}
                            InputProps={{
                                sx: {
                                    height: '3rem',
                                    marginBottom: '.5rem'
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            sx={{ margin: '.5rem 0rem' }}
                        >
                            {text}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>

                            <Grid item sx={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                                <Typography variant='body2'>Have an account?</Typography>
                                <Typography variant='h6'><Link to="/" style={{ textDecoration: 'none' }}>
                                    {"Login"}
                                </Link></Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box sx={{ margin: '1rem 0rem 0rem 0rem' }}>
                    <Copyright />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
