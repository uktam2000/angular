import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";

import { RegistrationComponent } from "./registration/registration.component";
import {AuthComponent} from "./auth.component"
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";
import { UsersService } from "../shared/services/users.service";
import { AuthService } from "../shared/services/auth.service";
@NgModule({
    declarations:[
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule
       
    ],
    providers: [UsersService,AuthService]
})
export class AuthModule{}