
export const validator = ({handle,password}:{handle : string, password : string}) => {

    if(!handle || !password){
        return {
            isValid : false,
            message : "Please fill in all fields"
        }
    }

    if(password.length < 6){
        return {
            isValid : false,
            message : "Password must be at least 6 characters"
        }
    }
    if(handle.includes(" ") || handle.includes("/") || handle.includes(".")){
        return {
            isValid : false,
            message : "Invalid handle"
        }
    }  
       return  {isValid : true}
    
}