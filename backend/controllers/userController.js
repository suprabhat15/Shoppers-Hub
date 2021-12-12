const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    },
  })

  sendToken(user, 201, res);
})

// Login a User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
    return next(new ErrorHandler("Please enter your email & password.",400));
  }

  const user = await User.findOne({email}).select("+password");

  if(!user) {
    return next(new ErrorHandler("Invalid User",401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.",401));
  }

  sendToken(user, 200, res);
})

// Logout User
exports.logoutUser = catchAsyncErrors( async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out"
  });
})

// FORGOT PASSWORD
exports.forgotPassword = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user){
      return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: `ShoppersHub Password Recovery`,
      message
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`
    })

  } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));  
  }
})

// RESET PASSWORD
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    console.log(req.params.token, resetPasswordToken);
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now()},
  })
   
  if(!user) {
    return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
  }

  if(req.body.password != req.body.confirmPassword){
    return next(new ErrorHandler("Passwords does not match",400));
  }  

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
})

// GET USER DETAILS
exports.getUserDetails = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })
})

// UPDATE PASSWORD
exports.updatePassword = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.",401));
  }

  if(req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match",401));
  } 

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
})


// UPDATE USER PROFILE
exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
  
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})

// GET ALL USERS
exports.getAllUsers = catchAsyncErrors( async (req, res, next) => {
  
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  })
})


// GET SINGLE USER
exports.getSingleUser = catchAsyncErrors( async (req, res, next) => {
  
  const user = await User.findById(req.params.id);

  if(!user){
      return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user,
  })
})


// UPDATE USER ROLE
exports.updateUserRole = catchAsyncErrors( async (req, res, next) => {
  
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  if(!user){
    return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
  })
})


// DELETE USER
exports.deleteUser = catchAsyncErrors( async (req, res, next) => {
  
  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  })
})