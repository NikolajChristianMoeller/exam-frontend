import {Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button} from "@mui/material";
import {useState} from "react";
import type {Tdata} from "../types/test.type.ts";

type TestFormProps = {
    open: boolean;
    handleClose: () => void;
    createTestData: (dataToBeCreated: Tdata) => void;
}

function TestForm ({open, handleClose, createTestData}:TestFormProps) {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    const handleUpdate = () => {

        const dataToBeCreated = {
            name,
            age
        }

        createTestData(dataToBeCreated)
        handleClose();
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Create Participant</DialogTitle>
                <br />
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                label="Name"
                                fullWidth
                                variant="outlined"
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                label="Age"
                                fullWidth
                                type="number"
                                variant="outlined"
                                name="age"
                                onChange={(event) => setAge(Number(event.target.value))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TestForm