// isLogedIn
export const isLoggedIn=()=>{
    let data=localStorage.getItem("token")
    if(data== null){
        return false
    }else{
        return true;
    }
}

// DoLogin  data=>set to localStorage

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
}

// DoLogout=> remove from local Storage 

export const doLogout=(next)=>{
    localStorage.removeItem("token")
    next()
}

// get currentUser 
export const getCurrentUserDetail=()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("token"))
    }else{
        return false
    }
}