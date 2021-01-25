// import components
import LibrarySong from './LibrarySong';

function Library({ songs, currentSong, setCurrentSong, audioRef, isPlaying, libraryStatus }) {
    return (
        <div className={`library ${libraryStatus ? 'active' : ''}`}>
            <h2>Library</h2>
            <div className="library_songs">
                {songs.map(song => (
                    <LibrarySong
                        song={song}
                        setCurrentSong={setCurrentSong}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        currentSong={currentSong}
                    />
                ))}
            </div>

        </div>
    );
}

export default Library;