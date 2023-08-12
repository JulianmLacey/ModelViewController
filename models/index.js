const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, {
	foreignKey: "creator",
	onDelete: "CASCADE",
});
Post.belongsTo(User, {
	foreignKey: "creator",
});

Post.hasMany(Comment, {
	foreignKey: "post_id",
});
Comment.belongsTo(Post, {
	foreignKey: "post_id",
});

User.hasMany(Comment, {
	foreignKey: "creator",
	onDelete: "CASCADE",
});
Comment.belongsTo(User, {
	foreignKey: "creator",
});

module.exports = { User, Post, Comment };
