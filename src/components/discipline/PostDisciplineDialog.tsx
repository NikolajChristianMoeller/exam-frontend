import {
    TDisciplineCreate,
    TResultsType
} from "../../types/discipline.type.ts";

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
    TextField
} from "@mui/material";
import useParticipant from "../../hooks/useParticipant.tsx";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingSpinner from "../LoadingSpinner.tsx";
import { useState } from "react";

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
    const { participants, isLoading: participantsLoading } = useParticipant();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [resultsType, setResultsType] = useState<TResultsType>("POINTS");
    const [selectedParticipants, setSelectedParticipants] = useState<number[]>(
        []
    );

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
                                label="Discipline Name"
                                fullWidth
                                variant="outlined"
                                name="name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value as string)
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                label="Description"
                                fullWidth
                                variant="outlined"
                                name="description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value as string)
                                }
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
                                onChange={(e) =>
                                    setResultsType(
                                        e.target.value as TResultsType
                                    )
                                }
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
                                        setSelectedParticipants(
                                            e.target.value as number[]
                                        )
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