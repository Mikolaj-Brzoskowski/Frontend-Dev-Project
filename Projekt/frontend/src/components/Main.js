import { Breadcrumb, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Main = () => {

    const { t } = useTranslation();

    return(
        <div className="Main">
            <Breadcrumb>
                <Breadcrumb.Item active>{t('main')}</Breadcrumb.Item>
            </Breadcrumb>
           <p>{t('welcome_to_site')}</p>
            <p><Link to="/Trackslist"><Button>{t('trackslist')}</Button></Link></p>
            <Link to="/Artistslist"><Button>{t('artists_list')}</Button></Link>
        </div>
    )
}

export default Main