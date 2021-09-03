/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { IPlayer, ITeam } from "../@types/custom";
import DropRow from "../features/drop/DropRow";
import { players as allPlayers } from "../features/fakedb";
import useLocalStorage from "../features/storage/useLocalStorage";
import { floorPow2 } from "../util/numbers";
import { shuffle } from "../util/random";
type ColId = 'nonPlayers' | 'players'
interface Props {

}
export default function PlayersMenu(props: Props) {
    const [nonPlayers, setNonPlayers] = useLocalStorage<IPlayer[]>(`nonSelectedPlayers`, allPlayers)
    const [players, setPlayers] = useLocalStorage<IPlayer[]>(`selectedPlayers`, [])
    const arrays = { nonPlayers, players }
    const [teamsCount, setTeamsCount] = useLocalStorage<'a' | 8 | 4 | 2>(`teamsCount`, 'a')
    const [errorMsg, setErrorMsg] = useState<string | undefined>('')
    const [teams, setTeams] = useLocalStorage<ITeam[]>(`teams`, [])
    const [redirect, setRedirect] = useState<any>(null)
    function onDragEnd(result: DropResult) {
        const { source: src, destination: dest } = result;
        // dropped outside the list
        if (!dest)
            return;
        let sArr = arrays[src.droppableId as ColId]
        let dArr = arrays[dest.droppableId as ColId]
        const movedItem = sArr[src.index]
        sArr.splice(src.index, 1)
        dArr.splice(dest.index, 0, movedItem);
        (src.droppableId === 'nonPlayers' ? setNonPlayers : setPlayers)(sArr);
        (dest.droppableId === 'nonPlayers' ? setNonPlayers : setPlayers)(dArr);
        updateErrors()
    }
    function updateErrors() {
        let msg = undefined
        const playersCount = players.length

        if (teamsCount !== 'a' && (playersCount < teamsCount * 2))
            msg = `Not enough players for ${teamsCount} teams. Need ${teamsCount * 2 - playersCount} more`
        if (playersCount < 4)
            msg = ` `
        setErrorMsg(msg)
    }
    function genTeams() {
        const pCnt = players.length
        const tCnt = teamsCount === 'a' ? floorPow2(pCnt / 2) : teamsCount
        const sPlayers = shuffle(players)
        const teams: ITeam[] = []
        for (let i = 0; i < tCnt; i++)
            teams.push({
                id:i,
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
        setRedirect(<Redirect to='/teams' />)
    }
    function addGuest() {
        const guests = [...players.filter(x => x.name.includes(`Guest`)), ...nonPlayers.filter(x => x.name.includes(`Guest`))]
        const minId = _.min(guests.map(x => x.id)) || 0
        setPlayers([...players, {
            id: minId - 1,
            name: `Guest ${-minId}`,
            username: `guest${-minId}`,
            tag: `G${-minId}`
        }])
    }
    useEffect(updateErrors, [teamsCount, players.length, nonPlayers])
    return <DragDropContext onDragEnd={onDragEnd}>
        <Row>
            <Col sm={12} lg={4}>
                <DropRow id='nonPlayers' title='People' items={nonPlayers} nameField='name' saturation={30} />
            </Col>
            <Col sm={12} lg={4}>
                <DropRow id='players' title='Players' items={players} nameField='name' saturation={65} />
            </Col>
            <Col sm={12} lg={4}>
                <Card
                    className='bg-dark text-light border border-dark h-100 my-3 p-1'
                >
                    <Card.Header className=''>
                        <h3 className='mb-0'>Menu</h3>
                    </Card.Header>
                    <Card.Body>
                        <h4 >Players</h4>
                        <Button variant={`secondary`} size='lg' disabled={nonPlayers.length === 0}
                            onClick={() => { setPlayers([...players, ...nonPlayers]); setNonPlayers([]); }}
                        >Add all</Button>
                        <Button variant={`secondary`} size='lg' disabled={players.length === 0}
                            onClick={() => { setNonPlayers([...nonPlayers, ...players]); setPlayers([]); }} className='mx-2'
                        >Remove all</Button>
                        <Button variant={`secondary`} size='lg'
                            onClick={addGuest}
                        >Add Guest</Button>
                        <h4>Teams</h4>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant={teamsCount === 'a' ? `primary` : `secondary`} size='lg' active={teamsCount === 'a'} onClick={() => setTeamsCount('a')}>Auto</Button>
                            <Button variant={teamsCount === 8 ? `primary` : `secondary`} size='lg' active={teamsCount === 8} onClick={() => setTeamsCount(8)}>8</Button>
                            <Button variant={teamsCount === 4 ? `primary` : `secondary`} size='lg' active={teamsCount === 4} onClick={() => setTeamsCount(4)}>4</Button>
                            <Button variant={teamsCount === 2 ? `primary` : `secondary`} size='lg' active={teamsCount === 2} onClick={() => setTeamsCount(2)}>2</Button>
                        </ButtonGroup>

                        <h5>{`\u200B`} </h5>
                        <Button variant={`primary`} size='lg' disabled={!!errorMsg} onClick={genTeams}>Gen Teams</Button>
                        <br />
                        {errorMsg}

                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {redirect}
    </DragDropContext>
}