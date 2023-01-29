const express = require("express");
const {User, Phone, Comment, Post} = require("./models");
const app = express();

app.post("/user", async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/phone", async (request, response) => {
    const phone = new Phone(request.body);

    try {
        await phone.save();
        response.send(phone);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.post("/comment", async (request, response) => {
    const comment = new Comment(request.body);

    try {
        await comment.save();
        response.send(comment);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/post", async (request, response) => {
    const post = new Post(request.body);
    try {
        await post.save();
        response.send(post);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await User.aggregate([
        {
            $lookup: {
                from: "phones",
                localField: "_id",
                foreignField: "user",
                as: "phone"
            },
        },
        /* {
             $unwind: "$phones"
         },*/
    ]);

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/phones", async (request, response) => {
    const phones = await Phone.find().populate('user');

    try {
        response.send(phones);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/comments", async (request, response) => {
    const phones = await Comment.find().populate('post');

    try {
        response.send(phones);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/post", async (request, response) => {
    const cposts = await Post.find().populate('user');
    const posts = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "     ",
                foreignField: "post",
                as: "comment"
            },

        },
        {
            $project: {
                "user.name": 1,
                "comment.comment": 1,
            }
        }
    ]);

    try {
        response.send({cposts, posts});
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;
