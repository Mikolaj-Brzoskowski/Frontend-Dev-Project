import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { DeleteTrackFromAPI, GetArtistID } from '../../actions/TracksActions'
import { Container, Button, Row, Col, Table } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { useEffect} from 'react'
import { useTranslation } from 'react-i18next'

const TrackDetails = ({track, DeleteTrackFromAPI, GetArtistID, artist_id}) => {

    const { id } = useParams();
    const { t } = useTranslation()

    useEffect(() =>{
        GetArtistID(id)
    }, [])

    const history = useHistory()

    const handleDelete = (id) => {
        DeleteTrackFromAPI(id)
        history.push("/Trackslist")
    }
    
    return(
        <div className="TrackDetails">
           {track.map(el => (
               <div key={el.id}>
                   <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" aria-current="page"><Link to="/">{t('main')}</Link></li>
                            <li className="breadcrumb-item" aria-current="page"><Link to="/Trackslist">{t('trackslist')}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">"{el.track_name}"</li>
                        </ol>
                    </nav>
                    <Container fluid>
                        <Row>
                        <Col><img src={`${el.img}`} alt={t('cover')} className="m-3"/></Col>
                        </Row>
                        <Row>
                            <Col>
                            <Table striped bordered hover>
                            <tbody>
                                <tr>
                                <td>{t('track_name')}:</td>
                                <td>{el.track_name}</td>
                                </tr>
                                <tr>
                                <td>{t('artists_list')}:</td>
                                <td><Link to={`/Artistslist/${artist_id}`}>{el.artist_name}</Link></td>
                                </tr>
                                <tr>
                                <td>{t('genre')}:</td>
                                <td>{el.genre}</td>
                                </tr>
                            </tbody>
                            </Table>
                            </Col>
                        </Row>
                        <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Beats Per Minute:</td>
                                <td>{el.bpm}</td>
                                </tr>
                                <tr>
                                <td>{t('energy')}:</td>
                                <td>{el.energy}</td>
                                </tr>
                                <tr>
                                <td>{t('danceability')}:</td>
                                <td>{el.danceability}</td>
                                </tr>
                                <tr>
                                <td>{t('loudness')} (in dB):</td>
                                <td>{el.loudness}</td>
                                </tr>
                                <tr>
                                <td>{t('liveness')}:</td>
                                <td>{el.liveness}</td>
                                </tr>
                                <tr>
                                <td>{t('valence')}:</td>
                                <td>{el.valence}</td>
                                </tr>
                                <tr>
                                <td>{t('length')}:</td>
                                <td>{el.length}</td>
                                </tr>
                                <tr>
                                <td>{t('acousticness')}:</td>
                                <td>{el.acousticness}</td>
                                </tr>
                                <tr>
                                <td>{t('creation_date')}:</td>
                                <td>{el.creation_date.split('T')[0]}</td>
                                </tr>
                            </tbody>
                        </Table>
                        </Row>
                    </Container>
               <p><Link to={`/Trackslist/Edit/${el.id}`}><Button>{t('edit')}</Button></Link></p>
               <Button onClick={() => handleDelete(el.id)}>{t('delete')}</Button>
               </div>
           ))}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const paramId = props.match.params.id
    const detailed = state.tracks.tracks.filter(track => track.id === parseInt(paramId))
    return {
        track: detailed,
        artist_id: state.tracks.artist_id
    }
}

const mapDispatchToProps = {
    DeleteTrackFromAPI,
    GetArtistID
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackDetails))