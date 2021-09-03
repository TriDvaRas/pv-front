import { RoundProps } from "react-brackets";

export interface IPlayer {
    id: number;
    name: string;
    username: string;
    tag: string;
}
export interface IGame {
    id: number;
    players: IPlayer[]
    bracket: IBracket;
}
export interface IBracket {
    size: 8 | 4 | 2;
    teams: ITeam[];
}
export interface ITeam {
    id: number;
    title: string;
    players: IPlayer[];
    wins: number;
    lost?: boolean;
}