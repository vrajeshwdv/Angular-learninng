import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private users:any[]
  constructor() {
    this.users = [];
   }

   get getAllUsers(){
    return this.users;
   }
  register(user:any){
    console.log(user);

    // make a request on server using data 
    // repond to user
    return new Promise((resolve,reject)=>{
        console.log("User has been stored sucessfully !!");
        this.users.push(user);
        localStorage.setItem("users",JSON.stringify(this.users));

        resolve({status:200,user});
        
    });

    
  }
}
