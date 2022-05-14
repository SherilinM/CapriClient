import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import commerceService from "../../services/commerce.service"
import './CommerceDetails.css'
import { Container, Row, Col, Button } from "react-bootstrap"
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom"
import commentService from "../../services/comments.service"
import FavBoton from "../FavBoton/FavBoton"


const CommerceDetails = () => {

    const [commerceDetails, setCommerceDetails] = useState()
    const [comments, setComments] = useState()

    const { commerce_id } = useParams()

    useEffect(() => {

        getCommerceDetails()
        getComments()

    }, [])

    const getCommerceDetails = () => {
        commerceService
            .getOneCommerce(commerce_id)
            .then(({ data }) => {
                setCommerceDetails(data)
            })
            .catch(err => console.log(err))
    }

    const getComments = () => {
        commentService
            .getOneCommerceComments(commerce_id)
            .then(({ data }) => {
                setComments(data)
            })
            .catch(err => console.log(err))
    }


    return (

        !commerceDetails
            ?
            <Loader />
            :
            <Container>
                <h1>Details {commerceDetails.title}</h1>
                <hr />
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <h3>Description</h3>
                        <p>{commerceDetails.description}</p>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <img style={{ width: '100%' }} src={commerceDetails.imageUrl} alt={commerceDetails.title} />
                    </Col>
                    <Col md={{ span: 4, offset: 1 }}>
                        <h3>Comments</h3>
                        <ul>

                            {
                                !comments ? <Loader /> :
                                    comments.map(eachComment => {
                                        return (
                                            <li key={eachComment._id}>{eachComment.comment}</li>
                                        )
                                    })
                            }
                        </ul>
                    </Col>

                    <Button variant="dark"><Link className="myBtn" to="/commerces">Back</Link></Button>
                    <FavBoton btnState={'hola'}></FavBoton>

                </Row>

            </Container>
    )
}




export default CommerceDetails