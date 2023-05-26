import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index.js";

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      console.log(
        "1111111111111111111",
        data,
        data.email,
        hashPasswordFromBcrypt
      );
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("tao thanh cong");
    } catch (e) {
      reject(e);
    }
  });
  // let hashPasswordFromBcrypt = await hashUserPassword(data.password);
  // console.log("1111111111111111111", data, hashPasswordFromBcrypt);
  // resolve(hashPasswordFromBcrypt);
};
let hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      var hashPassWord = bcrypt.hashSync(password, salt);
      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
};
