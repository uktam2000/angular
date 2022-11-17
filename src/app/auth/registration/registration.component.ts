import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router ) { }
  form: FormGroup | any

  


  async ngOnInit(){
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    })
  }

  onSubmit(){
    const {email, password, name}  = this.form.value;
     const user = new User(email, password, name);
    this.usersService.createNewUser(user)
    .subscribe((user:User)=>{
         this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
         })
    })
  }
  

   forbiddenEmails(){
         return new Promise((resoleve, reject)=>{
          this.usersService.getUserByEmail(this.form.value.email)
          .subscribe((user: User)=>{
            if(user){
              resoleve({forbiddenEmail: true});
            } else{
              resoleve(null)
            }
          })
         })
  }


}
