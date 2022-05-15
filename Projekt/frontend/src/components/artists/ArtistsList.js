import {connect} from 'react-redux'
import { Link } from "react-router-dom"
import { Button, Breadcrumb, Spinner, ListGroup, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { GetArtistsSortedFromAPI } from '../../actions/ArtistsActions'
import { useTranslation } from 'react-i18next'

const ArtistsList = ({artists, artists_loading, GetArtistsSortedFromAPI}) => {

    const { t } =  useTranslation()
    const [sort, setSort] = useState(null)
    const [asc, setAsc] = useState(null)
    const [query, setQuery] = useState("")

    useEffect(() => {
        if (sort != null) {
            asc ? GetArtistsSortedFromAPI(sort, `ASC`)
            : GetArtistsSortedFromAPI(sort, `DESC`)
        }
    }, [sort, asc])

    const handleSort = async (sortType) => {
        setSort(sortType);
        if (sort === sortType) setAsc(!asc);
        else setAsc(true);
    }

    return(
        <div className="ArtistsList">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" aria-current="page"><Link to="/">{t('main')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('artists_list')}</li>
                </ol>
            </nav>

            <p><Link to="/Artistslist/Add"><Button>{t('add_artist')}</Button></Link></p>

            <p><Form.Control type="text" placeholder={t('searchbar')} onChange={(event) => setQuery(event.target.value)}/></p>

            <h3>{t('sort_by')}</h3>
            <p><Button className="sort" onClick={() => handleSort('artist_name')}>{t('artist_name')}</Button>
            <Button className="sort"onClick={() => handleSort('popularity')}>{t('popularity')}</Button>
            <Button className="sort" onClick={() => handleSort('birth_date')}>{t('birth_date')}</Button></p>

            <div className="list">
            {artists_loading ?
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
            : artists.filter(el => {
                if (query === '') {
                  return el;
                } else if (el.artist_name.toLowerCase().includes(query.toLowerCase())) {
                  return el;
                }
              }).map(el =>
                <div key={el.id}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link to={`/Artistslist/${el.id}`}>{el.artist_name}</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>)}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
        artists: state.artists.artists,
        artists_loading: state.artists.artists_loading
})

const mapDispatchToProps = {
    GetArtistsSortedFromAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsList)