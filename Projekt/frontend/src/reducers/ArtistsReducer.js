import { GET_ARTISTS_LIST, START_LOADING_ARTISTS, ACTION_FAILED, GET_ARTISTS_TRACKS, EDIT_ARTIST, DELETE_ARTIST } from "../actions/ArtistsActions";

const initState = {
    artists: [],
    artists_loading: false,
    error: '',
    tracks: []
}

export const ArtistsReducer = (state = initState, action) => {
    switch(action.type) {
        case START_LOADING_ARTISTS:
            return {...state, artists_loading: true};
        case ACTION_FAILED:
            return {...state, artists_loading: false, error: action.payload};
        case GET_ARTISTS_LIST:
            return {...state, artists: [...action.payload], artists_loading: false};
        case GET_ARTISTS_TRACKS:
            return {...state, artists_loading: false, tracks: [...action.payload]};
        case EDIT_ARTIST:
            let edit_artist_state = [...state.artists]
            const edit_artist_inx = edit_artist_state.findIndex(el => el.id === parseInt(action.id))
            edit_artist_state[edit_artist_inx] = {...edit_artist_state[edit_artist_inx], ...action.payload};
            return {...state, artists: [...edit_artist_state], artists_loading: false}
        case DELETE_ARTIST: 
            let delete_artist_state = [...state.artists]
            const delete_artist_inx = delete_artist_state.findIndex(el => el.id === parseInt(action.id))
            delete_artist_state.splice(delete_artist_inx, 1)
            return {...state, artists: [...delete_artist_state], artists_loading: false}
        default:
            return state
    }
}