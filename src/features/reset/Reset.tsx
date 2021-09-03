/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { IBracket, IPlayer, ITeam } from "../../@types/custom";
import { players as allPlayers } from "../../features/fakedb";
import useLocalStorage from "../storage/useLocalStorage";
interface Props {

}
export default function Reset(props: Props) {
    const [nonPlayers, setNonPlayers] = useLocalStorage<IPlayer[]>(`nonSelectedPlayers`, allPlayers)
    const [players, setPlayers] = useLocalStorage<IPlayer[]>(`selectedPlayers`, [])
    const [teamsCount, setTeamsCount] = useLocalStorage<'a' | 8 | 4 | 2>(`teamsCount`, 'a')
    const [teams, setTeams] = useLocalStorage<ITeam[]>(`teams`, [])
    const [bracket, setBracket] = useLocalStorage<IBracket | null>(`bracket`, null)
    useEffect(() => {
        setNonPlayers(allPlayers)
        setPlayers([])
        setTeamsCount('a')
        setTeams([])
        setBracket(null)
    }, [setBracket, setNonPlayers, setPlayers, setTeams, setTeamsCount])
    return <Redirect to='/players' />
}