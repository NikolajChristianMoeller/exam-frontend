import { TResultsType } from "./discipline.type.ts";
import { TAgeGroup, TGender } from "./participant.type.ts";

type TResult = {
    id: number;
    disciplineName: string;
    resultsType: TResultsType;
    resultValue: string;
    resultDate: string;
    participantName: string;
    ageGroup: TAgeGroup;
    gender: TGender;
    adjacentClub: string;
};

type TCreateResult = {
    id?: number | null;
    participantId: number;
    disciplineId: number;
    resultDate: string;
    hours: number;
    minutes: number;
    seconds: number;
    hundredths: number;
    meters: number;
    centimeters: number;
    points: number;
};

export type { TResult, TCreateResult };