import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private registerService:RegisterService) { }

  login(username: string, password: string) {

    console.log(this.registerService.getAllUsers);
    

    if (username === "admin" && password === "admin")
      return 200;
    else
      return 401;
  }
}
