import {connect} from 'react-redux'
import { GetTracksListSortedFromAPI } from '../../actions/TracksActions'
import { Link } from "react-router-dom"
import { Button, Breadcrumb, Card, Spinner, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const TracksList = ({tracks, tracks_loading, GetTracksListSortedFromAPI}) => {

    const { t } = useTranslation()
    const [sort, setSort] = useState(null)
    const [asc, setAsc] = useState(null)
    const [query, setQuery] = useState("")
    const [selectedGenre, setGenre] = useState("")
    const [selectedLoudness, setLoudness] = useState(0)

    useEffect(() => {
        if (sort != null) {
            asc ? GetTracksListSortedFromAPI(sort, `ASC`)
            : GetTracksListSortedFromAPI(sort, `DESC`)
        }
    }, [sort, asc])

    const handleSort = async (sortType) => {
        setSort(sortType);
        if (sort === sortType) setAsc(!asc);
        else setAsc(true);
    }

    return(
        <div className="TracksList">

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item" aria-current="page"><Link to="/">{t('main')}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{t('trackslist')}</li>
              </ol>
            </nav>
            
            <p><Link to="/Trackslist/Add"><Button>{t('add_track')}</Button></Link></p>

            <p><Form.Control type="text" placeholder={t('searchbar')} onChange={(event) => setQuery(event.target.value)}/></p>

            <h3>{t('sort_by')}</h3>
            <p><Form.Select aria-label="Select genre" name="genre" onChange={(event) => setGenre(event.target.value)}>
                            <option value="">{t('all')}</option>
                            <option value="pop">Pop</option>
                            <option value="rap">Rap</option>
                            <option value="trap music">Trap music</option>
                            <option value="country">Country</option>
                            <option value="electropop">Electropop</option>
                            <option value="latin">Latin</option>
                            <option value="reggaeton">Reggaeton</option>
                            <option value="boy band">Boy band</option>
                            <option value="canadian pop">Canadian pop</option>
                            <option value="country rap">Country rap</option>
                            <option value="reggaeton flow">Reggaeton flow</option>
                            <option value="dance pop">Dance pop</option>                
            </Form.Select></p>
            <h3><label htmlFor="customRange2" className="form-label">{t('loudness')}:</label></h3>
            <p><input type="range" className="form-range" min="-10" max="0" id="customRange2" value={selectedLoudness} onChange={(event) => setLoudness(parseInt(event.target.value))}/></p>
            <h5> {t('loudness')} = {selectedLoudness} </h5>
            <p><Button className="sort" onClick={() => handleSort('track_name')}>{t('track_name')}</Button>
            <Button className="sort" onClick={() => handleSort('bpm')}>{t('bpm')}</Button>
            <Button className="sort" onClick={() => handleSort('creation_date')}>{t('creation_date')}</Button></p>

            <div className="cards">
            {tracks_loading ?
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
            : tracks.filter(el => {
                if (query === '') {
                  return el;
                } else if (el.track_name.toLowerCase().includes(query.toLowerCase())) {
                  return el;
                }
              }).filter(el => {
                if (selectedGenre === '') {
                  return el;
                } else if (el.genre.toLowerCase() === selectedGenre.toLowerCase()) {
                  return el;
                }
              }).filter(el => {
                if (selectedLoudness === 0) {
                  return el;
                } else if (el.loudness === selectedLoudness) {
                  return el;
                }
              }).map(track =>
            <div key={track.id}>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`${track.img}`} alt="cover"/>
                <Card.Body>
                <Card.Title>{track.track_name}</Card.Title>
                <Link to={`/Trackslist/${track.id}`}><Button variant="primary">{t('details')}</Button></Link>
                </Card.Body>
                </Card>
            </div>)}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    tracks: state.tracks.tracks,
    tracks_loading: state.tracks.tracks_loading
})

const mapDispatchToProps = {
    GetTracksListSortedFromAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(TracksList)