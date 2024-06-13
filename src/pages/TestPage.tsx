import { Button, Paper } from "@mui/material"
import AdsClickIcon from '@mui/icons-material/AdsClick';

function TestPage() {

    const handleClick = () => {
        console.info("hejsa");
    }

    return (
        <>
            <Paper elevation={3}
                sx={{
                    padding: 2,
                    margin: 2,
                    textAlign: 'center',
                }}
            >
                <div>TestPage</div>

                <Button variant="outlined" startIcon={<AdsClickIcon />} onClick={handleClick}>
                    Click me
                </Button>

            </Paper >

        </>

    )
}

export default TestPage
