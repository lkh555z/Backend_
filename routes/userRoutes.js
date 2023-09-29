const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               coordinate:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *               phoneNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               gender:
 *                 type: string
 *               bio:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               token: "your-auth-token"
 *               user:
 *                 username: "exampleuser"
 *                 email: "user@example.com"
 *                 region: "User's Region"
 *                 phoneNumber: "123-456-7890"
 *                 dateOfBirth: "1990-01-01"
 *                 gender: "Male"
 *                 bio: "User's bio"
 *                 nickname: "User Nickname"
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: 서버 오류
 */

router.post('/signup', userController.signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate and log in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             example:
 *               token: "your-auth-token"
 *               user:
 *                 username: "exampleuser"
 *                 email: "user@example.com"
 *                 region: "User's Region"
 *                 phoneNumber: "123-456-7890"
 *                 dateOfBirth: "1990-01-01"
 *                 gender: "Male"
 *                 bio: "User's bio"
 *                 nickname: "User Nickname"
 *       401:
 *         description: Invalid username.
 *       402:
 *         description: invalid password.
 *       500:
 *         description: Server error.
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /users/update:
 *   post:
 *     summary: Update user profile
 *     description: Update the user's profile information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               coordinate:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *               phoneNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               gender:
 *                 type: string
 *               bio:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *        description: Invalid request body.
 *       401:
 *        description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.post('/update', authenticate, userController.updateProfile);

/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Get a list of all users
 *     description: Returns a list of all users in the database
 *     responses:
 *       200:
 *         description: A list of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/list', userController.getUserList);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - region
 *         - nickname
 *       properties:
 *         username:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         password:
 *           type: string
 *           description: The user's password.
 *         region:
 *           type: string
 *           description: The user's region.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *         profileImageURL:
 *           type: string
 *           description: The URL of the user's profile image.
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The user's date of birth.
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *           description: The user's gender.
 *         signUpDate:
 *           type: string
 *           format: date
 *           description: The date the user signed up.
 *         bio:
 *           type: string
 *           description: A short bio of the user.
 *         nickname:
 *           type: string
 *           description: The user's nickname.
 *       example:
 *         username: "아이디"
 *         email: "이메일@example.com"
 *         password: "암호화된비밀번호"
 *         region: "서울시 관악구 봉천동"
 *         phoneNumber: "01012345678"
 *         profileImageURL: "image.jpg"
 *         dateOfBirth: "2000-01-01"
 *         gender: "Male"
 *         signUpDate: "2022-01-01"
 *         bio: "안녕하세요"
 *         nickname: "닉네임"
 */
