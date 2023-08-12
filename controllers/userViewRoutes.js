const router = require("express").Router();
const { User, Post } = require("../models");
const Auth = require("../utils/auth");

// GET /
router.get("/", async (req, res) => {
	try {
		const PostsData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ["username"],
				},
			],
		});
		const Posts = PostsData.map((post) => post.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("homepage", {
			Posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// GET /login
router.get("/login", async (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect("/userProfile");
		return;
	}

	res.render("login");
});

router.get("/profile", Auth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ["password"] },
			include: [{ model: Post }],
		});

		const user = userData.get({ plain: true });

		res.render("userProfile", {
			...user,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
