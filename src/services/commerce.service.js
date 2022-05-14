import axios from 'axios'

class CommerceService {

    constructor() {
        this.api = axios.create({ baseURL: 'http://localhost:5005/api/commerce' })
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

    editCommerce = (id, commerceInfo) => {
        return this.api.put(`/${id}/edit`, commerceInfo)
    }

    deleteCommerce = id => {
        return this.api.delete(`/${id}/delete`)
    }

    addCommerceToFav = id => {
        return this.api.put(`/${id}/add-to-fav`)
    }

    removeCommerceFromFav = id => {
        return this.api.put(`/${id}/remove-from-fav`)
    }
}

const commerceService = new CommerceService()

export default commerceService
