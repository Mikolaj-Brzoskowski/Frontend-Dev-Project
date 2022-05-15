import { Formik } from "formik"
import { connect } from "react-redux"
import { useHistory, useParams } from "react-router"
import { PostTrackToAPI, UpdateTrackToAPI } from '../../actions/TracksActions'
import { Button, Form } from 'react-bootstrap'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const TracksForm = ({PostTrackToAPI, UpdateTrackToAPI, track, artists}, props) => {

    const { t } = useTranslation()
    const { id } = useParams()
    const history = useHistory()
    const addMode = !id

    const handleSubmit = (values) => {
        addMode 
        ? PostTrackToAPI(values)
        : UpdateTrackToAPI(values, id)
        history.push("/Trackslist")
    }

    const handleInitValues = () => {
        return (addMode
        ? {
            track_name: '',
            artist_name: '',
            genre: '',
            bpm: 0,
            energy: 0,
            danceability: 0,
            loudness: 0,
            liveness: 0,
            valence: 0,
            length: 0,
            acousticness: 0,
            img: ''
            }
        : {
            track_name: track.track_name,
            artist_name: track.artist_name,
            genre: track.genre,
            bpm: track.bpm,
            energy: track.energy,
            danceability: track.danceability,
            loudness: track.loudness,
            liveness: track.liveness,
            valence: track.valence,
            length: track.length,
            acousticness: track.acousticness,
            img: track.img
            })
    }

    const validationSchema = Yup.object().shape({
          track_name: Yup.string()
          .min(1, 'Too Short!')
          .required('Required'),
          artist_name: Yup.string()
          .min(1, 'Too Short!')
          .required('Required'),
          genre: Yup.string()
          .min(1, 'Too Short!')
          .required('Required'),
          bpm: Yup.number()
          .min(1, 'Too Low!')
          .max(999, 'Too High!')
          .positive('Value must be a positive number.')
          .required('Required'),
          energy: Yup.number()
          .min(1, 'Too Low!')
          .max(100, 'Too High!')
          .positive('Value must be a positive number.')
          .required('Required'),
          danceability: Yup.number()
          .min(1, 'Too Low!')
          .max(100, 'Too High!')
          .positive('Value must be a positive number.')
          .required('Required'),
          loudness: Yup.number()
          .min(-10, 'Too Low!')
          .negative('Value must be less than zero')
          .required('Required'),
          liveness: Yup.number()
          .min(1, 'Too Low!')
          .max(100, 'Too High!')
          .positive('Value must be a positive number.')
          .required('Required'),
          valence: Yup.number()
          .min(1, 'Too Low!')
          .max(100, 'Too High!')
          .positive('Value must be a positive number.')
          .required('Required'),
          length: Yup.number()
          .min(1, 'Too Low!')
          .positive('Value must be a positive number.')
          .required('Required'),
          acousticness: Yup.number()
          .min(1, 'Too Low!')
          .max(100, 'Too High!')
          .positive('Value must be a positive number.')
          .required('Required'),
          img: Yup.string()
          .min(1, 'Too Low!')
          .required('Required'),
      });

    return(
        <div>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item" aria-current="page"><Link to="/">{t('main')}</Link></li>
                <li className="breadcrumb-item" aria-current="page"><Link to="/Trackslist">{t('trackslist')}</Link></li>
                {addMode ? <li className="breadcrumb-item active" aria-current="page">
                                {t('add_track')}
                            </li>
                :        
                    <li className="breadcrumb-item" aria-current="page"><Link to={`/Trackslist/${id}`}>"{track.track_name}"</Link></li>
                   }
                {addMode ? null
                :    
                    <li className="breadcrumb-item active" aria-current="page">{t('edit_track')}</li>
                }
              </ol>
            </nav>
            <div className="form">
            <Formik
                initialValues={handleInitValues()}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
                >
                {({
                handleSubmit,
                handleChange,
                errors,
                touched,
                values
        }) => (
                <Form onSubmit={handleSubmit}>
                     <h1>{addMode ? t('add_track') : t('edit_track')}</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('track_name')}</Form.Label>
                        <Form.Control type="text" placeholder={t('track_name')} value={`${values.track_name}`} name="track_name" onChange={handleChange}/>
                        {errors.track_name && touched.track_name ? (<div className="alert alert-danger" role="alert">{errors.track_name}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('artist_name')}</Form.Label>
                        <Form.Select aria-label="Select artist" name="artist_name" onChange={handleChange} value={`${values.artist_name}`}>
                        <option>{t('select_artist')}</option>
                            {artists.map(el => (
                                <option value={`${el.artist_name}`} key={el.artist_name}>{el.artist_name}</option>
                            ))}
                        </Form.Select>
                        {errors.artist_name && touched.artist_name ? (<div className="alert alert-danger" role="alert">{errors.artist_name}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('genre')}</Form.Label>
                        <Form.Select aria-label="Select genre" name="genre" onChange={handleChange} value={`${values.genre}`}>
                            <option>{t('select_genre')}</option>
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
                        </Form.Select>
                        {errors.genre && touched.genre ? (<div className="alert alert-danger" role="alert">{errors.genre}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('bpm')}</Form.Label>
                        <Form.Control type="number" placeholder="Beats Per Minute" value={`${values.bpm}`} name="bpm" onChange={handleChange}/>
                        {errors.bpm && touched.bpm ? (<div className="alert alert-danger" role="alert">{errors.bpm}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('energy')}</Form.Label>
                        <Form.Control type="number" placeholder={t('energy')} value={`${values.energy}`} name="energy" onChange={handleChange}/>
                        {errors.energy && touched.energy ? (<div className="alert alert-danger" role="alert">{errors.energy}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('danceability')}</Form.Label>
                        <Form.Control type="number" placeholder={t('danceability')} value={`${values.danceability}`} name="danceability" onChange={handleChange}/>
                        {errors.danceability && touched.danceability ? (<div className="alert alert-danger" role="alert">{errors.danceability}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('loudness')}</Form.Label>
                        <Form.Control type="number" placeholder={t('loudness')} value={`${values.loudness}`} name="loudness" onChange={handleChange}/>
                        {errors.loudness && touched.loudness ? (<div className="alert alert-danger" role="alert">{errors.loudness}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('liveness')}</Form.Label>
                        <Form.Control type="number" placeholder={t('liveness')} name="liveness" value={`${values.liveness}`} onChange={handleChange}/>
                        {errors.liveness && touched.liveness ? (<div className="alert alert-danger" role="alert">{errors.liveness}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('valence')}</Form.Label>
                        <Form.Control type="number" placeholder={t('valence')} name="valence" value={`${values.valence}`} onChange={handleChange}/>
                        {errors.valence && touched.valence ? (<div className="alert alert-danger" role="alert">{errors.valence}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('length')}</Form.Label>
                        <Form.Control type="number" placeholder={t('length')} name="length" value={`${values.length}`} onChange={handleChange}/>
                        {errors.length && touched.length ? (<div className="alert alert-danger" role="alert">{errors.length}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('acousticness')}</Form.Label>
                        <Form.Control type="number" placeholder={t('acousticness')} name="acousticness" value={`${values.acousticness}`} onChange={handleChange}/>
                        {errors.acousticness && touched.acousticness ? (<div className="alert alert-danger" role="alert">{errors.acousticness}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('img_url')}</Form.Label>
                        <Form.Control type="text" placeholder={t('img_url')} name="img" value={`${values.img}`} onChange={handleChange}/>
                        {errors.img && touched.img ? (<div className="alert alert-danger" role="alert">{errors.img}</div>) : null}
                    </Form.Group>
                    <Button variant="primary" type="submit">{t('submit')}</Button>
                </Form>)}
            </Formik>
            </div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const paramId = props.match.params.id
    const addMode = !paramId
    return addMode 
    ?  {
        artists: state.artists.artists
    }
    : { 
        track: state.tracks.tracks.filter(track => track.id === parseInt(paramId))[0],
        artists: state.artists.artists} 
}

const mapDispatchToProps = {
    PostTrackToAPI,
    UpdateTrackToAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(TracksForm)