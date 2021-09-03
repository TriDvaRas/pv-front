import { RenderSeedProps, Seed, SeedItem } from "react-brackets";
import { IBracket, ITeam } from "../../@types/custom";
import useLocalStorage from "../storage/useLocalStorage";
import PlayerBadge from "./PlayerBadge";
import './seed.sass';
interface Props extends RenderSeedProps {
    onSelect: (team?: ITeam, team1?: ITeam, team2?: ITeam) => any
}
export default function CustomSeed({ seed, breakpoint, roundIndex, seedIndex, onSelect }: Props) {
    const [team1, team2] = seed as [ITeam | undefined, ITeam | undefined]
    const colors = team1 && team2 && team1?.wins !== team2?.wins ? (
        team1?.wins > team2?.wins ? [`green`, `red`] : [`red`, `green`]
    ) : null

    function teamSeed(color: string, team: ITeam | undefined) {
        return team ?
            <div
                style={{
                    padding: `0.35em 0.65em`,
                    marginRight: 'auto',
                }}
                className='d-flex justify-content-between  w-100  my-auto text-center my-seed'
                onClick={() => onSelect(team, team1, team2)}
            >
                <div style={{ overflow: 'hidden' }}>
                    <span style={{
                        color,
                        marginRight: 'auto',
                        display: 'contents',
                        overflow: 'hidden'
                    }} className='align-middle fs-4'>
                        {team.title || `\u200B`}
                    </span>
                </div>
                <div style={{}}>
                    <PlayerBadge player={team.players[0]} />
                    <PlayerBadge player={team.players[1]} className={`ms-2 me-n2`} />
                </div>
            </div>
            : <div style={{}} className='my-seed'>{`\u200B`}</div>
    }
    return (
        <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 30, innerWidth: `400px` }} >
            <SeedItem>
                {teamSeed(colors ? colors[0] : ``, team1)}
                {teamSeed(colors ? colors[1] : ``, team2)}
            </SeedItem>
        </Seed>
    );
};


