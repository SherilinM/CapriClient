import { Button } from "react-bootstrap"
import './FavBoton.css'

const FavBoton = ({ btnState, handleFavBtn }) => {

    return (
        <Button className='myBtn' variant="dark" onClick={handleFavBtn}>{btnState}</Button>
    )
}

export default FavBoton