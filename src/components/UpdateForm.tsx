import type {Tdata} from "../types/test.type.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import {useState} from "react";

type updateTestDataProps = {
    openPut: boolean
    handleClose: () => void;
    updateTestData:  (updateTestData: Tdata) => void;
    selectedRow: {name: string, age: number }
}

function UpdateForm ({openPut, handleClose, updateTestData, selectedRow}: updateTestDataProps) {
    const [name, setName] = useState(selectedRow.name);
    const [age, setAge] = useState(selectedRow.age);

    const handleUpdate = () => {
        const dataToBeUpdated = {
            name,
            age
        }

        updateTestData(dataToBeUpdated)
        handleClose();
    }

    return (
        <>
            <Dialog
                open={openPut}
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
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateForm;