import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent implements OnInit {
form: FormGroup | any

message:any = Message;
public showMessage(message: Message){
this.message = message;

window.setTimeout(()=>{
  this.message.text = ''
},5000)
}
  constructor(
    private userService: UsersService, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
     ) { }

  ngOnInit(){ 
    this.message = new Message('dengar', '')


    this.route.queryParams
    .subscribe((params:Params)=>{
       if(params['nowCanLogin']){
         this.showMessage({
          text:'Теперь вы можете зайти в систему',
          type: 'success'
        })
       }
    })
  
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    const formData = this.form.value;
     console.log(formData)
    this.userService.getUserByEmail(formData.email)
    .subscribe((user: User)=>{ 
      console.log('sub', user);
      if(user){
         if(user.password === formData.password){
          this.message.text = ''
          window.localStorage.setItem("user", JSON.stringify(user))
            this.authService.login()
            // this.router.navigate([''])

         } else{
          this.showMessage({
            text:'Пароль неверный',
            type: 'danger'
          })
         }
      } else{
        this.showMessage({
          text:'Такого пользователя не существует',
          type: 'danger'
        })
      }
    })
  }

}
