const express = require('express')
const router = express.Router()

const User = require('./User')

const bcrypt = require('bcryptjs')

//listando os usuários
router.get('/admin/users', (req, res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/index', {users: users})
    })
})

//criando novo usuário
router.get('/admin/users/create', (req, res)=>{
    res.render('admin/users/create')
})

//adicionando o novo usuário ao banco de dados
router.post('/users/create', (req, res)=>{
    var email = req.body.email 
    var password = req.body.password 

    User.findOne({
        where: {
            email: email
        }
    }).then(user=>{
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
        
            User.create({
                email: email, 
                password: hash
            }).then(()=>{
                res.redirect('/')
            }).catch(error=>{
                res.redirect('/')
            })

        } else {
            res.redirect('/admin/users/create')
        }
    })
})

//Login
router.get('/login', (req, res)=>{
    res.render('admin/users/login')
})
router.post('/authenticate', (req, res)=>{
    var email = req.body.email 
    var password = req.body.password 

    User.findOne({
        where: {
            email: email
        }
    }).then(user=>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password)
            if(correct){
                req.session.user = {
                    id: user.id, 
                    email: user.email
                }
                res.redirect('/admin/articles')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    })
})

//logout
router.get('/logout', (req, res)=>{
    req.session.user = undefined
    res.redirect('/')
})

module.exports = router