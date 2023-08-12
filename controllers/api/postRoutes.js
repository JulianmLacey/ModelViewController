const router = require("express").Router();
const { Post, User } = require("../../models");
const Auth = require("../../utils/auth");

//GET ALL posts
router.get("/", async (req, res) => {
	try {
		const Posts = await Post.findAll({ include: [{ model: User, attributes: ["username"] }] });

		res.status(200).json(Posts);
	} catch (err) {
		res.status(400).json(err);
	}
});

//POST new post
router.post("/", Auth, async (req, res) => {
	try {
		const newProject = await Post.create({
			...req.body,
			creator: req.session.user_id,
		});

		res.status(200).json(newProject);
	} catch (err) {
		res.status(400).json(err);
	}
});
module.exports = router;
