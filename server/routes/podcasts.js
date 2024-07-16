const router = require('express').Router();
const { User} = require('../models/user');
const { Podcast, validate } = require('../models/podcast');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validObjectId = require('../middleware/validateObjectId');

// create Podcast
router.post('/', admin, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    const podcast = await Podcast(req.body).save();
    res.status(200).send({ data: podcast, message: 'Podcast created successfully' });
});

//get all podcasts
router.get('/', async (req, res) => {
    const podcasts = await Podcast.find();
    res.status(200).send({ data: podcasts });
});

// update podcast
router.put("/:id", [validObjectId, admin], async (req, res) => {
    const podcast = await Podcast.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true});
    res.status(200).send({ data: podcast, message: "Update podcast successfully" });
})

//delete podcast by id
router.delete("/:id", [validObjectId, admin], async (req, res) => {
    await Podcast.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Podcast deleted successfully" });
});

//like podcast

router.put("/like/:id", [validObjectId, auth], async (req, res) => {
	let resMessage = "";
	const podcast = await Podcast.findById(req.params.id);
	if (!podcast) return res.status(400).send({ message: "podcast does not exist" });

	const user = await User.findById(req.user._id);
	const index = user.likedPodcasts.indexOf(podcast._id);
	if (index === -1) {
		user.likedPodcasts.push(podcast._id);
		resMessage = "Added to your liked podcasts";
	} else {
		user.likedPodcasts.splice(index, 1);
		resMessage = "Removed from your liked podcast";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
});
//get all liked podcasts
router.get("/like", auth, async (req, res) => {
    const user = await User.findById(req.user._id)
    const podcasts = await Podcast.find({ _id: user.likedPodcasts });
    res.status(200).send({ data: podcasts });
});

module.exports = router;