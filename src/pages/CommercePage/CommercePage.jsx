import './CommercePage.css'
import { Container } from 'react-bootstrap'
import CommerceList from '../../components/CommerceList/CommerceList'

const CommercePage = () => {

    return (
        <Container>
            <h1>Commerces List</h1>
            <hr />
            <CommerceList />
        </Container>
    )
}

export default CommercePage