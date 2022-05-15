import { GET_TRACKS_LIST, START_LOADING_TRACKS, ACTION_FAILED, GET_ARTIST_ID, EDIT_TRACK, DELETE_TRACK } from "../actions/TracksActions";

const initState = {
    tracks: [],
    tracks_loading: false,
    error: '',
    artist_id: 0
}

export const TracksReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_TRACKS_LIST:
            return {...state, tracks: [...action.payload], tracks_loading: false};
        case START_LOADING_TRACKS:
            return {...state, tracks_loading: true};
        case ACTION_FAILED: 
            return {...state, tracks_loading: false, error: action.payload};
        case GET_ARTIST_ID:
            return {...state, tracks_loading: false, artist_id: action.payload[0].id};
        case EDIT_TRACK:
            let edit_track_state = [...state.tracks]
            const edit_track_inx = edit_track_state.findIndex(el => el.id === parseInt(action.id))
            edit_track_state[edit_track_inx] = {...edit_track_state[edit_track_inx], ...action.payload};
            return {...state, tracks: [...edit_track_state], tracks_loading: false}
        case DELETE_TRACK:
            let delete_track_state = [...state.tracks]
            const delete_track_inx = delete_track_state.findIndex(el => el.id === parseInt(action.id))
            delete_track_state.splice(delete_track_inx, 1)
            return {...state, tracks: [...delete_track_state], tracks_loading: false}
        default:
            return state;
    }
}