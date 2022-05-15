import axios from 'axios'

export const GET_ARTISTS_LIST = 'GET_ARTISTS_LIST';
export const START_LOADING_ARTISTS = 'START_LOADING_ARTISTS'
export const ACTION_FAILED = 'ACTION_FAILED'
export const GET_ARTISTS_TRACKS = 'GET_ARTISTS_TRACKS'
export const EDIT_ARTIST = 'EDIT_ARTIST'
export const DELETE_ARTIST = 'DELETE_ARTIST'

export const StartLoadingAction = ({
    type: START_LOADING_ARTISTS
})

export const GetArtistsListAction = (payload) => ({
    type: GET_ARTISTS_LIST,
    payload
})

export const FailAction = (err) => ({
    type: ACTION_FAILED,
    payload: err
})

export const GetTracksFromArtistAction = (payload) => ({
    type: GET_ARTISTS_TRACKS,
    payload
})

export const EditArtistAction = (payload, id) => ({
    type: EDIT_ARTIST,
    payload,
    id
})

export const DeleteArtistAction = (id) => ({
    type: DELETE_ARTIST,
    id
})

export const GetArtistsListFromAPI = () => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            const response = await axios.get('http://localhost:5000/artists')
            dispatch(GetArtistsListAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const GetTracksFromArtist = (id) => {
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/artists/${id}/tracks`)
            dispatch(GetTracksFromArtistAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const AddArtistToAPI = (values) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            await axios.post(`http://localhost:5000/artists`, values)
            const response = await axios.get('http://localhost:5000/artists')
            dispatch(GetArtistsListAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const EditArtistInAPI = (values, id) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            await axios.put(`http://localhost:5000/artists/${id}`, values)
            dispatch(EditArtistAction(values, id))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const DeleteArtistFromAPI = (id) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            await axios.delete(`http://localhost:5000/artists/${id}`)
            dispatch(DeleteArtistAction(id))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const GetArtistsSortedFromAPI = (sortType, asc) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            const response = await axios.get(`http://localhost:5000/artists/${sortType}/${asc}`);
            dispatch(GetArtistsListAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}