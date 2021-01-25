function LibrarySong({ song, currentSong, setCurrentSong }) {

    //event handlers
    const selectSong = () => {
        setCurrentSong(song);
    }

    return (
        <div
            className={`song_box ${song.id === currentSong.id ? "selected" : ""} `}
            onClick={selectSong}
        >
            <img src={song.cover}
                alt={song.name}
            />
            <div className="description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;