/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { IBracket, IPlayer, ITeam } from "../@types/custom";
import DropRowTeam from "../features/drop/DropRowTeam";
import { players as allPlayers } from "../features/fakedb";
import useLocalStorage from "../features/storage/useLocalStorage";
import { teamsToBracket } from "../util/bracket";
import { floorPow2 } from "../util/numbers";
import { shuffle } from "../util/random";
interface Props {

}
export default function TeamsMenu(props: Props) {
    const [nonPlayers, setNonPlayers] = useLocalStorage<IPlayer[]>(`nonSelectedPlayers`, allPlayers)
    const [players, setPlayers] = useLocalStorage<IPlayer[]>(`selectedPlayers`, [])
    const [teamsCount, setTeamsCount] = useLocalStorage<'a' | 8 | 4 | 2>(`teamsCount`, 'a')
    const [errorMsg, setErrorMsg] = useState<string | undefined>('')
    const [teams, setTeams] = useLocalStorage<ITeam[]>(`teams`, [])
    const [bracket, setBracket] = useLocalStorage<IBracket | null>(`bracket`, null)
    const [redirect, setRedirect] = useState<any>(null)
    function onDragEndTeams(result: DropResult) {
        const { source: src, destination: dest } = result;
        // dropped outside the list
        if (!dest)
            return;
        let sArr = teams.find(x => x.title === src.droppableId) as ITeam
        let dArr = teams.find(x => x.title === dest.droppableId) as ITeam
        const movedItem = sArr.players[src.index]
        sArr.players.splice(src.index, 1)
        dArr.players.splice(dest.index, 0, movedItem);
        setTeams(teams)
        updateErrors()
    }
    function updateErrors() {
        let msg = undefined
        if (teams.find(x => x.players.length !== 2 && x.title !== `Unassigned`))
            msg = `All teams must have exactly 2 players`
        setErrorMsg(msg)
    }
    function genTeams() {
        setTeams([])
        const pCnt = players.length
        const tCnt = teamsCount === 'a' ? floorPow2(pCnt / 2) : teamsCount
        const sPlayers = shuffle(players)
        const teams: ITeam[] = []
        for (let i = 0; i < tCnt; i++)
            teams.push({
                id: i,
                title: `Team ${i + 1}`,
                players: [sPlayers.shift() as IPlayer, sPlayers.shift() as IPlayer],
                wins: 0,
            })
        if (sPlayers.length > 0)
            teams.push({
                id: 3425,
                title: `Unassigned`,
                players: sPlayers,
                wins: 0,
            })
        setTeams(teams)
    }
    function genBracket() {
        setBracket(teamsToBracket(teams))
        setRedirect(<Redirect to='/bracket' />)
    }
    function handleTeamTitle(teamId: number, newValue: string) {
        const team = teams.find(x => x.id === teamId) as ITeam
        team.title = newValue
        setTeams(teams)
    }
    useEffect(updateErrors, [teamsCount, players.length, nonPlayers, teams])


    return <Row>
        <DragDropContext onDragEnd={onDragEndTeams}>
            <Col sm={12} lg={8}>
                <Card bg='dark-850' className=' my-3'>
                    <Card.Header className='bg-dark' >
                        <h3 className=''>Teams</h3>
                    </Card.Header>
                    <Card.Body>
                        <Row >
                            {teams.map((team, i) => <Col key={i} sm={12} lg={team.title !== `Unassigned` ? 6 : 12} className='my-2'>
                                <DropRowTeam id={team.title} team={team} nameField='name' saturation={65} onTitleChange={(val) => handleTeamTitle(team.id, val)} />
                            </Col>)}
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </DragDropContext>
        <Col>
            <Card
                className='bg-dark text-light border border-dark my-3 p-1'
            >
                <Card.Header className=''>
                    <h3 className='mb-0'>Menu</h3>
                </Card.Header>
                <Card.Body>
                    <h4 >Teams</h4>
                    <ButtonGroup >
                        <Button variant={`secondary`} size='lg' onClick={genTeams} className='mx-2'>Shuffle</Button>
                    </ButtonGroup>

                    <h5>{`\u200B`} </h5>
                    <Button variant={`primary`} size='lg' disabled={!!errorMsg} onClick={genBracket}>Gen Bracket</Button>
                    <br />
                    {errorMsg}

                </Card.Body>
            </Card>
        </Col>
        {redirect}
    </Row>
}