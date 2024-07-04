import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    MenuItem
} from "@mui/material";
import useDiscipline from "../../hooks/useDiscipline.tsx";

import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner.tsx";
import { TCreateResult } from "../../types/result.type.ts";
import useParticipant from "../../hooks/useParticipant.tsx";
import { TResultsType } from "../../types/discipline.type.ts";

type TPutResultDialogProps = {
    open: boolean;
    handleClose: () => void;
    updateResult: (updatedResult: TCreateResult, id: number) => void;
    selectedResultId: number;
    selectedRow: TCreateResult;
};

/**
 * Put result dialog
 * @param open
 * @param handleClose
 * @param updateResult
 * @param selectedResultId
 * @param selectedRow
 * @constructor
 */
function PutResultDialog({
                              open,
                              handleClose,
                              updateResult,
                              selectedResultId,
                              selectedRow
                          }: TPutResultDialogProps) {
    const { discipline, isLoading: disciplineLoading } = useDiscipline();

    const { participants, isLoading: participantsLoading } = useParticipant();

    const [selectedParticipant, setSelectedParticipant] = useState<number>(
        selectedRow?.participantId || 0
    );
    const [selectedDiscipline, setSelectedDiscipline] = useState<number>(
        selectedRow?.disciplineId || 0
    );
    const [resultDate, setResultDate] = useState<TResultsType>(
        (selectedRow?.resultDate as TResultsType) || ("TIME" as TResultsType)
    );

    //time
    const [hour, setHour] = useState<number>(selectedRow?.hours || 0);
    const [minutes, setMinutes] = useState<number>(selectedRow?.minutes || 0);
    const [seconds, setSeconds] = useState<number>(selectedRow?.seconds || 0);
    const [hundredths, setHundredths] = useState<number>(
        selectedRow?.hundredths || 0
    );

    //distance
    const [meter, setMeter] = useState<number>(selectedRow?.meters || 0);
    const [centimeters, setCentimeters] = useState<number>(
        selectedRow?.centimeters || 0
    );

    //points
    const [points, setPoints] = useState<number>(selectedRow?.points || 0);

    useEffect(() => {
        if (open) {
            setSelectedParticipant(selectedRow.participantId);
            setSelectedDiscipline(selectedRow.disciplineId);
            setResultDate(selectedRow.resultDate as TResultsType);
            setHour(selectedRow.hours);
            setMinutes(selectedRow.minutes);
            setSeconds(selectedRow.seconds);
            setHundredths(selectedRow.hundredths);
            setMeter(selectedRow.meters);
            setCentimeters(selectedRow.centimeters);
            setPoints(selectedRow.points);
        }
    }, [open, selectedRow]);

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
                <DialogTitle>Update Result</DialogTitle>
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
                                onChange={(e) =>
                                    setSelectedParticipant(
                                        Number(e.target.value)
                                    )
                                }
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
                                onChange={(e) =>
                                    setResultDate(
                                        e.target.value as TResultsType
                                    )
                                }
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
                                onChange={(e) =>
                                    setSelectedDiscipline(
                                        Number(e.target.value)
                                    )
                                }
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
                                                    setPoints(
                                                        Number(e.target.value)
                                                    )
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
                                                    setHour(
                                                        Number(e.target.value)
                                                    )
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
                                                    setMinutes(
                                                        Number(e.target.value)
                                                    )
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
                                                    setSeconds(
                                                        Number(e.target.value)
                                                    )
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
                                                    setHundredths(
                                                        Number(e.target.value)
                                                    )
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
                                                    setMeter(
                                                        Number(e.target.value)
                                                    )
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
                                                    setCentimeters(
                                                        Number(e.target.value)
                                                    )
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PutResultDialog;