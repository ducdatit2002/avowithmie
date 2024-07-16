const router = require("express").Router();
const { PlayList, validate } = require("../models/playList");

const { Podcast } = require("../models/podcast");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// create playlist
router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playList = await PlayList({ ...req.body, user: user._id }).save();
	await playList.save();

	user.playlists.push(playList._id);
	await user.save();
	

	res.status(201).send({ data: playList });
});

// edit playlist by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		desc: Joi.string().allow(""),
		img: Joi.string().allow(""),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const playlist = await PlayList.findById(req.params.id);
	if (!playlist) return res.status(404).send({ message: "Playlist not found" });

	const user = await User.findById(req.user._id);
	if (!user._id.equals(playlist.user))
		return res.status(403).send({ message: "User don't have access to edit!" });

	playlist.name = req.body.name;
	playlist.desc = req.body.desc;
	playlist.img = req.body.img;
	await playlist.save();

	res.status(200).send({ message: "Updated successfully" });
});

// add podcast to playlist
router.put("/add-podcast", auth, async (req, res) => {
	const schema = Joi.object({
		playlistId: Joi.string().required(),
		podcastId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	if (!user._id.equals(playlist.user))
		return res.status(403).send({ message: "User don't have access to add!" });

	if (playlist.podcasts.indexOf(req.body.podcastId) === -1) {
		playlist.podcasts.push(req.body.podcastId);
	}
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Added to playlist" });
});

// remove podcast from playlist
router.put("/remove-podcast", auth, async (req, res) => {
	const schema = Joi.object({
		playlistId: Joi.string().required(),
		podcastId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	if (!user._id.equals(playlist.user))
		return res
			.status(403)
			.send({ message: "User don't have access to Remove!" });

	const index = playlist.podcasts.indexOf(req.body.podcastId);
	playlist.podcasts.splice(index, 1);
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Removed from playlist" });
});

// user playlists
router.get("/favourite", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlists = await PlayList.find({ _id: user.playlists });
	res.status(200).send({ data: playlists });
});

// get random playlists
router.get("/random", auth, async (req, res) => {
	const playlists = await PlayList.aggregate([{ $sample: { size: 10 } }]);
	res.status(200).send({ data: playlists });
});

// get playlist by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const playlist = await PlayList.findById(req.params.id);
	if (!playlist) return res.status(404).send("not found");

	const podcasts = await Podcast.find({ _id: playlist.podcasts });
	res.status(200).send({ data: { playlist, podcasts } });
});

// get all playlists
router.get("/", auth, async (req, res) => {
	const playlists = await PlayList.find();
	res.status(200).send({ data: playlists });
});

// delete playlist by id
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
    const user = await User.findById(req.user._id);
    const playlist = await PlayList.findById(req.params.id);
    if (!user._id.equals(playlist.user))
        return res
            .status(403)
            .send({ message: "User don't have access to delete!" });

    // Using findByIdAndDelete to remove the playlist
    if (playlist) {
        await PlayList.findByIdAndDelete(req.params.id);
        const index = user.playlists.indexOf(req.params.id);
        if (index > -1) {
            user.playlists.splice(index, 1); // Only modify the array if the item is found
        }
        await user.save();
        res.status(200).send({ message: "Removed from library" });
    } else {
        res.status(404).send({ message: "Playlist not found" });
    }
});


module.exports = router;
