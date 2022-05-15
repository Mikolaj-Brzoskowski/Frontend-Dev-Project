import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './components/Main';
import TracksList from './components/tracks/TracksList';
import TrackDetails from './components/tracks/TrackDetails';
import Checker from './components/Checker';
import TracksForm from './components/tracks/TracksForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import ArtistsList from './components/artists/ArtistsList';
import ArtistDetails from './components/artists/ArtistDetails';
import ArtistForm from './components/artists/ArtistForm';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Checker/>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route exact path="/Trackslist" component={TracksList}/>
      <Route exact path="/Artistslist" component={ArtistsList}/>
      <Route exact path="/Trackslist/Add" component={TracksForm}/>
      <Route exact path="/Trackslist/Edit/:id" component={TracksForm}/>
      <Route exact path="/Artistslist/Add" component={ArtistForm}/>
      <Route exact path="/Artistslist/Edit/:id" component={ArtistForm}/>
      <Route exact path="/Trackslist/:id" component={TrackDetails}/>
      <Route exact path="/Artistslist/:id" component={ArtistDetails}/>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
