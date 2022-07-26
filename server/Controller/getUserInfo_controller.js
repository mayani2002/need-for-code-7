// import { response } from "express"
import users from "../Schema/users.js";

export const storeContactConsent = async (request, response) => {

    try {

        const exist = await users.findOne({ email: email });

        const newUser = await users.update( //query to be changed
            { email: email },

            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                userType: userType,
            }, { upsert: true });

        if (exist) {
            response.status(200).json('Data fetched sucessfully!');
        } else {
            response.status(200).json('User does not exist');
        }

    } catch (error) {
        console.log(error);
        // response.status(500).json({ msg: error, severity: "error" });
    }
} 