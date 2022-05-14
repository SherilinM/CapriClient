import './CommerceCard.css'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const imgOrange = 'https://blindfacts.com/wp-content/uploads/2018/01/The-Color-Orange-1024x640.jpg'

const CommerceCard = ({ _id, imageUrl, title, description }) => {

    return (
        <Link to={`/details/${_id}`}>
            <Card className="bg-white text-white commerceCard">
                <div className="myContainer">
                    <Card.Img src={imageUrl} alt="Card image" className="ImgContain imgCommerce" />
                    <Card.Img src={imgOrange} alt="Card image" className="overlayImg" />
                </div>
                <Card.ImgOverlay>
                    <Card.Title className='cardText'>{title}</Card.Title>
                    <Card.Text className='cardText'>{description}</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </Link>
    )
}

export default CommerceCard