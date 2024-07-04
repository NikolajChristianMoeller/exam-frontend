import { useState } from "react";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import useDiscipline from "../hooks/useDiscipline.tsx";
import { Button, Paper, TextField, Typography } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import PostDisciplineDialog from "../components/discipline/PostDisciplineDialog.tsx";
import { TDiscipline, TResultsType } from "../types/discipline.type.ts";

import PutDisciplineDialog from "../components/discipline/PutDisciplineDialog.tsx";

const resultsTypeArr: TResultsType[] = ["POINTS", "TIME", "DISTANCE"];

function Discipline() {
    const { discipline, isLoading, createDiscipline, updateDiscipline } =
        useDiscipline();

    const [searchText, setSearchText] = useState("");
    const [openPost, setOpenPost] = useState(false);
    const [openPut, setOpenPut] = useState(false);

    const defaultDiscipline: TDiscipline = {
        id: 0,
        name: "",
        description: "",
        resultsType: "POINTS",
        participants: []
    };

    const [selectedDiscipline, setSelectedDiscipline] =
        useState<TDiscipline>(defaultDiscipline);

    const handleOpenPost = () => {
        setOpenPost(true);
    };

    const handleOpenPut = (id: number) => {
        const selectedRowDiscipline = discipline.find(
            (discipline) => discipline.id === id
        );
        if (selectedRowDiscipline) {
            setSelectedDiscipline(selectedRowDiscipline);
            setOpenPut(true);
        }
    };

    const handleClose = () => {
        setOpenPost(false);
        setOpenPut(false);
    };

    const columns = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "description", headerName: "Description", width: 400 },
        { field: "resultsType", headerName: "Results Type", width: 200 },
        { field: "participants", headerName: "Participants", width: 600 },
        {
            field: "update",
            headerName: "Update",
            width: 200,
            renderCell: (params: GridCellParams) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenPut(params.row.id as number)}
                >
                    Update
                </Button>
            )
        }
    ];

    const filteredDisciplines = discipline.filter(
        (discipline) =>
            discipline.name.toLowerCase().includes(searchText.toLowerCase()) ||
            discipline.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.resultsType
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.participants.some((participant) =>
                participant.fullName
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            )
    );

    const rows = filteredDisciplines.map((discipline) => ({
        id: discipline.id,
        name: discipline.name,
        description: discipline.description,
        resultsType: discipline.resultsType,
        participants: discipline.participants
            .map((participant) => participant.fullName)
            .join(", ")
    }));

    return (
        <>
            {isLoading && <LoadingSpinner />}

            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    margin: 2,
                    borderRadius: 2
                }}
            >
                <Typography sx={{ fontSize: "2em" }}>
                    Discipline list and Crud operations
                </Typography>

                <br />
                <hr />
                <br />

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <Button
                        onClick={handleOpenPost}
                        variant={"outlined"}
                    >
                        Create new Discipline
                    </Button>
                </div>

                <Paper
                    elevation={3}
                    sx={{
                        padding: 2,
                        margin: 2,
                        borderRadius: 2
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoHeight
                    />
                </Paper>
            </Paper>
            <PostDisciplineDialog
                open={openPost}
                handleClose={handleClose}
                createDiscipline={createDiscipline}
                resultsTypeArr={resultsTypeArr}
            />
            <PutDisciplineDialog
                open={openPut}
                handleClose={handleClose}
                updateDiscipline={updateDiscipline}
                resultsTypeArr={resultsTypeArr}
                selectedDiscipline={selectedDiscipline}
            />
        </>
    );
}

export default Discipline;