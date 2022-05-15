import {connect} from 'react-redux'
import { withRouter, Link, useParams, useHistory } from 'react-router-dom'
import { ListGroup, Button, Table } from 'react-bootstrap'
import { GetTracksFromArtist, DeleteArtistFromAPI } from '../../actions/ArtistsActions'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const TrackDetails = ({artist, GetTracksFromArtist, DeleteArtistFromAPI, tracks}) => {

    const { id } = useParams();
    const { t } = useTranslation()
    const history = useHistory()

    useEffect(() =>{
        GetTracksFromArtist(id)
    }, [])

    const handleDelete = (id) => {
        DeleteArtistFromAPI(id)
        history.push("/Artistslist")
    }
    
    return(
        <div className="TrackDetails">
            {artist.map(el =>(
                <div key={el.artist_name}>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" aria-current="page"><Link to="/">{t('main')}</Link></li>
                        <li className="breadcrumb-item" aria-current="page"><Link to="/Artistslist">{t('artists_list')}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">"{el.artist_name}"</li>
                    </ol>
                </nav>
                
                <Table>
                <tbody>
                    <tr>
                    <td>{t('artist_name')}:</td>
                    <td>{el.artist_name}</td>
                    </tr>
                    <tr>
                    <td>{t('popularity')}:</td>
                    <td>{el.popularity}</td>
                    </tr>
                    <tr>
                    <td>{t('birth_date')}:</td>
                    <td>{el.birth_date.split('T')[0]}</td>
                    </tr>
                </tbody>
                </Table>
                
                <h4>{t('trackslist')}:</h4>
                {tracks.map(track =>
                    <div key={track.id}>
                        <ListGroup className="align-items-center">
                            <ListGroup.Item className="m-2 w-50">
                                <Link to={`/Trackslist/${track.id}`}>{track.track_name}</Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>)}
                <p><Link to={`/Artistslist/Edit/${el.id}`}><Button>{t('edit')}</Button></Link></p>
                <Button onClick={() => handleDelete(el.id)}>{t('delete')}</Button>
                </div>
                ))}  
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const paramId = props.match.params.id
    const detailed = state.artists.artists.filter(el => el.id === parseInt(paramId))
    return {
        artist: detailed,
        tracks: state.artists.tracks
    }
}

const mapDispatchToProps = {
    GetTracksFromArtist,
    DeleteArtistFromAPI
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackDetails))