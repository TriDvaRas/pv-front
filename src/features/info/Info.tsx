import { Image } from 'react-bootstrap'
import qrPath from '../../assets/images/pvfbrcqr.png'
interface Props {

}
export default function Info(props: Props) {
    return <Image src={qrPath} rounded />
}