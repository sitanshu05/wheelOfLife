export const validator  = ({username,password,email} : {username : string, password : string, email : string} ) => {

    if(username.includes(".") || username.includes(".")){
        return {isValid : false,message : `username cannot contain "."," "`}
    }

    if(password.length < 6){
        return {isValid : false,message : "password must be at least 6 characters"}
    }

    if(!email.includes("@") || !email.includes(".")){
        return {isValid : false,message : "invalid email"}
    }

    return {isValid : true}
}