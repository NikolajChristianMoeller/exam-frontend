import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Button} from "@mui/material"
import useTestHook from "../hooks/useTestHook.tsx";
import {useState} from "react";
import TestForm from "../components/TestForm.tsx";
import {Tdata} from "../types/test.type.ts";
import UpdateForm from "../components/UpdateForm.tsx";

function TestPage() {
    const { data, isLoading, createTestData, deleteData, updateTestData } = useTestHook();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState({})
    const [openPut, setOpenPut] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
        setOpenPut(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleUpdateRow = (data: Tdata) => {
        setOpenPut(true);
        setSelectedRow(data)
    }

    const handleDelete = (data: Tdata) => {
        deleteData(data.id)
    }

    return (
        <>
            {isLoading && <span>...loading</span>}
            <Paper elevation={3}
                sx={{
                    padding: 2,
                    margin: 2,
                    textAlign: 'center',
                }}
            >
                <Button onClick={handleOpen}>
                    Create new testData
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell>Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((data, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell>
                                        {data.name}
                                    </TableCell>
                                    <TableCell>
                                        {data.age}
                                    </TableCell>
                                    <TableCell onClick={() =>handleDelete(data)}>
                                        Delete
                                    </TableCell>
                                    <TableCell onClick={() => handleUpdateRow(data)}>
                                        Update
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TestForm
                    open={open}
                    handleClose={handleClose}
                    createTestData={createTestData}
                />
                <UpdateForm
                    openPut={openPut}
                    handleClose={handleClose}
                    updateTestData={updateTestData}
                    selectedRow={selectedRow}
                />
            </Paper >
        </>
    )
}

export default TestPage
