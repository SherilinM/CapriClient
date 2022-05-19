import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import commerceService from "../../services/commerce.service"
import { Container, Row, Col, Modal, Button, Card, Badge } from "react-bootstrap"
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import commentService from "../../services/comments.service"
import userService from "../../services/user.service"
import FavBtn from "../FavBtn/FavBtn"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import CommerceEditForm from "../CommerceEditForm/CommerceEditForm"
import './CommerceDetails.css'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress } from 'react-google-places-autocomplete';
import LikeBtn from "../LikeBtn/LikeBtn"
import CommentForm from "../CommenteForm/CommentForm"
import Comment from "../Comment/Comment"

const CommerceDetails = () => {

    const [commerceDetails, setCommerceDetails] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isMine, setIsMine] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [comments, setComments] = useState()


    const { commerce_id } = useParams()

    const { user, isLoggedIn } = useContext(AuthContext)

    const handleEditBtn = () => setShowModal(true)
    const handleSaveBtn = () => setShowModal(false)


    useEffect(() => {
        getCommerceDetails()
        getComments()
    }, [])

    const getCommerceDetails = () => {
        commerceService
            .getOneCommerce(commerce_id)
            .then(({ data }) => {
                setCommerceDetails(data)
                setIsLoaded(true)
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

    const checkIfMine = () => {
        if (commerceDetails?.owner === user?._id) setIsMine(true)
    }

    useEffect(() => {
        checkIfMine()
    }, [user, commerceDetails])


    const [commerceAddress, setCommerceAdress] = useState()

    useEffect(() => {
        /*get address*/
        geocodeByAddress(commerceDetails?.title)
            .then(results => {
                setCommerceAdress(results[0].formatted_address)
            })

    }, [])

    useEffect(() => {
        console.log("change")
    }, [commerceAddress])




    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={15}
            center={{ lat: commerceDetails?.address.location.coordinates[0], lng: commerceDetails?.address.location.coordinates[1] }}
        >
            {props.isMarkerShown && <Marker position={{ lat: commerceDetails?.address.location.coordinates[0], lng: commerceDetails?.address.location.coordinates[1] }} />}
        </GoogleMap>
    ))


    return (

        !commerceDetails
            ?
            <Loader />
            :
            <div className="wrapper bg-obd text-white">
                <Container className="">
                    <Link to="/commerces" className="text-decoration-none">
                        <div className="back-btn small pb-4 ">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M9 19 2 12 9 5 10.425 6.4 5.825 11H22V13H5.825L10.4 17.6Z" /></svg>
                            &nbsp;&nbsp;Back to list
                        </div>
                    </Link>
                    <Row>
                        <Col className="left-data pb-4" md={5}>
                            <div className="commerce-title pb-4">
                                <div className="d-flex">
                                    <div className="commerce-name pl-2">
                                        <h3>
                                            {commerceDetails.title}
                                            {isMine &&
                                                <>
                                                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                                                    <span className="edit-icon" onClick={handleEditBtn}><span className="material-symbols-outlined">edit</span>edit</span>
                                                </>
                                            }
                                        </h3>
                                        <small className="text-secondary">{commerceAddress}</small>
                                    </div>

                                </div>
                            </div>

                            <Card.Img src={commerceDetails.imageUrl} alt="Card image" className="ImgContain imgCommerce h-50 pb-4" />
                            <p className="text-secondary">{commerceDetails.description}</p>

                            <div className="commerce-icons">
                                <LikeBtn commerceId={commerceDetails._id} />
                                <FavBtn commerce_id={commerceDetails._id} />
                            </div>
                        </Col>
                        <Col className="right-data" md={7}>
                            <MyMapComponent
                                isMarkerShown
                                googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyCiKYVoClGGVdwlnHDWoSgF4TEDrk-38f4&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </Col>
                    </Row>

                    <div className="comments-section">
                        <h3>Comments</h3>
                        <ul>
                            {
                                !comments ? <Loader /> :
                                    comments.map(eachComment => {
                                        return (
                                            <Comment key={eachComment._id} {...eachComment}></Comment>
                                        )
                                    })
                            }
                        </ul>
                    </div>

                    {isLoggedIn && <CommentForm getComments={getComments} />}

                    <Modal show={showModal} onHide={handleSaveBtn} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Edit commerce information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CommerceEditForm closeModal={handleSaveBtn} {...commerceDetails} commerce_id={commerce_id} refreshDetails={getCommerceDetails} />
                        </Modal.Body>
                    </Modal>
                </Container>

            </div>
    )
}






export default CommerceDetails