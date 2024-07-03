import { ChangeEvent, useState } from "react";
import { TDisciplineCreate, TResultsType } from "../../types/discipline.type.ts";
import { SelectChangeEvent, Button, Select, Grid, MenuItem, DialogTitle, FormControl, InputLabel, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingSpinner from "../LoadingSpinner.tsx";
import useParticipant from "../../hooks/useParticipant.tsx";

type TPostDisciplineDialogProps = {
    open: boolean;
    handleClose: () => void;
    createDiscipline: (newDiscipline: TDisciplineCreate) => Promise<void>;
    resultsTypeArr: TResultsType[];
};

/**
 * Post discipline dialog
 * @param open
 * @param handleClose
 * @param createDiscipline
 * @param resultsTypeArr
 * @constructor
 */
function PostDisciplineDialog({
                                  open,
                                  handleClose,
                                  createDiscipline,
                                  resultsTypeArr
                              }: TPostDisciplineDialogProps) {
    const {participants, isLoading: participantsLoading} = useParticipant();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [resultsType, setResultsType] = useState<TResultsType>("POINTS");
    const [selectedParticipants, setSelectedParticipants] = useState<number[]>(
        []
    );

    const handleDisciplineNameChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setName(e.target.value as string);
    };

    const handleSetDescription = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setDescription(e.target.value as string);
    };

    const handleResultsTypeChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setResultsType(e.target.value as TResultsType);
    };

    const handleParticipantsChange = (e: SelectChangeEvent<number[]>) => {
        setSelectedParticipants(e.target.value as number[]);
    };

    const handleCreate = () => {
        const newDiscipline: TDisciplineCreate = {
            name,
            description,
            resultsType,
            participants: selectedParticipants.map((id) => ({ id }))
        };

        createDiscipline(newDiscipline);
        setName("");
        setDescription("");
        setResultsType("POINTS");
        setSelectedParticipants([]);

        handleClose();
    };

    return (
        <>
            {participantsLoading && <LoadingSpinner />}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>Create new Discipline</DialogTitle>
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
                                label="Disciplin Name"
                                fullWidth
                                variant="outlined"
                                name="name"
                                value={name}
                                onChange={(e) => handleDisciplineNameChange(e)}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                label="Description "
                                fullWidth
                                variant="outlined"
                                name="description"
                                value={description}
                                onChange={(e) => handleSetDescription(e)}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                select
                                label="Results Type"
                                fullWidth
                                variant="outlined"
                                name="resultsType"
                                value={resultsType}
                                onChange={(e) => handleResultsTypeChange(e)}
                            >
                                {resultsTypeArr.map((resultsType) => (
                                    <MenuItem value={resultsType}>
                                        {resultsType}
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
                                    Participants
                                </InputLabel>
                                <Select
                                    label="Participants"
                                    fullWidth
                                    variant="outlined"
                                    name="participants"
                                    input={
                                        <OutlinedInput label="Participants" />
                                    }
                                    multiple
                                    value={selectedParticipants}
                                    onChange={(e) =>
                                        handleParticipantsChange(e)
                                    }
                                >
                                    {participants.map((part, index) => (
                                        <MenuItem
                                            key={index}
                                            value={part.id}
                                        >
                                            {part.fullName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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

export default PostDisciplineDialog;