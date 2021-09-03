import { shuffle } from "lodash";
import { RoundProps } from "react-brackets";
import { IBracket, ITeam } from "../@types/custom";

export function bracketToRounds(bracket: IBracket | null): RoundProps[] {
    if (!bracket)
        return []
    const rounds: RoundProps[] = []
    let roundI = 1
    if (bracket.size >= 8) {
        let teamsCopy = [...bracket.teams]
        let roundSeeds: [ITeam | undefined, ITeam | undefined][] = []
        for (let i = 0; i < 4; i++)
            roundSeeds.push([teamsCopy.shift(), teamsCopy.shift()])
        rounds.push({
            title: `Round ${roundI++}`,
            seeds: [...roundSeeds]
        })
    }
    if (bracket.size >= 4) {
        let teamsCopy = [...bracket.teams].filter(x => bracket.size === 4 || x.wins > 0)
        let roundSeeds: [ITeam | undefined, ITeam | undefined][] = []
        for (let i = 0; i < 2; i++)
            roundSeeds.push([teamsCopy.shift(), teamsCopy.shift()])
        rounds.push({
            title: `Round ${roundI++}`,
            seeds: [...roundSeeds]
        })
    }
    if (bracket.size >= 2) {
        let teamsCopy = [...bracket.teams].filter(x => bracket.size === 2 || (x.wins > (bracket.size === 4 ? 0 : 1)))
        let roundSeeds: [ITeam | undefined, ITeam | undefined][] = []
        for (let i = 0; i < 1; i++)
            roundSeeds.push([teamsCopy.shift(), teamsCopy.shift()])
        rounds.push({
            title: `Round ${roundI++}`,
            seeds: [...roundSeeds]
        })
    }
    return rounds
}
export function teamsToBracket(teams: ITeam[]): IBracket {
    return {
        size: (teams.length - (teams.length % 2)) as (8 | 4 | 2),
        teams: shuffle(teams).filter(x => x.title !== `Unassigned`)
    }
}