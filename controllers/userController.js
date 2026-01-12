const Users = require("../models/user");





let addUser = async (req, res) => {

        try {
        // console.log(req.body); 
        let { email } = req.body;
        // console.log(email);
        let isUserExist = await Users.findOne({ email })


        if (isUserExist) {
            return res.status(409).json({ message: "Email already exists" });
        } else {

            let user = await Users.create(req.body);


            res.json(user);
        }
    } catch (error) {
        res.send(error)
    }
}


let getAllUsers = async (req, res) => {

    try {
        let result = await Users.find()
        res.send(result)
        // console.log(result);
    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}


let getUserById = async (req, res) => {
    try {
        let usersId = req.params.id
        let userDetails = await Users.findOne({ _id: usersId })
        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }
        res.send(userDetails)


    } catch (error) {
        console.log("No Result found");

    }
}

let updateUserById = async (req, res) => {
    let userId = req.params.id
    // console.log(email);

    try {
        if (!userId) {
            return res.status(404).json({ message: "User not found" });

        }

        let userData = await Users.findOne({ _id: userId })
        // console.log(userData);
        if (!userData) {
            return console.log("The User Doesn't exist");
        }
        let { email, username } = req.body
        // console.log(email);

        if (email) userData.email = email
        if (username) userData.username = username
        //   console.log(  userData.username);
        await userData.save();
        res.json({ message: "Data Updated successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
}


let deleteUser = async (req, res) => {
    let deleteId = req.params.id
    try {
        let deleteData = await Users.findByIdAndDelete({ _id: deleteId });
        if (!deleteData) {
            return res.status(404).json({ message: "User Not found" });
        }
        res.json({ message: "User deleted successfully" })

    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }

}

module.exports = { addUser, getAllUsers, getUserById, updateUserById, deleteUser }














