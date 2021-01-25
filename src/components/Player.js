// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleRight,
    faAngleLeft,
    faPause
} from '@fortawesome/free-solid-svg-icons';
// import hooks
import { useRef, useState } from 'react';

function Player({ songs, setCurrentSong, currentSong }) {

    // reference
    const audioRef = useRef(null);

    //states
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        songDuration: 0,
    })
    const [isPlaying, setIsPlaying] = useState(false);

    // event handlers
    //play and pause
    const playSong = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    }
    //update time information
    const timeUpdate = e => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({
            ...songInfo,
            currentTime: current,
            songDuration: duration
        })
        autoPlay()
    }
    // round up time (mm:ss)
    const getTime = time => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
        return `${minutes}:${secondsWithZero}`
    }
    //manual slider change
    const sliderChange = e => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value
        })
    }
    //auto play, when we change the song
    const autoPlay = () => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }
    // skip buttons 
    const skipTrack = direction => {
        const currentIndex = songs.findIndex(s => s.id === currentSong.id)
        let newIndex = currentIndex + direction;

        if (newIndex < 0) {
            newIndex = songs.length - 1
        } else if (newIndex >= songs.length) {
            newIndex = 0
        }

        setCurrentSong(songs[newIndex])
    }
    // start new song, after the end
    const songEnd = () => {
        const currentIndex = songs.findIndex(s => s.id === currentSong.id)
        setCurrentSong(songs[(currentIndex + 1) % songs.length])
        autoPlay()
    }


    return (
        <div className="player">
            <div className="time_control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    type="range"
                    min={0}
                    max={songInfo.songDuration || 0}
                    value={songInfo.currentTime}
                    onChange={sliderChange}
                />
                <p>{getTime(songInfo.songDuration || 0)}</p>
            </div>
            <div className="play_control">
                <FontAwesomeIcon
                    className="back" size='2x'
                    icon={faAngleLeft}
                    onClick={() => skipTrack(-1)}
                />
                <FontAwesomeIcon
                    onClick={playSong}
                    className="play"
                    size='2x'
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    className="forward"
                    size='2x'
                    icon={faAngleRight}
                    onClick={() => skipTrack(1)} />
            </div>
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onTimeUpdate={timeUpdate}
                onLoadedMetadata={timeUpdate}
                onEnded={songEnd}
            ></audio>
        </div>
    );
}

export default Player;
