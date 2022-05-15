import { Formik } from "formik"
import { connect } from "react-redux"
import { useHistory, useParams } from "react-router"
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import * as Yup from 'yup';
import { AddArtistToAPI, EditArtistInAPI } from '../../actions/ArtistsActions'
import { useTranslation } from 'react-i18next'

const ArtistForm = ({artist, AddArtistToAPI, EditArtistInAPI}, props) => {

    const { t } = useTranslation()
    const { id } = useParams()
    const history = useHistory()
    const addMode = !id

    const handleSubmit = (values) => {
        addMode 
        ? AddArtistToAPI(values)
        : EditArtistInAPI(values, id)
        history.push("/Artistslist")
    }

    const handleInitValues = () => {
        return (addMode
        ? {
            artist_name: '',
            popularity: 0,
            birth_date: ''
            }
        : {
            artist_name: artist.artist_name,
            popularity: artist.popularity,
            birth_date: artist.birth_date
            })
    }

    const validationSchema = Yup.object().shape({
          artist_name: Yup.string()
          .min(1, 'Too Short!')
          .required('Required'),
          popularity: Yup.number()
          .min(0, 'Too Low!')
          .max(100, 'Too High!')
          .required('Required'),
          birth_date: Yup.date()
          .required('Required')
      });

    return(
        <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item" aria-current="page"><Link to="/">{t('main')}</Link></li>
                <li className="breadcrumb-item" aria-current="page"><Link to="/Artistslist">{t('artists_list')}</Link></li>
                {addMode ? <li className="breadcrumb-item active" aria-current="page">{t('add_artist')}</li>
                :           
                    <li className="breadcrumb-item" aria-current="page"><Link to={`/Artistslist/${id}`}>"{artist.artist_name}"</Link></li>
                }
                {addMode ? null
                :           
                    <li className="breadcrumb-item active" aria-current="page">{t('edit_artist')}</li>
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
                     <h1>{addMode ? t('add_artist') : t('edit_artist')}</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('artist_name')}</Form.Label>
                        <Form.Control type="text" placeholder={t('artist_name')} value={`${values.artist_name}`} name="artist_name" onChange={handleChange}/>
                        {errors.artist_name && touched.artist_name ? (<div className="alert alert-danger" role="alert">{errors.artist_name}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('popularity')}</Form.Label>
                        <Form.Control type="number" placeholder={t('popularity')}value={`${values.popularity}`} name="popularity" onChange={handleChange}/>
                        {errors.popularity && touched.popularity ? (<div className="alert alert-danger" role="alert">{errors.popularity}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('birth_date')}</Form.Label>
                        <Form.Control type="date" placeholder={t('birth_date')} value={`${values.birth_date.split('T')[0]}`} name="birth_date" onChange={handleChange}/>
                        {errors.birth_date && touched.birth_date ? (<div className="alert alert-danger" role="alert">{errors.birth_date}</div>) : null}
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
        
    }
    : { 
        artist: state.artists.artists.filter(artist => artist.id === parseInt(paramId))[0],
        } 
}

const mapDispatchToProps = {
    AddArtistToAPI,
    EditArtistInAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistForm)