import { Routes, Route } from "react-router-dom"
import CommerceDetails from "../components/CommerceDetails/CommerceDetails"
import CommercePage from "../pages/CommercePage/CommercePage"
import NewCommerce from "../components/NewCommerce/NewCommerce"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import HomePage from "../pages/HomePage/HomePage"
import PrivateRoute from "./PrivateRoute"
import UserProfilePage from "../pages/UserProfile/UserProfile"
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'


const AppRoutes = () => {
    const { user } = useContext(AuthContext)


    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/commerces" element={<CommercePage />} />
            <Route path="/details/:commerce_id" element={<CommerceDetails />} />
            <Route path="/create" element={<NewCommerce />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/user" element={<PrivateRoute />}>
                <Route path="" element={<UserProfilePage />} />
            </Route>

            <Route>
                <Route path="/commerces" element={<CommercePage />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes