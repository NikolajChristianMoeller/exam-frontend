import { ChangeEvent, useState } from "react";
import { TCreateResult } from "../../types/result.type.ts";
import { TResultsType } from "../../types/discipline.type.ts";
import { Dialog, DialogActions, DialogContent, TextField, Button, Grid, MenuItem, DialogTitle } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner.tsx";
import useDiscipline from "../../hooks/useDiscipline.tsx";
import useParticipant from "../../hooks/useParticipant.tsx";

type TPutResultDialogProps = {
    open: boolean;
    handleClose: () => void;
    updateResult: (updatedResult: TCreateResult, id: number) => void;
    selectedResultId: number;
};

/**
 * Put result dialog
 * @param open
 * @param handleClose
 * @param updateResult
 * @param selectedResultId
 * @constructor
 */
function PutResultDialog({
                              open,
                              handleClose,
                              updateResult,
                              selectedResultId
                          }: TPutResultDialogProps) {
    const {discipline, isLoading: disciplineLoading } = useDiscipline();

    const {participants, isLoading: participantsLoading } = useParticipant();

    const [selectedParticipant, setSelectedParticipant] = useState<number>(0);
    const [selectedDiscipline, setSelectedDiscipline] = useState<number>(0);
    const [resultDate, setResultDate] = useState<TResultsType>("TIME");

    //time
    const [hour, setHour] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [hundredths, setHundredths] = useState<number>(0);

    //distance
    const [meter, setMeter] = useState<number>(0);
    const [centimeters, setCentimeters] = useState<number>(0);

    //points
    const [points, setPoints] = useState<number>(0);

    const handleParticipantChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSelectedParticipant(Number(e.target.value));
    };

    const handleDisciplineChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSelectedDiscipline(Number(e.target.value));
    };

    const handleResultDataChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setResultDate(e.target.value as TResultsType);
    };

    const handleHourChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setHour(Number(e.target.value));
    };

    const handleMinutesChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setMinutes(Number(e.target.value));
    };

    const handleSecondsChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSeconds(Number(e.target.value));
    };

    const handleHundredthsChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setHundredths(Number(e.target.value));
    };

    const handleMeterChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setMeter(Number(e.target.value));
    };

    const handleCentimetersChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCentimeters(Number(e.target.value));
    };

    const handlePointsChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPoints(Number(e.target.value));
    };

    const handleUpdate = () => {
        const updatedResult: TCreateResult = {
            participantId: selectedParticipant,
            disciplineId: selectedDiscipline,
            resultDate: resultDate,
            points: points,
            hours: hour,
            minutes: minutes,
            seconds: seconds,
            hundredths: hundredths,
            meters: meter,
            centimeters: centimeters
        };

        updateResult(updatedResult, selectedResultId as number);

        setSelectedParticipant(0);
        setSelectedDiscipline(0);
        setResultDate("TIME");
        setHour(0);
        setMinutes(0);
        setSeconds(0);
        setHundredths(0);
        setMeter(0);
        setCentimeters(0);
        setPoints(0);

        handleClose();
    };

    const selectedDisciplineObj = discipline.find(
        (dic) => dic.id === selectedDiscipline
    );

    return (
        <>
            {disciplineLoading || (participantsLoading && <LoadingSpinner />)}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>Update result</DialogTitle>
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
                                select
                                label="Participant"
                                fullWidth
                                variant="outlined"
                                name="participant"
                                value={selectedParticipant}
                                onChange={(e) => handleParticipantChange(e)}
                            >
                                {participants.map((par) => (
                                    <MenuItem value={par.id}>
                                        {par.fullName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                type="date"
                                label="Result Date"
                                fullWidth
                                variant="outlined"
                                name="resultDate"
                                InputLabelProps={{ shrink: true }}
                                value={resultDate}
                                onChange={(e) => handleResultDataChange(e)}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                select
                                label="Discipline"
                                fullWidth
                                variant="outlined"
                                name="discipline"
                                value={selectedDiscipline}
                                onChange={(e) => handleDisciplineChange(e)}
                            >
                                {discipline.map((dic) => (
                                    <MenuItem value={dic.id}>
                                        {dic.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {selectedDisciplineObj && (
                            <>
                                {selectedDisciplineObj.resultsType ===
                                "POINTS" ? (
                                    <>
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                type="number"
                                                label="Points"
                                                fullWidth
                                                variant="outlined"
                                                name="points"
                                                value={points}
                                                onChange={(e) =>
                                                    handlePointsChange(e)
                                                }
                                            />
                                        </Grid>
                                    </>
                                ) : null}

                                {selectedDisciplineObj.resultsType ===
                                "TIME" ? (
                                    <>
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                type="number"
                                                label="Hour"
                                                fullWidth
                                                variant="outlined"
                                                name="hour"
                                                value={hour}
                                                onChange={(e) =>
                                                    handleHourChange(e)
                                                }
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                type="number"
                                                label="Minutes"
                                                fullWidth
                                                variant="outlined"
                                                name="minutes"
                                                value={minutes}
                                                onChange={(e) =>
                                                    handleMinutesChange(e)
                                                }
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                type="number"
                                                label="Seconds"
                                                fullWidth
                                                variant="outlined"
                                                name="minutes"
                                                value={seconds}
                                                onChange={(e) =>
                                                    handleSecondsChange(e)
                                                }
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                type="number"
                                                label="Hundredths"
                                                fullWidth
                                                variant="outlined"
                                                name="hundredths"
                                                value={hundredths}
                                                onChange={(e) =>
                                                    handleHundredthsChange(e)
                                                }
                                            />
                                        </Grid>
                                    </>
                                ) : null}

                                {selectedDisciplineObj.resultsType ===
                                "DISTANCE" ? (
                                    <>
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                type="number"
                                                label="Meter"
                                                fullWidth
                                                variant="outlined"
                                                name="meter"
                                                value={meter}
                                                onChange={(e) =>
                                                    handleMeterChange(e)
                                                }
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                type="number"
                                                label="Centimeters"
                                                fullWidth
                                                variant="outlined"
                                                name="centimeters"
                                                value={centimeters}
                                                onChange={(e) =>
                                                    handleCentimetersChange(e)
                                                }
                                            />
                                        </Grid>
                                    </>
                                ) : null}
                            </>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Update</Button>
                    <Button onClick={handleUpdate}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PutResultDialog;