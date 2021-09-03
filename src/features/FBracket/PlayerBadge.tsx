import { Badge } from "react-bootstrap"
import { IPlayer } from "../../@types/custom"
import { randomSeededColor } from "../../util/colors"


export default function PlayerBadge(props: { player: IPlayer, className?: string }) {
    const { player } = props
    return <Badge
        bg=''
        pill
        className={`fs-4    text-center ${props.className}`}
        style={{ backgroundColor: randomSeededColor(player.name, 65), width: `3em` }}
        title={player.name}
    >
        {player.tag}
    </Badge>
}