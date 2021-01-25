// import components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

//import styles
import './styles/app.scss';
// import objects with information
import data from './data';
//import hooks
import { useState } from 'react';


function App() {

  // states
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? 'activeLibrary' : ''}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <Library songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
