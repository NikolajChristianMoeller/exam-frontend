import useParticipant from "../../hooks/useParticipant.tsx";
import { useEffect, useState } from "react";
import {
    TDisciplineUpdate,
    TParticipantsInDiscipline,
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
import LoadingSpinner from "../LoadingSpinner.tsx";
import OutlinedInput from "@mui/material/OutlinedInput";

type TPostDisciplineDialogProps = {
    open: boolean;
    handleClose: () => void;
    updateDiscipline: (
        updatedDiscipline: TDisciplineUpdate,
        id: number
    ) => Promise<void>;
    resultsTypeArr: TResultsType[];
    selectedDiscipline: TDisciplineUpdate;
};

/**
 * Put discipline dialog
 * @param open
 * @param handleClose
 * @param updateDiscipline
 * @param resultsTypeArr
 * @param selectedDiscipline
 * @constructor
 */
function PutDisciplineDialog({
                                 open,
                                 handleClose,
                                 updateDiscipline,
                                 resultsTypeArr,
                                 selectedDiscipline
                             }: TPostDisciplineDialogProps) {
    const { participants, isLoading: participantsLoading } = useParticipant();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [resultsType, setResultsType] = useState<TResultsType>("POINTS");
    const [selectedParticipants, setSelectedParticipants] = useState<number[]>(
        []
    );

    useEffect(() => {
        if (selectedDiscipline) {
            setName(selectedDiscipline.name);
            setDescription(selectedDiscipline.description);
            setResultsType(selectedDiscipline.resultsType);
            if (selectedDiscipline.participants) {
                setSelectedParticipants(
                    selectedDiscipline.participants.map((part) => part.id)
                );
            }
        }
    }, [selectedDiscipline]);

    const handleUpdate = () => {
        const updatedDiscipline: TDisciplineUpdate = {
            name,
            description,
            resultsType,
            participants: selectedParticipants
                .map((id) => {
                    const participant = participants.find(
                        (part) => part.id === id
                    );
                    return participant
                        ? {
                            id: participant.id,
                            fullName: participant.fullName,
                            age: participant.age,
                            gender: participant.gender,
                            adjacentClub: participant.adjacentClub,
                            ageGroup: participant.ageGroup,
                            country: participant.country,
                            disciplines: []
                        }
                        : undefined;
                })
                .filter(
                    (participant) => participant !== undefined
                ) as TParticipantsInDiscipline[]
        };

        updateDiscipline(updatedDiscipline, selectedDiscipline.id as number);

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
                                disabled
                                value={name}
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
                    <Button onClick={handleUpdate}>update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PutDisciplineDialog;