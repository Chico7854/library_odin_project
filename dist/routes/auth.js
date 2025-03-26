"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = require("express");
const { body } = require("express-validator"); //for some reason it only works this way
const User_1 = __importDefault(require("../models/User"));
const authController = __importStar(require("../controllers/auth"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const router = (0, express_1.Router)();
router.get("/signup", authController.getSignup);
router.post("/signup", [
    body("email")
        .isEmail().withMessage("Invalid email.")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email: email });
        if (user) {
            throw new Error("Email has already been used.");
        }
    }))
        .normalizeEmail(),
    body("password", "Enter a password with numbers and letters and at least 8 characters.").isLength({ min: 8 }).isAlphanumeric().trim(),
    body("confirmPassword").custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error("Passwords don't match.");
        }
    })
], authController.postSignup);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", isAuthenticated_1.default, authController.postLogout);
exports.default = router;
//# sourceMappingURL=auth.js.map