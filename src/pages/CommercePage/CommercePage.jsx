import './CommercePage.css'
import { Container, Row, Col } from 'react-bootstrap'
import CommerceList from '../../components/CommerceList/CommerceList'

const CommercePage = () => {

    const getCat = window.localStorage.getItem('theCat')

    return (
        <div className="bg-dark pt-3">
            <Container className="pt-5 text-white">
                <Row className="d-flex">
                    <Col md={4} className="align-items-start">
                        <div className="sticky-wrapper">
                            <div className="img-art"></div>
                            <h1 className="mt-4">{getCat ? (getCat + "s") : "All commerces"}</h1>
                        </div>
                    </Col>
                    <Col md={8}>
                        <CommerceList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CommercePage