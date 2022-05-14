import './Navigation.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

const Navigation = () => {

    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)

    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">CaPri</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/commerces" className="nav-link">Commerces</NavLink>

                        {
                            isLoggedIn ?
                                <>
                                    <div className="nav-link" onClick={logOutUser}>LogOut</div>
                                    <NavLink to="/user" className="nav-link">User</NavLink>
                                </>
                                :
                                <>
                                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation


