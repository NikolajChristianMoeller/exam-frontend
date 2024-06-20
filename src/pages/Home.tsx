import { Paper } from "@mui/material"

function Home() {
  return (
    <>
        <Paper elevation={3}
            sx={{
                padding: 2,
                margin: 2,
                textAlign: 'center',
            }}
        >
            <h1>Welcome to Home Page</h1>
            <p>This is the Home page of the application.</p>
        </Paper>
    </>
  )
}

export default Home