import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc  Auth user & get token
// @route POST /api/users/login
// @acess public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.
            JWT_SECRET, {
                expiresIn: '30'
            }); 

            //set JWT as hTTP chi cho cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
            });
      
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });

// @desc  Register user
// @route POST /api/users
// @acess public

const registerUser = asyncHandler(async (req, res) => { 
    res.send('register user');
});

// @desc  Logout user / clear cookie
// @route POST /api/users/logout
// @acess Priate

const logoutUser = asyncHandler(async (req, res) => { 
    res.send('logout user');
});

// @desc  Get user profile
// @route GET/api/users/profile
// @acess private

const getUserProfile = asyncHandler(async (req, res) => { 
    res.send('get user profile');
});

// @desc  Update user profile
// @route PUT /api/users/profile
// @acess private

const updateUserProfile = asyncHandler(async (req, res) => { 
    res.send('update user profile');
});

// @desc  Get users
// @route GET /api/users
// @acess private/Admin

const getUsers = asyncHandler(async (req, res) => { 
    res.send('get users');
});

// @desc  Get users by ID
// @route GET /api/users/:id
// @acess private/Admin

const getUserByID = asyncHandler(async (req, res) => { 
    res.send('get users by id');
});

// @desc  Delete user
// @route DELETE /api/users/:id
// @acess private/Admin

const deleteUser = asyncHandler(async (req, res) => { 
    res.send('delete user');
});

// @desc  Update user
// @route PUT /api/users/:id
// @acess private/Admin

const updateUser = asyncHandler(async (req, res) => { 
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
};