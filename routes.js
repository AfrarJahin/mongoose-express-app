const express = require("express");
const {User,Phone} = require("./models");
const app = express();

app.post("/add_user", async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/add_phone", async (request, response) => {
    const phone = new Phone(request.body);

    try {
        await phone.save();
        response.send(phone);
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
                as: "phones"
            }
        }
    ]);

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;