import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

const Welcome = () => {
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            navigate('/');
        } else {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            setUserName(userData?.name);
        }
    }, [navigate]);

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                sx={{ backgroundColor: '#f5f5f5' }} // Optional background color for the page
            >
                <Card sx={{ width: 400, padding: 3 }}>
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom>
                            Hello, Welcome {userName}!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Welcome;
