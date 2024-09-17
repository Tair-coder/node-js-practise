const users = [
    {id:1,user:'Tair'},
    {id:2,user:'Lena'},
    {id:3,user:'Ali'},
]
const getUsers = (req,res)=> {
    if (req.params.id) {
        return res.send(users.find(user => user.id == req.params.id))
    }
    res.send(users)
}

const createUser = (req,res)=> {
    const user = req.body
    users.push(user)
    
    res.send(users)
}

module.exports = {
    getUsers,
    createUser
}