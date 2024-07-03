import { ChangeEvent, useState, useEffect } from "react";
import { TCountry, TGender, TParticipantCreateAndUpdate } from "../../types/participant.type.ts";
import { SelectChangeEvent, Button, Select, Grid, MenuItem, DialogTitle, FormControl, InputLabel, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingSpinner from "../LoadingSpinner.tsx";
import useDiscipline from "../../hooks/useDiscipline.tsx";

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
    const [selectedDisciplines, setSelectedDisciplines] = useState<number[]>([]);
    const [adjacentClub, setAdjacentClub] = useState("");
    const {discipline, isLoading: disciplineLoading} = useDiscipline();

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

    const handleFullNameChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFullName(e.target.value);
    };

    const handleAgeChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAge(Number(e.target.value));
    };

    const handleGenderChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setGender(e.target.value as TGender);
    };

    const handleCountryChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCountry(e.target.value as TCountry);
    };

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

    const handleAdjacentClubChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAdjacentClub(e.target.value as string);
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
                <DialogTitle>Update participant</DialogTitle>
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
                                label="FullName"
                                fullWidth
                                variant="outlined"
                                name="fullName"
                                value={fullName}
                                onChange={handleFullNameChange}
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
                                onChange={handleAgeChange}
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
                                onChange={handleGenderChange}
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
                                onChange={handleCountryChange}
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
                                onChange={handleAdjacentClubChange}
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