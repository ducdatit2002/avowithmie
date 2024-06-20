import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPodcast } from "../../redux/audioPlayer";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";

const Podcast = ({ podcast, playlist, handleRemovePodcast }) => {
	const [menu, setMenu] = useState(false);
	const { currentPodcast } = useSelector((state) => state.audioPlayer);
	const dispatch = useDispatch();

	const handleChange = () => {
		if (currentPodcast && currentPodcast.action === "play") {
			const payload = {
				podcast: podcast,
				action: "pause",
			};
			dispatch(setCurrentPodcast(payload));
		} else {
			const payload = {
				podcast: podcast,
				action: "play",
			};
			dispatch(setCurrentPodcast(payload));
		}
	};

	return (
		<div className={styles.podcast_container}>
			<div className={styles.left}>
				<IconButton onClick={handleChange} className={styles.play_btn}>
					{currentPodcast &&
					currentPodcast.action === "play" &&
					currentPodcast.podcast._id === podcast._id ? (
						<PauseIcon />
					) : (
						<PlayArrowIcon />
					)}
				</IconButton>
				<img src={podcast.img} alt="podcast_img" />
				<p>{podcast.name}</p>
			</div>
			<div className={styles.center}>
				<p>{podcast.artist}</p>
			</div>
			<div className={styles.right}>
				<Like podcastId={podcast._id} />
				<p>{podcast.duration}</p>
				<IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
					<MoreHorizIcon />
				</IconButton>
				{menu && (
					<PlaylistMenu
						playlist={playlist}
						podcast={podcast}
						handleRemovePodcast={handleRemovePodcast}
						closeMenu={() => setMenu(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default Podcast;
