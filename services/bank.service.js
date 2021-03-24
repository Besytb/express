const User = require('../models/user');

// let accountDetails={
//     userone:{acno:1000,balance:1000,username:"userone",password:"testuser",history:[]},
//     usertwo:{acno:1001,balance:12000,username:"usertwo",password:"testuser1",history:[]},
//     userthree:{acno:1002,balance:13000,username:"userthree",password:"testuser2",history:[]}
// }

const authenticateUser=(username, password)=>{
    return User.findOne({
        username:username,
        password:password
    })
    // .then(data=>{
    //     if(data){
    //         res.send({
    //             message:"logged in successfully"
    //         })
    //     }else{
    //         res.status(422).send({
    //             message:"invalid credentials"
    //         })
    //     }
    // })
    // let dataset = accountDetails;
    // if(username in dataset){
    //     if (dataset[username].password == password){
    //         return 1; //valid username and password
    //     }
    //     else{
    //         return 0; // incorrect password
    //     }
    // }
    // else{
    //     return -1; // wrong username
    // }
}


const deposit = (_id, amount) => {
// let user = authenticateUser(username,password);
// if(user==1){

    return User.findById(_id)
    .then(user => {
        user.balance+=parseInt(amount)
        user.history.push({
            amount,
            typeOfTransaction:"credit"
        })
        user.save()
        return {
            balance: user.balance,
            message:"your account has been credited with "+ amount+" New balance: "+user.balance
        }
    })
// }else{
//     return { message:"invalid details"}
// }
}
const withdraw= (_id, amount) => {
    // let user = authenticateUser(username,password);
    // if(user==1){
    
        return User.findById(_id)
        .then(user => {
            if(user.balance<amount){
                return { message:"insufficient balance"}
            }
            user.balance-=parseInt(amount)
            user.history.push({
                amount,
                typeOfTransaction:"debit"
            })
            user.save()
            return {
                balance: user.balance,
                message:"your account has been debited with "+ amount+" New balance: "+user.balance
            }
        })
    // }else{
    //     return { message:"invalid details"}
    // }
    }

    const getUser = (_id)=>{
        return User.findById(_id)
         // let user = authenticateUser(username,password);
    // if(user==1){
   
    }
// else {
// reurn []
// }
// } 

const updateUser = function(_id, data){
return User.findOneAndUpdate({_id},data)
}

const getUsers = function(){
return User.find()

}
const deleteUser = function(_id){
    return User.deleteOne({
        _id
    })
    
    }
module.exports = {
    authenticateUser,
    deposit,
    withdraw,
    getUser,
    updateUser,
    getUsers,
    deleteUser
} 
    
