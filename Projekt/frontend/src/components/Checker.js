import {useEffect} from 'react'
import {connect} from 'react-redux'
import { GetTracksListFromAPI } from '../actions/TracksActions'
import { GetArtistsListFromAPI } from '../actions/ArtistsActions'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

const Checker = ({tracks, GetTracksListFromAPI, artists, GetArtistsListFromAPI}) => {

    const { t } = useTranslation()

    useEffect(() => {
        if (tracks.length === 0) {
            GetTracksListFromAPI()
        }
        if (artists.length === 0) {
            GetArtistsListFromAPI()
        }
    }, [])
    
    return (
    <div>
        <DropdownButton id="dropdown-basic-button" title={t('language')} className="d-flex justify-content-end">
            <Dropdown.Item onClick={() => i18next.changeLanguage('en')}>{t('eng')}</Dropdown.Item>
            <Dropdown.Item onClick={() => i18next.changeLanguage('pl')}>{t('pol')}</Dropdown.Item>
        </DropdownButton>
    </div>);
}

const mapStateToProps = (state) => ({
    tracks: state.tracks.tracks,
    artists: state.artists.artists
})

const mapDispatchToProps = {
    GetTracksListFromAPI,
    GetArtistsListFromAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(Checker)