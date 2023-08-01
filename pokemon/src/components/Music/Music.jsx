import { useRef, useState } from "react";
import themeSong from "../../assets/Pokemon_theme_song.mp3";
import styles from "./music.module.css";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.themeSong}>
      <audio ref={audioRef} src={themeSong} loop/>
      <button onClick={toggleAudio} style={{backgroundColor: !isPlaying ? undefined : "var(--red)"}}>
        {isPlaying ? (
          <>
            PAUSE <span className="icon-pause2"></span>
          </>
        ) : (
          <>
            PLAY <span className="icon-volume-high"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
