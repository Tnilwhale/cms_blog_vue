
let token = {
  set(token){
    localStorage.setItem("token",token)
  },
  get(){
    localStorage.getItem("token")
  },
  clear(){
    localStorage.removeItem("token")
  }
}

export default token