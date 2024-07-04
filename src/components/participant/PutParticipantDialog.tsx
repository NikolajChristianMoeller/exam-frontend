import { useEffect } from "react";
import {
    TCountry,
    TGender,
    TParticipantCreateAndUpdate
} from "../../types/participant.type.ts";
import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import useDiscipline from "../../hooks/useDiscipline.tsx";
import LoadingSpinner from "../LoadingSpinner.tsx";

type PutParticipantDialogProps = {
    open: boolean;
    handleClose: () => void;
    updateParticipant: (
        updatedParticipant: TParticipantCreateAndUpdate,
        id: number
    ) => void;
    genderArr: TGender[];
    countriesArr: TCountry[];
    selectedParticipant: TParticipantCreateAndUpdate;
};

/**
 * Put participant dialog
 * @param open
 * @param handleClose
 * @param updateParticipant
 * @param genderArr
 * @param countriesArr
 * @param selectedParticipant
 * @constructor
 */
function PutParticipantDialog({
                                  open,
                                  handleClose,
                                  updateParticipant,
                                  genderArr,
                                  countriesArr,
                                  selectedParticipant
                              }: PutParticipantDialogProps) {
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<TGender>("OTHER");
    const [country, setCountry] = useState<TCountry>("DENMARK");
    const [selectedDisciplines, setSelectedDisciplines] = useState<number[]>(
        []
    );
    const [adjacentClub, setAdjacentClub] = useState("");
    const { discipline, isLoading: disciplineLoading } = useDiscipline();

    useEffect(() => {
        if (selectedParticipant) {
            setFullName(selectedParticipant.fullName);
            setAge(selectedParticipant.age);
            setGender(selectedParticipant.gender);
            setCountry(selectedParticipant.country);
            setSelectedDisciplines(
                selectedParticipant.disciplines.map((disc) => disc.id)
            );
            setAdjacentClub(selectedParticipant.adjacentClub);
        }
    }, [selectedParticipant]);

    const handleDisciplinesChange = (e: SelectChangeEvent<string[]>) => {
        const selectedDisciplineNames = e.target.value as string[];
        const selectedDisciplineIds = selectedDisciplineNames.map((name) => {
            const foundDiscipline = discipline.find(
                (disc) => disc.name === name
            );
            return foundDiscipline ? foundDiscipline.id : -1;
        });
        setSelectedDisciplines(selectedDisciplineIds as number[]);
    };

    const handleUpdate = () => {
        const newParticipant: TParticipantCreateAndUpdate = {
            fullName,
            age,
            gender,
            country,
            disciplines: selectedDisciplines.map((id) => ({ id })),
            adjacentClub
        };

        updateParticipant(newParticipant, selectedParticipant.id as number);
        handleClose();
    };

    return (
        <>
            {disciplineLoading && <LoadingSpinner />}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>Update Participant</DialogTitle>
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
                                label="Full Name"
                                fullWidth
                                variant="outlined"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                select
                                label="Gender"
                                fullWidth
                                variant="outlined"
                                name="gender"
                                value={gender}
                                onChange={(e) =>
                                    setGender(e.target.value as TGender)
                                }
                            >
                                {genderArr.map((gender) => (
                                    <MenuItem value={gender}>{gender}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                select
                                label="Country"
                                fullWidth
                                variant="outlined"
                                name="country"
                                value={country}
                                onChange={(e) =>
                                    setCountry(e.target.value as TCountry)
                                }
                            >
                                {countriesArr.map((country) => (
                                    <MenuItem value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <FormControl
                                fullWidth
                                variant="outlined"
                            >
                                <InputLabel id="disciplines-label">
                                    Disciplines
                                </InputLabel>
                                <Select
                                    label="Disciplines"
                                    fullWidth
                                    variant="outlined"
                                    name="disciplines"
                                    input={
                                        <OutlinedInput label="Disciplines" />
                                    }
                                    multiple
                                    value={selectedDisciplines.map((id) => {
                                        const foundDiscipline = discipline.find(
                                            (disc) => disc.id === id
                                        );
                                        return foundDiscipline
                                            ? foundDiscipline.name
                                            : "";
                                    })}
                                    onChange={handleDisciplinesChange}
                                >
                                    {discipline.map((disc, index) => (
                                        <MenuItem
                                            key={index}
                                            value={disc.name}
                                        >
                                            {disc.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                label="Club"
                                fullWidth
                                variant="outlined"
                                name="adjacentClub"
                                value={adjacentClub}
                                onChange={(e) =>
                                    setAdjacentClub(e.target.value as string)
                                }
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
    );
}

export default PutParticipantDialog;