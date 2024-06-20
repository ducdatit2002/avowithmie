import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Podcast from "../../components/Podcast";
import axiosInstance from "../../redux/axiosInstance";
import { CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./styles.module.scss";
import likeImg from "../../images/like.jpg";

const LikedPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useSelector((state) => state.user);

  const getLikedPodcasts = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/podcasts/like`;
      const { data } = await axiosInstance.get(url);
      setPodcasts(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getLikedPodcasts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.head_gradient}></div>
        <img src={likeImg} alt="like podcasts" />
        <div className={styles.playlist_info}>
          <p>Playlist</p>
          <h1>Liked podcasts</h1>
          <span>By {user && user.name}</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.body_nav}>
          <div className={styles.left}>
            <span>#</span>
            <p>Title</p>
          </div>
          <div className={styles.center}>
            <p>Artist</p>
          </div>
          <div className={styles.right}>
            <AccessTimeIcon />
          </div>
        </div>
        {isFetching ? (
          <div className={styles.progress_container}>
            <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
          </div>
        ) : (
          <Fragment>
            {podcasts.map((podcast) => (
              <Fragment key={podcast._id}>
                {user.likedPodcasts.indexOf(podcast._id) !== -1 && (
                  <Podcast podcast={podcast} />
                )}
              </Fragment>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default LikedPodcasts;
