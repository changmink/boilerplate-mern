const express = require('express')
const app = express()
const port = 50000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')
const {User} = require('./models/User')
const {auth} = require('./middleware/auth')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// application/json
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(config.mongodb_url,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log('MongoDB Error:', err))

app.get('/', (req, res) => res.send('Hello world 안녕'))

app.post('/api/users/register', (req, res) => {
    //  회원 가입할떄 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어 준다.

    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({success:false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 해당하는 유저가 없습니다."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            }
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                // 토큰을 저장한다.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},{token: ""} , (err, user) => {
        if(err) return res.json({success: false, err})
        return res.status(200).send({
            success: true
        })
    })
})
app.listen(port, ()=>console.log(`listen ${port}`))