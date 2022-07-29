const util = require("util");
const mysql = require("mysql");
const fs = require("fs");
const sharp = require('sharp');
const unlinkFile = util.promisify(fs.unlink);

import dotenv from "dotenv";
dotenv.config();

const cookieParser = require("cookie-parser");
import express = require("express");
import {generateUploadURL} from "./ss3";





var app: Application = express();
var cors = require("cors");

const path = require("path");

const multer = require("multer");
const { uploadFileTos3, getFileStreamFroms3 } = require("./s3");

if (process.env.APP_STATE === "dev") {

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


} else {
  app.use(cors());
}

  


app.use(express.json({ limit: "400mb" }));
app.use(express.urlencoded({ limit: "400mb" }));

app.use(cookieParser());
const bcrypt = require("bcrypt");
const { createTokens, validateToken, createTokensUpdate } = require("./jwt");
import { Request, Response, Application } from "express";
import { body, validationResult } from "express-validator";

import jwt_decode from "jwt-decode";
const CONNECTION_CONFIG = {
  user: process.env.USER_DATABASE,
  host: process.env.HOST_DATABASE,
  password:process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE_NAME,
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


const register = `INSERT INTO members (username,password,email,billboard1,billboardthumb1,profile_image,profile_image_thumb,color1,color2,color_type,status,notification,tutorial,date,reg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
///
///login
const login = `SELECT username,id,password,color1,color2,color_type,profile_image,profile_image_thumb,first_name,sur_name,quote,reg,billboard1,billboardthumb1,billboard2,billboardthumb2,biography FROM members WHERE username =?`;
///

///checkIsLogged
const loginId = `SELECT username,id,password,color1,color2,color_type,profile_image,profile_image_thumb,first_name,sur_name,quote,reg,billboard1,billboardthumb1,billboard2,billboardthumb2,biography  FROM members WHERE id =?`;
///
///usernamecheck
const checkpassword = `SELECT id FROM members WHERE  username =?`;






const getstickers = `SELECT stickname FROM stickers  ORDER BY id DESC  LIMIT 30  `;


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
caption,item1,thumb1,itemtype1,item2,thumb2,itemtype2,item3,thumb3,itemtype3,item4,thumb4,itemtype4,item5,thumb5,itemtype5,item6,thumb6,itemtype6,
item7,thumb7,itemtype7,item8,thumb8,itemtype8,item9,itemtype9,item10,itemtype10,item11,itemtype11,item12,itemtype12,item13,itemtype13,
item14,itemtype14,item15,itemtype15,item16,itemtype16,time  FROM posts inner join members on
 posts.sender = members.id   ORDER BY posts.id DESC  LIMIT 25  `;
 

const updateColor = `UPDATE members SET  color1 = ?, color2 = ?, color_type = ? WHERE (id = ?)`;

const updateBasicpage = `UPDATE members SET username = ?, quote=?, biography=?   WHERE (id = ?)`;

const updateProfilePic = `UPDATE members SET profile_image = ?, profile_image_thumb = ?, color1 = ?, color2 = ?, color_type = ?  WHERE (id = ?)`;


const updateSticker= `INSERT INTO stickers (stickname,user) VALUES (?,?)`;


const updatebillboardPic = `UPDATE members SET billboard1 = ?, billboardthumb1 = ?  WHERE (id = ?)`;

const createpost = `INSERT INTO posts (sender,post_count,topic,caption,item1,thumb1,itemtype1,item2,thumb2,itemtype2,item3,thumb3,itemtype3,item4,thumb4,itemtype4,item5,thumb5,itemtype5,item6,thumb6,itemtype6,item7,thumb7,itemtype7,item8,thumb8,itemtype8,time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;








app.post(
  "/get_signed_url_4upload_post",
  async (req: any, res: any) => {

  const { values } = req.body;
var holder=[];
   for (let i = 0; i < values.count; i++) {
        const urlHD = await generateUploadURL();
const urlThumb = await generateUploadURL();
var cc={urlHD :urlHD,urlThumb:urlThumb}
holder[i]=cc;

if(values.count - 1 === i){

  res.send({holder})
}    }

});





app.post(
  "/get_signed_url_Sticker",
  async (req: any, res: any) => {
const url = await generateUploadURL();
res.send({url}) });



app.post("/sticker_upload_data", async (req: Request, res: Response) => {
  const { values } = req.body;
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  
  try {
    await execQuery(updateSticker, [
      values.imagedata,
      values.id,
    ]);
    return res.send({ message: "sticker image data updated" });
  } catch {
    return res.send({ message: "Failed" });
  }
});




app.post(
  "/get_signed_url_4upload",
  async (req: any, res: any) => {
const urlHD = await generateUploadURL();
const urlThumb = await generateUploadURL();
const url={urlHD:urlHD,urlThumb:urlThumb};
res.send({url}) });


app.put("/profile_upload_data", async (req: Request, res: Response) => {
  const { values } = req.body;
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  
  try {
    await execQuery(updateProfilePic, [
      values.imagedata,
      values.imagedataThumb,
       values.color,
        values.color2,
         0,
      values.id,
    ]);
    return res.send({ message: "profile image data updated" });
  } catch {
    return res.send({ message: "Failed" });
  }
});




app.put(
  "/billboard_upload_data",
  async (req: any, res: any, next: any) => {
  const { values } = req.body;
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const execQuery = util.promisify(connection.query.bind(connection));
      try {
        await execQuery(updatebillboardPic, [  values.imagedata,
      values.imagedataThumb,
      values.id,]);
        return res.send({
          message: "billboard image uploaded",
        });
      } catch {
        return res.send({ message: "images upload failed" });
      }
  }
);


app.post(
  "/post_upload_data",
  async (req: any, res: any, next: any) => {
  const { values } = req.body;

   var currentTime = new Date();
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const execQuery = util.promisify(connection.query.bind(connection));
      try {
        await execQuery(createpost, [
          values.id,
          values.all.length,
           values.topic,
           values.caption,
          values.all[0] ? values.all[0].imagedata : null,
            values.all[0] ? values.all[0].imagedataThumb : null,
          values.all[0] ? 1 : null,
         values.all[1] ? values.all[1].imagedata : null,
            values.all[1] ? values.all[1].imagedataThumb : null,
         values.all[1] ? 1 : null,
         values.all[2] ? values.all[2].imagedata : null,
            values.all[2] ? values.all[2].imagedataThumb : null,
         values.all[2] ? 1 : null,
         values.all[3] ? values.all[3].imagedata : null,
            values.all[3] ? values.all[3].imagedataThumb : null,
        values.all[3] ? 1 : null,
         values.all[4] ? values.all[4].imagedata : null,
            values.all[4] ? values.all[4].imagedataThumb : null,
         values.all[4] ? 1 : null,
        values.all[5]  ? values.all[5].imagedata : null,
           values.all[5] ? values.all[5].imagedataThumb : null,
         values.all[5] ? 1 : null,
        values.all[6] ? values.all[6].imagedata : null,
           values.all[6] ? values.all[6].imagedataThumb : null,
        values.all[6] ? 1 : null,
         values.all[7] ? values.all[7].imagedata : null,
            values.all[7] ? values.all[7].imagedataThumb : null,
         values.all[7] ? 1 : null,
          currentTime,
        ]);
        return res.send({ message: "images uploaded" });
      } catch {
        return res.send({ message: "images upload failed" });
      }
  }
);





app.put("/update_basic", async (req: Request, res: Response) => {
  const { values } = req.body;
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(updateBasicpage, [
      values.inputedUsername,
      values.inputedQuote,
      values.inputedDescription,
      values.id,
    ]);
    return res.send({ message: "username updated" });
  } catch {
    return res.send({ message: "usernameFailed" });
  }
});

app.put("/update_color", async (req: Request, res: Response) => {
  const { values } = req.body;
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(updateColor, [
      values.color1,
      values.color2,
      values.colortype,
      values.id,
    ]);
    return res.send({ message: "color updated" });
  } catch {
    return res.send({ message: "colorFailed" });
  }
});


app.post("/feeds_stickers", async (req: Request, res: Response) => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const chronologicalQuery = util.promisify(connection.query.bind(connection));
  try {
    const chronologicaldata = await chronologicalQuery(getstickers);

    return res.send({
      ///gettingcookie: userSessionData,
      message: "feeds fetched",
      payload: chronologicaldata,
    });
  } catch {
    return res.send({ message: "error in fetching feeds" });
  }
});



app.post("/feeds_chronological", async (req: Request, res: Response) => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const chronologicalQuery = util.promisify(connection.query.bind(connection));
  try {
    const chronologicaldata = await chronologicalQuery(posts);

    return res.send({
      ///gettingcookie: userSessionData,
      message: "feeds fetched",
      payload: chronologicaldata,
    });
  } catch {
    return res.send({ message: "error in fetching feeds" });
  }
});

app.post(
  "/keepmeloggedin",
  validateToken,
  async (req: Request, res: Response) => {
    if (req.cookies.accesst) {
      const { values } = req.body;
      const userSessionData: any = jwt_decode(req.cookies.accesst);
      const accessToken = createTokensUpdate(userSessionData);
      if (values === "session") {
        return res
          .cookie("accesst", accessToken, {
            sameSite: "strict",
            httpOnly: true,
            //secure: true,
          })
          .send({ message: "session_Cookie_Activated" });
      } else if (values === "forever") {
        const days30inseconds = 60 * 60 * 24 * 30 * 1000;
        const CurrentTimePlusSecs = new Date(
          new Date().getTime() + 60 * 60 * 24 * 30 * 1000
        );

        const userSessionData: any = jwt_decode(req.cookies.accesst);
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
      } else {
        const days30inseconds = 2;
        const CurrentTimePlusSecs = new Date(new Date().getTime() + 2);

        const userSessionData: any = jwt_decode(req.cookies.accesst);
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
    } else {
      return res.send({ message: "cookie null" });
    }
  }
);




app.post(
  "/checkIsLogged",
  validateToken,
  async (req: Request, res: Response) => {
    if (req.cookies.accesst) {
      const userSessionData: any = jwt_decode(req.cookies.accesst);

      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const loginQuery = util.promisify(connection.query.bind(connection));
      try {
        const logindata = await loginQuery(loginId, [userSessionData.id]);

        const payloadValue = {
          id: logindata[0].id,
          username: logindata[0].username,
          userimage: logindata[0].profile_image,
           userimagethumb: logindata[0].profile_image_thumb,
          usercolor1: logindata[0].color1,
          usercolor2: logindata[0].color2,
          usercolortype: logindata[0].color_type,
          userfirstname: logindata[0].first_name,
          usersurname: logindata[0].sur_name,
          userquote: logindata[0].quote,
          userreg: logindata[0].reg,
          userbillboard1: logindata[0].billboard1,
            userbillboardthumb1: logindata[0].billboardthumb1,
          userbillboard2: logindata[0].billboard2,
             userbillboardthumb2: logindata[0].billboardthumb2,
          biography: logindata[0].biography,
        };

        return res.send({
          ///gettingcookie: userSessionData,
          message: "logged in",
          payload: payloadValue,
        });
      } catch {
        return res.send({ message: "Wrong id" });
      }
    } else {
      return res.send({
        message: "logged out",
      });
    }
  }
);

app.post("/logout", async (req: Request, res: Response) => {
  if (req.cookies.accesst) {
    return res.clearCookie("accesst").send({ message: "cookie deleted" });
  } else {
    return res.send({ message: "cookie null" });
  }
});

app.post(
  "/usernamecheck",
  body("value")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"),
  async (req: Request, res: Response) => {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: validateErrors,
      });
    } else {
      const username = req.body.value;
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const checkpassQuery = util.promisify(connection.query.bind(connection));
      try {
        const checkresult = await checkpassQuery(checkpassword, [username]);
        const IdIsAvailable = checkresult[0].id;
        if (IdIsAvailable) {
          return res.send({ message: "username is not unique" });
        }
      } catch {
        return res.send({ message: "username is available" });
      }
    }
  }
);

app.post(
  "/loging",
  body("values.inputedUsername")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"),
  body("values.inputedPassword")
    .isLength({ min: 8 })
    .exists({ checkFalsy: true }),
  async (req: Request, res: Response) => {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: validateErrors,
      });
    } else {
      const { values } = req.body;
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const loginQuery = util.promisify(connection.query.bind(connection));
      try {
        const logindata = await loginQuery(login, [values.inputedUsername]);
        const DatabasePassword = logindata[0].password;
        const PasswordMatchResult = await bcrypt.compare(
          values.inputedPassword,
          DatabasePassword
        );
        
        if (!PasswordMatchResult) {
          return res.send({ message: "Wrong Password" });
        } else {
         const payloadValue = {
          id: logindata[0].id,
          username: logindata[0].username,
          userimage: logindata[0].profile_image,
           userimagethumb: logindata[0].profile_image_thumb,
          usercolor1: logindata[0].color1,
          usercolor2: logindata[0].color2,
          usercolortype: logindata[0].color_type,
          userfirstname: logindata[0].first_name,
          usersurname: logindata[0].sur_name,
          userquote: logindata[0].quote,
          userreg: logindata[0].reg,
          userbillboard1: logindata[0].billboard1,
            userbillboardthumb1: logindata[0].billboardthumb1,
          userbillboard2: logindata[0].billboard2,
             userbillboardthumb2: logindata[0].billboardthumb2,
          biography: logindata[0].biography,
        };
          const days30inseconds = 60 * 60 * 24 * 30 * 1000;
          const CurrentTimePlusSecs = new Date(
            new Date().getTime() + 60 * 60 * 24 * 30 * 1000
          );
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
      } catch {
        return res.send({ message: "Wrong username" });
      }
    }
  }
);


function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var colorHolder=["#32a852","#32a0a8","#6f32a8","#a83265","#a4a832"];

app.post(
  "/registration",
  body("values.inputedEmail")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  body("values.inputedUsername")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"),
  body("values.inputedPassword")
    .isLength({ min: 8 })
    .exists({ checkFalsy: true }),
  async (req: Request, res: Response) => {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: validateErrors,
      });
    } else {
      const { values } = req.body;


      
       var  colorans=getRandomInt(0,4);

var color =colorHolder[colorans];
      var currentTime = new Date();
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const execQuery = util.promisify(connection.query.bind(connection));
      bcrypt.hash(values.inputedPassword, 10).then(async (hash: string) => {
        try {
          const signupData = await execQuery(register, [
            values.inputedUsername,
            hash,
            values.inputedEmail,
            "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/fc284f4924c7405bb44ab8e2c3f05891",
            "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/94e85f77e13ff88e7deb98d65975f39a",
            "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/98356ee74f016f6e019ec687d3a54982",
            "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/2c38be850a49ff355ba1e13a40ebe3f0",
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
            userimage: "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/98356ee74f016f6e019ec687d3a54982",
            userimagethumb: "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/2c38be850a49ff355ba1e13a40ebe3f0",
            usercolor1: color,
            usercolor2: color,
            usercolortype: 0,
            userfirstname: "",
            usersurname: "",
            userquote: " ",
            userbillboard1: "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/fc284f4924c7405bb44ab8e2c3f05891",
             userbillboardthumb1: "https://superstarz-data-tank.s3.eu-west-2.amazonaws.com/94e85f77e13ff88e7deb98d65975f39a",
            userbillboard2: "",
            biography: "",
          };

          const days30inseconds = 60 * 60 * 24 * 30 * 1000;
          const CurrentTimePlusSecs = new Date(
            new Date().getTime() + 60 * 60 * 24 * 30 * 1000
          );
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
        } catch (err: any) {
          console.error(err.code);
          if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
            return res.send({ message: "username not unique" });
          } else {
            return res.send({ message: "error" });
          }
        }
      });
    }
  }
);




if (process.env.APP_STATE === "prod") {
  var staticServe = express.static(path.join(__dirname, "../../", "build"));
  app.use("/", staticServe);

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../../", "build", "index.html"))
  );
}

app.listen(process.env.LISTEN, (): any => {
 console.log("runnning");
});
