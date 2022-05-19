import axios from 'axios'

class UserService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUserDetails = () => {
        return this.api.get(`/`)
    }

    editUser = userInfo => {
        return this.api.put(`/edit`, userInfo)
    }

    deleteUser = id => {
        return this.api.delete(`/${id}/delete`)
    }

    addCommerceToFav = id => {
        return this.api.put(`/${id}/add-to-fav`)
    }

    removeCommerceFromFav = id => {
        return this.api.put(`/${id}/remove-from-fav`)
    }


}

const userService = new UserService()

export default userService