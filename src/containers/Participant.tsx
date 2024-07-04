import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import useParticipant from "../hooks/useParticipant.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PostParticipantDialog from "../components/participant/PostParticipantDialog.tsx";
import { TCountry, TGender, TParticipant } from "../types/participant.type.ts";
import PutParticipantDialog from "../components/participant/PutParticipantDialog.tsx";

const genderArr: TGender[] = ["MALE", "FEMALE", "OTHER"];

const countriesArr: TCountry[] = [
    "AFGHANISTAN",
    "ALBANIA",
    "ALGERIA",
    "ANDORRA",
    "ANGOLA",
    "ANTIGUA_AND_BARBUDA",
    "ARGENTINA",
    "ARMENIA",
    "AUSTRALIA",
    "AUSTRIA",
    "AZERBAIJAN",
    "BAHAMAS",
    "BAHRAIN",
    "BANGLADESH",
    "BARBADOS",
    "BELARUS",
    "BELGIUM",
    "BELIZE",
    "BENIN",
    "BHUTAN",
    "BOLIVIA",
    "BOSNIA_AND_HERZEGOVINA",
    "BOTSWANA",
    "BRAZIL",
    "BRUNEI",
    "BULGARIA",
    "BURKINA_FASO",
    "BURUNDI",
    "CABO_VERDE",
    "CAMBODIA",
    "CAMEROON",
    "CANADA",
    "CENTRAL_AFRICAN_REPUBLIC",
    "CHAD",
    "CHILE",
    "CHINA",
    "COLOMBIA",
    "COMOROS",
    "CONGO_DEMOCRATIC_REPUBLIC",
    "CONGO_REPUBLIC",
    "COSTA_RICA",
    "COTE_DIVOIRE",
    "CROATIA",
    "CUBA",
    "CYPRUS",
    "CZECH_REPUBLIC",
    "DENMARK",
    "DJIBOUTI",
    "DOMINICA",
    "DOMINICAN_REPUBLIC",
    "ECUADOR",
    "EGYPT",
    "EL_SALVADOR",
    "EQUATORIAL_GUINEA",
    "ERITREA",
    "ESTONIA",
    "ESWATINI",
    "ETHIOPIA",
    "FIJI",
    "FINLAND",
    "FRANCE",
    "GABON",
    "GAMBIA",
    "GEORGIA",
    "GERMANY",
    "GHANA",
    "GREECE",
    "GRENADA",
    "GUATEMALA",
    "GUINEA",
    "GUINEA_BISSAU",
    "GUYANA",
    "HAITI",
    "HONDURAS",
    "HUNGARY",
    "ICELAND",
    "INDIA",
    "INDONESIA",
    "IRAN",
    "IRAQ",
    "IRELAND",
    "ISRAEL",
    "ITALY",
    "JAMAICA",
    "JAPAN",
    "JORDAN",
    "KAZAKHSTAN",
    "KENYA",
    "KIRIBATI",
    "KOREA_NORTH",
    "KOREA_SOUTH",
    "KOSOVO",
    "KUWAIT",
    "KYRGYZSTAN",
    "LAOS",
    "LATVIA",
    "LEBANON",
    "LESOTHO",
    "LIBERIA",
    "LIBYA",
    "LIECHTENSTEIN",
    "LITHUANIA",
    "LUXEMBOURG",
    "MADAGASCAR",
    "MALAWI",
    "MALAYSIA",
    "MALDIVES",
    "MALI",
    "MALTA",
    "MARSHALL_ISLANDS",
    "MAURITANIA",
    "MAURITIUS",
    "MEXICO",
    "MICRONESIA",
    "MOLDOVA",
    "MONACO",
    "MONGOLIA",
    "MONTENEGRO",
    "MOROCCO",
    "MOZAMBIQUE",
    "MYANMAR",
    "NAMIBIA",
    "NAURU",
    "NEPAL",
    "NETHERLANDS",
    "NEW_ZEALAND",
    "NICARAGUA",
    "NIGER",
    "NIGERIA",
    "NORTH_MACEDONIA",
    "NORWAY",
    "OMAN",
    "PAKISTAN",
    "PALAU",
    "PALESTINE",
    "PANAMA",
    "PAPUA_NEW_GUINEA",
    "PARAGUAY",
    "PERU",
    "PHILIPPINES",
    "POLAND",
    "PORTUGAL",
    "QATAR",
    "ROMANIA",
    "RUSSIA",
    "RWANDA",
    "SAINT_KITTS_AND_NEVIS",
    "SAINT_LUCIA",
    "SAINT_VINCENT_AND_THE_GRENADINES",
    "SAMOA",
    "SAN_MARINO",
    "SAO_TOME_AND_PRINCIPE",
    "SAUDI_ARABIA",
    "SENEGAL",
    "SERBIA",
    "SEYCHELLES",
    "SIERRA_LEONE",
    "SINGAPORE",
    "SLOVAKIA",
    "SLOVENIA",
    "SOLOMON_ISLANDS",
    "SOMALIA",
    "SOUTH_AFRICA",
    "SOUTH_SUDAN",
    "SPAIN",
    "SRI_LANKA",
    "SUDAN",
    "SURINAME",
    "SWEDEN",
    "SWITZERLAND",
    "SYRIA",
    "TAIWAN",
    "TAJIKISTAN",
    "TANZANIA",
    "THAILAND",
    "TIMOR_LESTE",
    "TOGO",
    "TONGA",
    "TRINIDAD_AND_TOBAGO",
    "TUNISIA",
    "TURKEY",
    "TURKMENISTAN",
    "TUVALU",
    "UGANDA",
    "UKRAINE",
    "UNITED_ARAB_EMIRATES",
    "UNITED_KINGDOM",
    "UNITED_STATES",
    "URUGUAY",
    "UZBEKISTAN",
    "VANUATU",
    "VATICAN_CITY",
    "VENEZUELA",
    "VIETNAM",
    "YEMEN",
    "ZAMBIA",
    "ZIMBABWE"
];

function Participant() {
    const {
        participants,
        isLoading,
        createParticipant,
        deleteParticipant,
        updateParticipant
    } = useParticipant();
    const [searchText, setSearchText] = useState("");
    const [openPost, setOpenPost] = useState(false);
    const [openPut, setOpenPut] = useState(false);

    const defaultParticipant: TParticipant = {
        id: 0,
        fullName: "",
        age: 0,
        gender: "OTHER",
        ageGroup: "KIDS",
        country: "DENMARK",
        disciplines: [],
        adjacentClub: ""
    };

    const [selectedParticipant, setSelectedParticipant] =
        useState<TParticipant>(defaultParticipant);

    const handleOpenPost = () => {
        setOpenPost(true);
    };

    const handleOpenPut = (id: number) => {
        const selectedRowParticipant = participants.find(
            (participant) => participant.id === id
        );
        if (selectedRowParticipant) {
            setSelectedParticipant(selectedRowParticipant);
            setOpenPut(true);
        }
    };

    const handleClose = () => {
        setOpenPost(false);
        setOpenPut(false);
    };

    const handleDelete = (id: number) => {
        deleteParticipant(id);
    };

    const columns = [
        { field: "fullName", headerName: "Full Name", width: 200 },
        { field: "age", headerName: "Age", width: 100 },
        { field: "gender", headerName: "Gender", width: 100 },
        { field: "adjacentClub", headerName: "Adjacent Club", width: 200 },
        { field: "ageGroup", headerName: "Age Group", width: 150 },
        { field: "country", headerName: "Country", width: 150 },
        { field: "disciplines", headerName: "Disciplines", width: 200 },
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

    const filteredParticipants = participants.filter(
        (participant) =>
            participant.fullName
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            participant.age.toString().includes(searchText) ||
            participant.gender
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            participant.adjacentClub
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            participant.ageGroup
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            participant.country
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            participant.disciplines.some((discipline) =>
                discipline.name.toLowerCase().includes(searchText.toLowerCase())
            )
    );

    const rows = filteredParticipants.map((participant) => ({
        id: participant.id,
        fullName: participant.fullName,
        age: participant.age,
        gender: participant.gender,
        adjacentClub: participant.adjacentClub,
        ageGroup: participant.ageGroup,
        country: participant.country,
        disciplines: participant.disciplines
            .map((discipline) => discipline.name)
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
                    Participants list and Crud operations
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
                        Create new Participant
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
            <PostParticipantDialog
                open={openPost}
                handleClose={handleClose}
                createParticipant={createParticipant}
                genderArr={genderArr}
                countriesArr={countriesArr}
            />
            <PutParticipantDialog
                open={openPut}
                handleClose={handleClose}
                updateParticipant={updateParticipant}
                genderArr={genderArr}
                countriesArr={countriesArr}
                selectedParticipant={selectedParticipant}
            />
        </>
    );
}

export default Participant;