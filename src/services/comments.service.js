import axios from 'axios'

class CommentService {

    constructor() {
        this.api = axios.create({ baseURL: 'http://localhost:5005/api/comment' })
    }

    // createComment = comment => {
    //     return this.api.post(`/create`, comment)
    // }

    editComment = (id, commentInfo) => {
        return this.api.put(`/${id}/edit`, commentInfo)
    }

    deleteComment = id => {
        return this.api.delete(`/${id}/delete`)
    }

    getOneCommerceComments = id => {
        return this.api.get(`comments/${id}`)
    }
}

const commentService = new CommentService()

export default commentService
