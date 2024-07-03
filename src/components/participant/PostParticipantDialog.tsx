import { ChangeEvent, useState } from "react";
import { TCountry, TGender, TParticipantCreateAndUpdate } from "../../types/participant.type.ts";
import { SelectChangeEvent, Button, Select, Grid, MenuItem, DialogTitle, FormControl, InputLabel, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingSpinner from "../LoadingSpinner.tsx";
import useDiscipline from "../../hooks/useDiscipline.tsx";

type TPostParticipantDialogProps = {
    open: boolean;
    handleClose: () => void;
    createParticipant: (newParticipant: TParticipantCreateAndUpdate) => void;
    genderArr: TGender[];
    countriesArr: TCountry[];
};

/**
 * Post participant dialog
 * @param open
 * @param handleClose
 * @param createParticipant
 * @param genderArr
 * @param countriesArr
 * @constructor
 */
function PostParticipantDialog({
                                   open,
                                   handleClose,
                                   createParticipant,
                                   genderArr,
                                   countriesArr
                               }: TPostParticipantDialogProps) {
    const {discipline, isLoading: disciplineLoading} = useDiscipline();

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<TGender>("OTHER");
    const [country, setCountry] = useState<TCountry>("DENMARK");
    const [selectedDisciplines, setSelectedDisciplines] = useState<number[]>([]);
    const [adjacentClub, setAdjacentClub] = useState("");

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

    const handleDisciplinesChange = (e: SelectChangeEvent<number[]>) => {
        setSelectedDisciplines(e.target.value as number[]);
    };

    const handleAdjacentClubChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAdjacentClub(e.target.value as string);
    };

    const handleCreate = () => {
        const newParticipant: TParticipantCreateAndUpdate = {
            fullName,
            age,
            gender,
            country,
            disciplines: selectedDisciplines.map((id) => ({ id })),
            adjacentClub
        };

        createParticipant(newParticipant);
        setFullName("");
        setAge(0);
        setGender("OTHER");
        setCountry("DENMARK");
        setSelectedDisciplines([]);
        setAdjacentClub("");
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
                <DialogTitle>Create new participant</DialogTitle>
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
                                onChange={(e) => handleFullNameChange(e)}
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
                                onChange={(e) => handleAgeChange(e)}
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
                                onChange={(e) => handleGenderChange(e)}
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
                                onChange={(e) => handleCountryChange(e)}
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
                                    value={selectedDisciplines}
                                    onChange={(e) => handleDisciplinesChange(e)}
                                >
                                    {discipline.map((disc, index) => (
                                        <MenuItem
                                            key={index}
                                            value={disc.id}
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
                                onChange={(e) => handleAdjacentClubChange(e)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PostParticipantDialog;