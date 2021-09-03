/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, Row } from 'react-bootstrap';
import { Bracket } from 'react-brackets';
import { IBracket, ITeam } from '../@types/custom';
import CustomSeed from '../features/FBracket/CustomSeed';
import useLocalStorage from '../features/storage/useLocalStorage';
import { bracketToRounds } from '../util/bracket';

interface Props {

}
export default function BracketMenu(props: Props) {
    const [bracket, setBracket] = useLocalStorage<IBracket | null>(`bracket`, null)
    const rounds = bracketToRounds(bracket)


    function onTeamSelect(team?: ITeam, team1?: ITeam, team2?: ITeam) {
        if (!team || !team1 || !team2) return
        if (!bracket) return
        const teams = [...bracket.teams]
        if (!teams) return
        const selectedTeam = team.id === team1.id ? team1 : team2
        const pairedTeam = team.id === team2.id ? team1 : team2
        const selectedTeamI = teams.map(x => x.id).indexOf(selectedTeam.id)
        const pairedTeamI = teams.map(x => x.id).indexOf(pairedTeam.id)

        if (teams[selectedTeamI].wins === teams[pairedTeamI].wins) {
            teams[selectedTeamI].wins++
            teams[pairedTeamI].lost = true
            setBracket({ ...bracket, teams })
            console.log(bracket);
        }
        else if (teams[selectedTeamI].wins === teams[pairedTeamI].wins - 1 && !teams[pairedTeamI].lost) {
            teams[selectedTeamI].wins++
            teams[selectedTeamI].lost = false
            teams[pairedTeamI].wins--
            teams[pairedTeamI].lost = true
            setBracket({ ...bracket, teams })
        }
    }

    return <Row>
        <Col sm={12}>
            <Card bg='dark' className='bg-dark text-light border border-dark h-100 my-3 p-1'>
                <Card.Header className=''>
                    <h3 className='mb-0'>Bracket</h3>
                </Card.Header>
                <Card.Body>
                    <Bracket rounds={rounds} roundClassName={`bracket-max-width-${rounds.length}`} bracketClassName='bg-dark w-100' renderSeedComponent={(p) => CustomSeed({ ...p, onSelect: onTeamSelect })} />
                </Card.Body>
            </Card>
        </Col>
        {/* <Col sm={4}>
            <Card bg='dark' className='bg-dark text-light border border-dark h-100 my-3 p-1'>
                <Card.Header className=''>
                    <h3 className='mb-0'>Menu</h3>
                </Card.Header>
                <Card.Body>
                </Card.Body>
            </Card>
        </Col> */}
    </Row>
}

