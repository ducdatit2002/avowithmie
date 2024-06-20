import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPodcast } from "../../redux/audioPlayer";
import Like from "../Like";
import { IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "./styles.module.scss";

const AudioPlayer = () => {
	const [trackProgress, setTrackProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const { currentPodcast } = useSelector((state) => state.audioPlayer);
	const dispatch = useDispatch();

	const audioRef = useRef();
	const intervalRef = useRef();

	const startTimer = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef && audioRef.current.ended) {
				dispatch(setCurrentPodcast({ ...currentPodcast, action: "pause" }));
			} else if (audioRef) {
				setTrackProgress(audioRef.current.currentTime);
				audioRef.current.duration && setDuration(audioRef.current.duration);
			} else {
				setTrackProgress(0);
			}
		}, [1000]);
	};

	const currentPercentage = duration
		? `${(trackProgress / duration) * 100}%`
		: "0%";
	const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

	useEffect(() => {
		if (currentPodcast.action === "play") {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [currentPodcast]);

	useEffect(() => {
		currentPodcast.action === "play" && startTimer();
	});

	const onScrub = (value) => {
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const handleActions = () => {
		currentPodcast.action === "play"
			? dispatch(setCurrentPodcast({ ...currentPodcast, action: "pause" }))
			: dispatch(setCurrentPodcast({ ...currentPodcast, action: "play" }));
	};

	return (
		<div className={styles.audio_player}>
			<div className={styles.left}>
				<img src={currentPodcast.podcast.img} alt="podcast_img" />
				<div className={styles.podcast_info}>
					<p className={styles.podcast_name}>{currentPodcast.podcast.name}</p>
					<p className={styles.podcast_artist}>{currentPodcast.podcast.artist}</p>
				</div>
			</div>
			<div className={styles.center}>
				<div className={styles.audio_controls}>
					<IconButton className={styles.prev}>
						<SkipPreviousIcon />
					</IconButton>
					<IconButton className={styles.play} onClick={handleActions}>
						{currentPodcast.action === "play" ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>
					<IconButton className={styles.next}>
						<SkipNextIcon />
					</IconButton>
				</div>
				<div className={styles.progress_container}>
					<p>{Math.floor(trackProgress)}</p>
					<input
						type="range"
						value={trackProgress}
						step="1"
						min="0"
						onChange={(e) => onScrub(e.target.value)}
						max={duration ? duration : 0}
						className={styles.progress}
						style={{ background: trackStyling }}
					/>
					<audio src={currentPodcast.podcast.podcast} ref={audioRef}></audio>
					<p>{Math.floor(duration)}</p>
				</div>
			</div>
			<div className={styles.right}>
				<Like podcastId={currentPodcast.podcast._id} />
			</div>
		</div>
	);
};

export default AudioPlayer;
