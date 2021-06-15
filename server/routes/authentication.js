var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator/check");

var authentication_controller = require("../controllers/authentication");
//var user_controller = require("../controllers/user");

router.post(
  "/signup",
  [
    // check username
    check("username")
      .isLength({ min: 4 })
      .withMessage("El nombre de usuario debe contener al menos 4 caracteres alfanuméricos"),
    // check password
    check("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe contener al menos 6 caracteres alfanuméricos")
      .matches(/\d/)
      .withMessage("La contraseña debe contener al menos un número"),
    // check email
    check("email")
      .isEmail()
      .withMessage("El email no es valido")
  ],
  authentication_controller.signup
);

// auto login, remember me function
router.post("/autologin", authentication_controller.autologin);

// manual login
router.post(
  "/login",
  [
    // check username
    check("username")
      .not()
      .isEmpty()
      .withMessage("El nombre de usuario no debe estar vacío"),
    // check password
    check("password")
      .not()
      .isEmpty()
      .withMessage("La contraseña no debe estar vacía")
  ],
  authentication_controller.login
);

// logout
router.post("/logout", authentication_controller.logout);

router.post(
  "/update",
  [
    // check _id
    check("_id")
      .not()
      .isEmpty()
      .withMessage("El ID de usuario está vacío"),
    // check username
    check("username")
      .isLength({ min: 4 })
      .withMessage("El nombre de usuario debe contener al menos 4 caracteres alfanuméricos"),
    // check email
    check("email")
      .isEmail()
      .withMessage("El email no es válido")
  ],
  authentication_controller.update
);

router.post(
  "/resetpwd",
  [
    // check username
    check("username")
      .not()
      .isEmpty()
      .withMessage("El nombre de usuario no puede estar vacío"),
    // check current password
    check("password")
      .not()
      .isEmpty()
      .withMessage("La contraseña no puede estar vacía"),
    // check new password
    check("newpwd")
      .not()
      .isEmpty()
      .withMessage("La nueva contraseña no puede estar vacía")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe contener al menos 6 caracteres alfanuméricos")
      .matches(/\d/)
      .withMessage("La contraseña debe contener al menos un número"),
    // check confirm password
    check("confirmpwd")
      .not()
      .isEmpty()
      .withMessage("La repetición de la nueva contraseña no debe estar vacía"),
    // check confirm password
    check("confirmpwd").custom((value, { req }) => {
      if (value !== req.body.newpwd) {
        throw new Error("La repetición de la nueva contraseña no coincide con la nueva contraseña");
      }
      return true;
    })
  ],
  authentication_controller.resetpwd
);

module.exports = router;
