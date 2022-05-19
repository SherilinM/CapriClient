import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import ResultsCommerces from "../../components/ResultsCommerces/ResultsCommerces"
import UserEditForm from "../../components/UserEditForm/UserEditForm"
import { AuthContext } from "../../context/auth.context"
import commerceService from "../../services/commerce.service"
import userService from "../../services/user.service"
import './UserProfile.css'


const UserProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [userDetails, setUserDetails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const [showImageModal, setShowModal] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)

    useEffect(() => {
        if (user) {
            getDetails()
        }
    }, [user])

    const getDetails = () => {

        userService
            .getUserDetails()
            .then(({ data }) => {
                console.log('userdata --->', data)
                setUserDetails(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }


    const handleEditUserBtn = () => setShowUserModal(true)
    const handleSaveUserBtn = () => setShowUserModal(false)

    return (

        <div className="userContainer">
            <Container >
                <Row className="userInfo">
                    <Col>
                        <Row className="align-items-center">
                            <Col className="col" md={{ span: 2, offset: 3 }}>
                                {/* <img className="profileImg" src={userDetails?.profileImg} alt='profile'></img> */}
                            </Col>
                            <Col className="col" md={6}>
                                <h1 className="name">{userDetails?.firstName} {userDetails?.lastName}</h1>
                                <Button className="editBtn myBtn" onClick={handleEditUserBtn}>Edit profile</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <h2 className="section-title">Favorite Commerces</h2>
                <Row>
                    {isLoaded && <ResultsCommerces commerces={userDetails?.favCommerce} width={7} />}
                </Row>

                <Modal show={showUserModal} onHide={handleSaveUserBtn} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoaded && <UserEditForm {...userDetails} closeModal={handleSaveUserBtn} refreshDetails={getDetails} />}
                    </Modal.Body>
                </Modal>

            </Container >
        </div>
    )
}

export default UserProfilePage