import axios from 'axios'

class CommerceService {

    constructor() {
        this.api = axios.create({ baseURL: 'http://localhost:5005/api/commerce' })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllCommerces = () => {
        return this.api.get('/getAllCommerce')
    }

    createCommerce = commerce => {
        return this.api.post(`/create`, commerce)
    }

    getOneCommerce = id => {
        return this.api.get(`/${id}`)
    }

    getAllPropertiesOfOneUser = () => {
        return this.api.get(`/get-my-commerces`)
    }

    editCommerce = (id, commerceInfo) => {
        return this.api.put(`/${id}/edit`, commerceInfo)
    }

    deleteCommerce = id => {
        return this.api.delete(`/${id}/delete`)
    }

    addLike = id => {
        return this.api.put(`/${id}/like`)
    }

    delLike = id => {
        return this.api.put(`/${id}/unlike`)
    }

}

const commerceService = new CommerceService()

export default commerceService
