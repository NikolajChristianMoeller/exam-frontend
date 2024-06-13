import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const FallbackPage = () => {
    return (
        <Container sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
                Go to Home
            </Button>
        </Container>
    );
};

export default FallbackPage;
