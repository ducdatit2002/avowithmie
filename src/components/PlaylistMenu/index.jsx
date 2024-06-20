import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPodcastToPlaylist } from "../../redux/playListSlice/apiCalls";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./styles.module.scss";

const PlaylistMenu = ({ playlist, podcast, handleRemovePodcast, closeMenu }) => {
	const { playlists } = useSelector((state) => state.playlists);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleAddToPlaylist = (playlistId, podcastId) => {
		const payload = { playlistId, podcastId };
		addPodcastToPlaylist(payload, dispatch);
	};

	return (
		<ClickAwayListener onClickAway={closeMenu}>
			<div className={styles.menu} onClick={closeMenu}>
				<div className={styles.playlist_option}>
					<p>Add to Playlist</p>
					<Fragment>
						<ArrowRightIcon />
						<div className={styles.playlists}>
							{playlists.map((playlist) => (
								<div
									className={styles.option}
									onClick={() => handleAddToPlaylist(playlist._id, podcast._id)}
									key={playlist._id}
								>
									<p>{playlist.name}</p>
								</div>
							))}
						</div>
					</Fragment>
				</div>
				{playlist && playlist.user === user._id && (
					<div className={styles.option}>
						<p onClick={() => handleRemovePodcast(podcast._id)}>
							Remove from Playlist
						</p>
					</div>
				)}
				<div className={styles.option}>
					<p>Go to artist</p>
				</div>
				<div className={styles.option}>
					<p>Share</p>
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default PlaylistMenu;
