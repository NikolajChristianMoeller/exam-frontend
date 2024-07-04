import { useState } from "react";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Button, Paper, TextField, Typography } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import useResult from "../hooks/useResult.tsx";
import PostResultDialog from "../components/result/PostResultDialog.tsx";
import PutResultDialog from "../components/result/PutResultDialog.tsx";
import { TCreateResult } from "../types/result.type.ts";
import useParticipant from "../hooks/useParticipant.tsx";
import useDiscipline from "../hooks/useDiscipline.tsx";

function Result() {
    const { result, isLoading, createResult, updateResult, deleteResult } =
        useResult();

    const { participants } = useParticipant();
    const { discipline } = useDiscipline();
    const [searchText, setSearchText] = useState("");
    const [openPost, setOpenPost] = useState(false);
    const [openPut, setOpenPut] = useState(false);

    const [selectedResultId, setSelectedResultId] = useState<number>(0);

    const [selectedRow, setSelectedRow] = useState<TCreateResult>({
        id: null,
        participantId: 0,
        disciplineId: 0,
        resultDate: "",
        hours: 0,
        minutes: 0,
        seconds: 0,
        hundredths: 0,
        meters: 0,
        centimeters: 0,
        points: 0
    });

    /* const handleOpenPut = (id: number) => {
        setSelectedResultId(id);
        setOpenPut(true);
    };*/

    const handleOpenPut = (id: number) => {
        const selectedResult = result.find((res) => res.id === id);
        if (selectedResult) {
            const selectedParticipant = participants.find(
                (part) => part.fullName === selectedResult.participantName
            );
            const selectedDiscipline = discipline.find(
                (disc) => disc.name === selectedResult.disciplineName
            );

            // This is a ts error
            // eslint-disable-next-line prefer-const
            let hours = 0,
                minutes = 0,
                seconds = 0,
                hundredths = 0,
                meters = 0,
                // eslint-disable-next-line prefer-const
                centimeters = 0,
                points = 0;

            if (selectedResult.resultsType === "POINTS") {
                points = parseInt(selectedResult.resultValue);
            } else if (selectedResult.resultValue.endsWith("m")) {
                meters = parseFloat(selectedResult.resultValue);
            } else {
                const timeParts = selectedResult.resultValue.split(/[:.]/);

                hours = Number(timeParts[0]);
                minutes = Number(timeParts[1]);
                seconds = Number(timeParts[2]);
                hundredths = Number(timeParts[3]);
            }

            if (selectedParticipant && selectedDiscipline) {
                setSelectedRow({
                    id: selectedResult.id,
                    participantId: selectedParticipant.id,
                    disciplineId: selectedDiscipline.id,
                    resultDate: selectedResult.resultDate,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                    hundredths: hundredths,
                    meters: meters,
                    centimeters: centimeters,
                    points: points
                });
            }
        }
        setSelectedResultId(id);
        setOpenPut(true);
    };
    const handleClose = () => {
        setOpenPost(false);
        setOpenPut(false);
    };

    const handleOpenPost = () => {
        setOpenPost(true);
    };

    const handleDelete = (id: number) => {
        deleteResult(id);
    };

    const columns = [
        { field: "disciplineName", headerName: "Discipline Name", width: 200 },
        { field: "resultsType", headerName: "Results Type", width: 200 },
        { field: "resultValue", headerName: "Result Value", width: 200 },
        { field: "resultDate", headerName: "Result Date", width: 200 },
        {
            field: "participantName",
            headerName: "Participant Name",
            width: 200
        },
        { field: "ageGroup", headerName: "Age Group", width: 200 },
        { field: "gender", headerName: "Gender", width: 200 },
        { field: "adjacentClub", headerName: "Adjacent Club", width: 200 },
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
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 200,
            renderCell: (params: GridCellParams) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(params.row.id as number)}
                >
                    Delete
                </Button>
            )
        }
    ];

    const filteredDisciplines = result.filter(
        (discipline) =>
            discipline.disciplineName
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.resultsType
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.resultValue
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.resultDate
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.participantName
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.ageGroup
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.gender
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            discipline.adjacentClub
                .toLowerCase()
                .includes(searchText.toLowerCase())
    );

    const rows = filteredDisciplines.map((resultItem) => ({
        id: resultItem.id,
        disciplineName: resultItem.disciplineName,
        resultsType: resultItem.resultsType,
        resultValue: resultItem.resultValue,
        resultDate: resultItem.resultDate,
        participantName: resultItem.participantName,
        ageGroup: resultItem.ageGroup,
        gender: resultItem.gender,
        adjacentClub: resultItem.adjacentClub
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
                    Result list and Crud operations
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
                        variant={"outlined"}
                        onClick={handleOpenPost}
                    >
                        Create new Result
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
            <PostResultDialog
                open={openPost}
                handleClose={handleClose}
                createResult={createResult}
            />
            <PutResultDialog
                open={openPut}
                handleClose={handleClose}
                updateResult={updateResult}
                selectedResultId={selectedResultId}
                selectedRow={selectedRow}
            />
        </>
    );
}

export default Result;