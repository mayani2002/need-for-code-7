import Express from "express";
import { getUserInfo } from "../controller/getUserInfo_controller.js";
import { setUserInfo } from "../controller/survey_response_controller.js";


const route = Express.Router();

route.get('/getUserInfo', getUserInfo);
route.post('/setUserInfo', setUserInfo);

export default route;