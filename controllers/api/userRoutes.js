const router = require("express").Router();
const { User } = require("../../models");

//POST new user
router.post("/signup", async (req, res) => {
	try {
		const user = await User.create(req.body);
		console.log(req.body);
		req.session.save(() => {
			req.session.user_id = user.id;
			req.session.logged_in = true;

			res.status(200).json(user);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

//login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ where: { username: req.body.username } });
		const validatePass = await user.checkPassword(req.body.password);
		if (!user || !validatePass) {
			res.status(400).json({ message: "Wrong Email Or Password" });
			return;
		}
		req.session.save(() => {
			req.session.user_id = user.id;
			req.session.logged_in = true;

			res.json({ user: user, message: "Welcome" });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});
//logout
router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
module.exports = router;
