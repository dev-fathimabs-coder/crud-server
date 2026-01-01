let express = require('express')
let Users = require('./user')
let connectDb = require('./userDb')

connectDb();

let app = express()
app.use(express.json())

//INSERT DATA INTO COLLECTION

app.post('/users', async (req, res) => {
    try {
        //console.log(req.body); 
        let { email } = req.body;
        // console.log(email);
        let isUserExist = await Users.findOne({ email })
        if (isUserExist) {
            return res.send('Entered email is already exist')
        } else {

            let user = await Users.create(req.body);
            res.json(user);
        }
    } catch (error) {
        res.send(error)
    }
})



// GET USERS FROM COLLECTION

app.get('/all-users', async (req, res) => {

    try {
        let result = await Users.find()
        res.send(result)
        // console.log(result);
    } catch (error) {
        console.log("Collection is empty", error);

    }
})

//GET SINGLE USER BY ID
app.get('/user/:id', async (req, res) => {
    try {
        let usersId = req.params.id
        let userDetails = await Users.findOne({ _id: usersId })
        res.send(userDetails)


    } catch (error) {
        console.log("No Result found");

    }
})

//UPDATE DATA BY ID

app.patch('/update/:id', async (req, res) => {
    let userId = req.params.id
    // console.log(email);

    try {
        if (!userId) {
            return console.log("The User Id Doesn't exist");

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
        console.log("Data Updated Succdessfully");
    } catch (error) {
        console.error("Something is wrong");
    }
})

app.listen(3000, () => {
    console.log("Crud-App server Connected");
})