"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const express = require("express");
var app = express();
var cors = require("cors");
const path = require("path");
const multer = require("multer");
app.use(cors({
    credentials: true,
    /////origin: "http://192.168.43.137:3000",
    //// origin: "http://localhost:3000",
    origin: "http://localhost:3000",
}));
app.use(express.json({ limit: "400mb" }));
app.use(express.urlencoded({ limit: "400mb" }));
app.use(cookieParser());
const bcrypt = require("bcrypt");
const { createTokens, validateToken, createTokensUpdate } = require("./jwt");
const express_validator_1 = require("express-validator");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const CONNECTION_CONFIG = {
    user: "root",
    host: "localhost",
    password: "password",
    database: "superdata",
};
// Node.js program to demonstrate the
// Date.format() method
///
///
///
///
///
///
///reg
const register = `INSERT INTO members (username,password,email,billboard1,profile_image,color1,color2,color_type,status,notification,tutorial,date,reg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
///
///login
const login = `SELECT username,id,password,color1,color2,color_type,profile_image,first_name,sur_name,quote,reg,billboard1,billboard2,biography FROM members WHERE username =?`;
///
///checkIsLogged
const loginId = `SELECT username,id,password,color1,color2,color_type,profile_image,first_name,sur_name,quote,reg,billboard1,billboard2,biography  FROM members WHERE id =?`;
///
///usernamecheck
const checkpassword = `SELECT id FROM members WHERE  username =?`;
///checkIsLogged
const posts = `SELECT  (SELECT COUNT(*) 
          FROM comments 
         WHERE post = posts.id)commentCount,


      (SELECT COUNT(*) 
          FROM emotions
         WHERE post = posts.id and type=1)funny, 
         
      (SELECT COUNT(*) 
          FROM emotions
         WHERE post = posts.id and type=2)care, 

            (SELECT COUNT(*) 
          FROM emotions
         WHERE post = posts.id and type=3)cool, 

            (SELECT COUNT(*) 
          FROM emotions
         WHERE post = posts.id and type=4)lovely, 
         
         
         members.profile_image,members.username,color1,posts.id,sender,post_count,topic,
caption,item1,itemtype1,item2,itemtype2,item3,itemtype3,item4,itemtype4,item5,itemtype5,item6,itemtype6,
item7,itemtype7,item8,itemtype8,item9,itemtype9,item10,itemtype10,item11,itemtype11,item12,itemtype12,item13,itemtype13,
item14,itemtype14,item15,itemtype15,item16,itemtype16,time  FROM posts inner join members on
 posts.sender = members.id   ORDER BY posts.id DESC  LIMIT 12  `;
const updateColor = `UPDATE members SET  color1 = ?, color2 = ?, color_type = ? WHERE (id = ?)`;
const updateBasicpage = `UPDATE members SET username = ?, quote=?, biography=?   WHERE (id = ?)`;
const updateProfilePic = `UPDATE members SET profile_image = ?  WHERE (id = ?)`;
const updatebillboardPic = `UPDATE members SET billboard1 = ?  WHERE (id = ?)`;
const createpost = `INSERT INTO posts (sender,post_count,topic,caption,item1,itemtype1,item2,itemtype2,item3,itemtype3,item4,itemtype4,item5,itemtype5,item6,itemtype6,item7,itemtype7,item8,itemtype8,time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
app.get("/", (req, res) => res.send("hello it worked"));
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = "../public/images/posts";
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        var xx = `super${file.originalname}.png`;
        callback(null, xx);
    },
});
var upload = multer({ storage: storage });
app.post("/upload", upload.array("final", 8), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        ////req.files.length
        ////console.log(req.body.fiz);
        var currentTime = new Date();
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        const execQuery = util.promisify(connection.query.bind(connection));
        try {
            yield execQuery(createpost, [
                req.body.id,
                req.files.length,
                req.body.topic,
                req.body.caption,
                req.files[0] ? req.files[0].filename : null,
                req.files[0] ? 1 : null,
                req.files[1] ? req.files[1].filename : null,
                req.files[1] ? 1 : null,
                req.files[2] ? req.files[2].filename : null,
                req.files[2] ? 1 : null,
                req.files[3] ? req.files[3].filename : null,
                req.files[3] ? 1 : null,
                req.files[4] ? req.files[4].filename : null,
                req.files[4] ? 1 : null,
                req.files[5] ? req.files[5].filename : null,
                req.files[5] ? 1 : null,
                req.files[6] ? req.files[6].filename : null,
                req.files[6] ? 1 : null,
                req.files[7] ? req.files[7].filename : null,
                req.files[7] ? 1 : null,
                currentTime,
            ]);
            return res.send({ message: "images uploaded" });
        }
        catch (_a) {
            return res.send({ message: "images upload failed" });
        }
    }
    else {
        return res.send({ message: "no images found" });
    }
}));
const storageProfile = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = "../public/images/profile";
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        var xx = `superProfile${file.originalname}.png`;
        callback(null, xx);
    },
});
var uploadprofile = multer({ storage: storageProfile });
app.post("/profile_upload", uploadprofile.array("finalxx", 1), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        ////req.files.length
        ////console.log(req.body.fiz);
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        const execQuery = util.promisify(connection.query.bind(connection));
        try {
            yield execQuery(updateProfilePic, [req.files[0].filename, req.body.id]);
            return res.send({ message: "profile image uploaded" });
        }
        catch (_b) {
            return res.send({ message: "images upload failed" });
        }
    }
    else {
        return res.send({ message: "no images found" });
    }
}));
const storagebillboard = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = "../public/images/billboard";
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        var xx = `superbillboard${file.originalname}.png`;
        callback(null, xx);
    },
});
var uploadbillboard = multer({ storage: storagebillboard });
app.post("/billboard_upload", uploadbillboard.array("finalxxy", 1), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        ////req.files.length
        ////console.log(req.body.fiz);
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        const execQuery = util.promisify(connection.query.bind(connection));
        try {
            yield execQuery(updatebillboardPic, [
                req.files[0].filename,
                req.body.id,
            ]);
            return res.send({ message: "billboard image uploaded" });
        }
        catch (_c) {
            return res.send({ message: "images upload failed" });
        }
    }
    else {
        return res.send({ message: "no images found" });
    }
}));
app.put("/update_basic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { values } = req.body;
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
    try {
        yield execQuery(updateBasicpage, [
            values.inputedUsername,
            values.inputedQuote,
            values.inputedDescription,
            values.id,
        ]);
        return res.send({ message: "username updated" });
    }
    catch (_d) {
        return res.send({ message: "usernameFailed" });
    }
}));
app.put("/update_color", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { values } = req.body;
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
    try {
        yield execQuery(updateColor, [
            values.color1,
            values.color2,
            values.colortype,
            values.id,
        ]);
        return res.send({ message: "color updated" });
    }
    catch (_e) {
        return res.send({ message: "colorFailed" });
    }
}));
app.post("/feeds_chronological", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const chronologicalQuery = util.promisify(connection.query.bind(connection));
    try {
        const chronologicaldata = yield chronologicalQuery(posts);
        return res.send({
            ///gettingcookie: userSessionData,
            message: "feeds fetched",
            payload: chronologicaldata,
        });
    }
    catch (_f) {
        return res.send({ message: "error in fetching feeds" });
    }
}));
app.post("/keepmeloggedin", validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.accesst) {
        const { values } = req.body;
        const userSessionData = jwt_decode_1.default(req.cookies.accesst);
        const accessToken = createTokensUpdate(userSessionData);
        if (values === "session") {
            return res
                .cookie("accesst", accessToken, {
                sameSite: "strict",
                httpOnly: true,
                //secure: true,
            })
                .send({ message: "session_Cookie_Activated" });
        }
        else if (values === "forever") {
            const days30inseconds = 60 * 60 * 24 * 30 * 1000;
            const CurrentTimePlusSecs = new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000);
            const userSessionData = jwt_decode_1.default(req.cookies.accesst);
            const accessToken = createTokensUpdate(userSessionData);
            return res
                .cookie("accesst", accessToken, {
                sameSite: "strict",
                expires: CurrentTimePlusSecs,
                maxAge: days30inseconds,
                httpOnly: true,
                //secure: true,
            })
                .send({ message: "forever_Cookie_Activated" });
        }
        else {
            const days30inseconds = 2;
            const CurrentTimePlusSecs = new Date(new Date().getTime() + 2);
            const userSessionData = jwt_decode_1.default(req.cookies.accesst);
            const accessToken = createTokensUpdate(userSessionData);
            return res
                .cookie("accesst", accessToken, {
                sameSite: "strict",
                expires: CurrentTimePlusSecs,
                maxAge: days30inseconds,
                httpOnly: true,
                //secure: true,
            })
                .send({ message: "cookie" });
        }
    }
    else {
        return res.send({ message: "cookie null" });
    }
}));
app.post("/checkIsLogged", validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.accesst) {
        const userSessionData = jwt_decode_1.default(req.cookies.accesst);
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        const loginQuery = util.promisify(connection.query.bind(connection));
        try {
            const logindata = yield loginQuery(loginId, [userSessionData.id]);
            const payloadValue = {
                id: logindata[0].id,
                username: logindata[0].username,
                userimage: logindata[0].profile_image,
                usercolor1: logindata[0].color1,
                usercolor2: logindata[0].color2,
                usercolortype: logindata[0].color_type,
                userfirstname: logindata[0].first_name,
                usersurname: logindata[0].sur_name,
                userquote: logindata[0].quote,
                userreg: logindata[0].reg,
                userbillboard1: logindata[0].billboard1,
                userbillboard2: logindata[0].billboard2,
                biography: logindata[0].biography,
            };
            return res.send({
                ///gettingcookie: userSessionData,
                message: "logged in",
                payload: payloadValue,
            });
        }
        catch (_g) {
            return res.send({ message: "Wrong id" });
        }
    }
    else {
        return res.send({
            message: "logged out",
        });
    }
}));
app.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.accesst) {
        return res.clearCookie("accesst").send({ message: "cookie deleted" });
    }
    else {
        return res.send({ message: "cookie null" });
    }
}));
app.post("/usernamecheck", express_validator_1.body("value")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateErrors = express_validator_1.validationResult(req);
    if (!validateErrors.isEmpty()) {
        return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: validateErrors,
        });
    }
    else {
        const username = req.body.value;
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        const checkpassQuery = util.promisify(connection.query.bind(connection));
        try {
            const checkresult = yield checkpassQuery(checkpassword, [username]);
            const IdIsAvailable = checkresult[0].id;
            if (IdIsAvailable) {
                return res.send({ message: "username is not unique" });
            }
        }
        catch (_h) {
            return res.send({ message: "username is available" });
        }
    }
}));
app.post("/loging", express_validator_1.body("values.inputedUsername")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"), express_validator_1.body("values.inputedPassword")
    .isLength({ min: 8 })
    .exists({ checkFalsy: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateErrors = express_validator_1.validationResult(req);
    if (!validateErrors.isEmpty()) {
        return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: validateErrors,
        });
    }
    else {
        const { values } = req.body;
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        const loginQuery = util.promisify(connection.query.bind(connection));
        try {
            const logindata = yield loginQuery(login, [values.inputedUsername]);
            const DatabasePassword = logindata[0].password;
            const PasswordMatchResult = yield bcrypt.compare(values.inputedPassword, DatabasePassword);
            if (!PasswordMatchResult) {
                return res.send({ message: "Wrong Password" });
            }
            else {
                const payloadValue = {
                    id: logindata[0].id,
                    username: logindata[0].username,
                    userimage: logindata[0].profile_image,
                    usercolor1: logindata[0].color1,
                    usercolor2: logindata[0].color2,
                    usercolortype: logindata[0].color_type,
                    userfirstname: logindata[0].first_name,
                    usersurname: logindata[0].sur_name,
                    userquote: logindata[0].quote,
                    userreg: logindata[0].reg,
                    userbillboard1: logindata[0].billboard1,
                    userbillboard2: logindata[0].billboard2,
                    biography: logindata[0].biography,
                };
                const days30inseconds = 60 * 60 * 24 * 30 * 1000;
                const CurrentTimePlusSecs = new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000);
                const accessToken = createTokens(logindata);
                //res.clearCookie("accesst");
                //const tokenxx = req.cookies.accesst;
                //const user = jwt_decode(tokenxx);
                ///setting the cookie
                return res
                    .cookie("accesst", accessToken, {
                    sameSite: "strict",
                    expires: CurrentTimePlusSecs,
                    maxAge: days30inseconds,
                    httpOnly: true,
                    //secure: true,
                })
                    .send({ payload: payloadValue });
            }
        }
        catch (_j) {
            return res.send({ message: "Wrong username" });
        }
    }
}));
app.post("/registration", express_validator_1.body("values.inputedEmail")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }), express_validator_1.body("values.inputedUsername")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"), express_validator_1.body("values.inputedPassword")
    .isLength({ min: 8 })
    .exists({ checkFalsy: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateErrors = express_validator_1.validationResult(req);
    if (!validateErrors.isEmpty()) {
        return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: validateErrors,
        });
    }
    else {
        const { values } = req.body;
        const color = "#cccccc";
        var currentTime = new Date();
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        const execQuery = util.promisify(connection.query.bind(connection));
        bcrypt.hash(values.inputedPassword, 10).then((hash) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const signupData = yield execQuery(register, [
                    values.inputedUsername,
                    hash,
                    values.inputedEmail,
                    "bill.png",
                    "z.png",
                    color,
                    color,
                    0,
                    1,
                    0,
                    1,
                    currentTime,
                    1,
                ]);
                //console.log("success");
                const payloadValue = {
                    id: signupData.insertId,
                    username: values.inputedUsername,
                    userimage: "z.png",
                    usercolor1: color,
                    usercolor2: color,
                    usercolortype: 0,
                    userfirstname: "",
                    usersurname: "",
                    userquote: " ",
                    userbillboard1: "bill.png",
                    userbillboard2: "",
                    biography: "",
                };
                const days30inseconds = 60 * 60 * 24 * 30 * 1000;
                const CurrentTimePlusSecs = new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000);
                const accessToken = createTokensUpdate(payloadValue);
                //res.clearCookie("accesst");
                //const tokenxx = req.cookies.accesst;
                //const user = jwt_decode(tokenxx);
                ///setting the cookie
                return res
                    .cookie("accesst", accessToken, {
                    sameSite: "strict",
                    expires: CurrentTimePlusSecs,
                    maxAge: days30inseconds,
                    httpOnly: true,
                    //secure: true,
                })
                    .send({ payload: payloadValue });
            }
            catch (err) {
                console.error(err.code);
                if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
                    return res.send({ message: "username not unique" });
                }
                else {
                    return res.send({ message: "error" });
                }
            }
        }));
    }
}));
app.listen(1000, () => {
    console.log("running");
});
