import './CommerceCard.css'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LikeBtn from '../LikeBtn/LikeBtn'
import FavBtn from '../FavBtn/FavBtn'

const imgOrange = 'https://blindfacts.com/wp-content/uploads/2018/01/The-Color-Orange-1024x640.jpg'

const CommerceCard = ({ _id, imageUrl, title, description }) => {

    return (
        <Link to={`/details/${_id}`}>
            <Card className="bg-white text-white commerceCard">
                <div className="myContainer">
                    <Card.Img src={imageUrl} alt="Card image" className="ImgContain imgCommerce" />
                    <div alt="Card image" className="overlayImg" />
                </div>
                <Card.ImgOverlay className="d-flex align-items-end">
                    <div className="down-wrapper px-3 pb-2">
                        <Card.Title className='cardText fw-bolder display-5'>{title}</Card.Title>
                        <div className="action-icons d-flex">
                            <FavBtn className="pr-5"></FavBtn>
                            <LikeBtn></LikeBtn>
                        </div>
                    </div>
                </Card.ImgOverlay>
            </Card>
        </Link>
    )
}

export default CommerceCard