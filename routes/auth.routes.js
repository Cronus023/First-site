const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('D:/Javascript/NIce/models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('login', 'Минимальная длина логина 6 символов').isLength({ min: 6 }),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
    check('email', 'Некорректный email').isEmail()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
    }

    const {login,password,email} = req.body
    const date = new Date()
    let s = date.getDay()+'.'+date.getDate()+'.'+ date.getFullYear()

    const candidate = await User.findOne({ email, login,password })
    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({login, password: hashedPassword ,email, isDeleted:false, isBlocked:false, dataRegistration:new Date() })
    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('login', 'Минимальная длина логина 6 символов').isLength({ min: 6 }),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
    check('email', 'Некорректный email').isEmail()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }
   
    const {login,email, password,userIsDeleted} = req.body
    
    const user = await User.findOne({ email,login })
    user.isDeleted = userIsDeleted
    if(user.isDeleted == true)
    {
      await User.deleteOne({_id: user.id}, function(err, result){  
      });
      localStorage.clear()
      return res.status(400).json({ message: 'Вы или кто-то удалил вас, обновите страницу и зарегистрируйтесь снова' })
    }

    if(user.isBlocked)
    {
      return res.status(400).json({ message: 'Пользователь заблокирован' })
    }

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const users = await User.find({})
    const token = jwt.sign(
      { 
        userId: user.id,
        IsDeleted: false,
        ALLusers:users,
        isBlocked: user.isBlocked,
      },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )
    res.json({ token, userId: user.id, ALLusers:users, isBlocked: user.isBlocked, isDeleted: false })

  } catch (e) {
    res.status(500).json({ message: 'Проверьте введенные данные' })
  }
})

module.exports = router