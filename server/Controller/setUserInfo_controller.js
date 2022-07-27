// import { response } from "express"
import users from "../Schema/users.js";

export const storeContactConsent = async (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    let userType = request.body.userType;
    let password = request.body.password;

    try {

        const exist = await users.findOne({ email: email });

        const newUser = await users.update(
            { email: email },

            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                userType: userType,
                password: password,
            }, { upsert: true });

        if (exist) {
            response.status(200).json('User already exists, the details are updated!');
        } else {
            response.status(200).json('User added sucessfully!!');
        }

    } catch (error) {
        console.log(error);
        // response.status(500).json({ msg: error, severity: "error" });
    }
} 