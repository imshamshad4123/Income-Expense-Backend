const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const { AppErr, appErr } = require("../../utils/appError");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");


//register
const userRegisterCtrl = async (req, res,next) => {

    const { fullname, email, password } = req.body
    console.log(fullname)
    try {
        const userFound = await User.findOne({ email })

        //check if email exist
        if (userFound) {
            return next(new AppErr("Invalid Credentials! Try something else!", 400));
        }
        // //check if fields are empty
        if (!email || !password || !fullname) {
            return next(new AppErr("Fields Cannot be blank!", 400));
        }
        // //hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        })
        res.json({
            status: 'success',
            fullname: user.fullname,
            id: user._id,
        })
        // res.json({
        //     message:"user created",
        // })
        console.log("newuser")
    } catch (error) {
        next(new AppErr(error.message,500))
    
    }
};

//login rotefunction


const userLoginCtrl = async (req, res, next) => {

    const { email, password } = req.body

    try {

        //check if email exist in db
        const userFound = await User.findOne({ email })
        if (!userFound) {
            // return res.json({msg:"Invalid credentials!"})
            return next(new AppErr("Invalid Credentials!", 400));
        }

        //cheeck if password matches
        const comparePassword = await bcrypt.compare(password, userFound.password)
        if (!comparePassword) {
            return next(new AppErr("Invalid Credentials!", 400));
        }
        res.json({
            status: "success",
            fullname: userFound.fullname,
            token: generateToken(userFound._id)

        })
    } catch (error) {
        next(new AppErr(error.message,500))
    
    }
};

const getUser = async (req, res,next) => {

    // const result=verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA4YWFhMGZlZDg2NTcxYmZhNGM1YyIsImlhdCI6MTcwMTk3Mjk2MywiZXhwIjoxNzAyMDU5MzYzfQ.283P8fQAM-VBb2jSTGh7bne4-wi3F5XunxUJQVXlY3c")

    // console.log(result)

    // how to get the token from header
    // console.log(req.headers)

    // const headerObj=req.headers;
    // const token=headerObj["authorization"].split(" ")[1]
    // const result=verifyToken(token)
    // console.log(result)
    try {
        const user = await User.findById(req.user).populate('accounts')
        res.json(user)
    } catch (error) {
        next(new AppErr(error.message,500))
    
    }

}


//update user
//PUT api/v1/users/:id
const updateUser = async (req, res,next) => {
    try {
        //check if email exisit
        if (req.body.email){
            const userFound = await User.findOne({email:req.body.email})
            if (userFound) {
                return next(new AppErr("Email already Exist", 400))
        }
        }
        
        //check if user is updating the password
        if (req.body.password) {
            const salt = bcrypt.genSalt(10)
            const hashedPassword =  await bcrypt.hash(req.body.password,salt)

            //update the user
            const user = await User.findByIdAndUpdate(
                req.user,
                {
                    password: hashedPassword
                }, {
                new: true,
                runValidators: true
            }
            )
            //send the response
            res.status(200).json({
                status: "success",
                data: user
            })


        }
        //if user is providing other credentials to update instead of password
        const user = await User.findByIdAndUpdate(req.user, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data: user
        })

    } catch (error) {
        next(new AppErr(error.message,500))
    
    }

};

//DELETE api/v1/getuser/:id
const deleteUser = async (req, res,next) => {
    try {
        await User.findByIdAndDelete(req.user)
        res.status(200).json({
            status:"success",
            data:null
        })
        // res.json({
        //     "message": "delete user"
        // })
    } catch (error) {
        next(new AppErr(error.message,500))
    }

};
module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    getUser,
    updateUser,
    deleteUser,


}