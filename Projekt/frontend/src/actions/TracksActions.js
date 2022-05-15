import axios from 'axios'

export const GET_TRACKS_LIST = 'GET_TRACKS_LIST';
export const START_LOADING_TRACKS = 'START_LOADING_TRACKS'
export const ACTION_FAILED = 'ACTION_FAILED'
export const GET_ARTIST_ID = 'GET_ARTIST_ID'
export const EDIT_TRACK = 'EDIT_TRACK'
export const DELETE_TRACK = 'DELETE_TRACK'

export const EditTrackAction = (payload, id) => ({
    type: EDIT_TRACK,
    payload,
    id
})

export const StartLoadingAction = ({
    type: START_LOADING_TRACKS
})

export const GetTracksListAction = (payload) => ({
    type: GET_TRACKS_LIST,
    payload
})

export const FailAction = (err) => ({
    type: ACTION_FAILED,
    payload: err
})

export const GetArtistIDAction = (payload) => ({
    type: GET_ARTIST_ID,
    payload
})

export const DeleteTrackAction = (id) => ({
    type: DELETE_TRACK,
    id
})

export const GetTracksListFromAPI = () => {
    return async dispatch =>{
        try {
            const response = await axios.get('http://localhost:5000/tracks')
            dispatch(GetTracksListAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const PostTrackToAPI = (values) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            await axios.post('http://localhost:5000/tracks', values)
            const response = await axios.get('http://localhost:5000/tracks')
            dispatch(GetTracksListAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const DeleteTrackFromAPI = (id) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            await axios.delete(`http://localhost:5000/tracks/${id}`)
            dispatch(DeleteTrackAction(id))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const UpdateTrackToAPI = (values, id) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            await axios.put(`http://localhost:5000/tracks/${id}`, values)
            dispatch(EditTrackAction(values, id))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const GetTracksListSortedFromAPI = (sortType, asc) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            const response = await axios.get(`http://localhost:5000/tracks/${sortType}/${asc}`);
            dispatch(GetTracksListAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const GetArtistID = (id) => {
    return async dispatch =>{
        dispatch(StartLoadingAction);
        try {
            const response = await axios.get(`http://localhost:5000/track/artist/${id}`);
            dispatch(GetArtistIDAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}