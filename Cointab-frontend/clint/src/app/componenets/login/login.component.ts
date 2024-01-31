import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  loginForm!:FormGroup
  errorMessage: string | null = null;
  constructor(private dataService:DataService,private router: Router){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required])
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.dataService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response: any) => {
        if (response.message === 'Incorrect password') {    
          this.errorMessage = `Incorrect password. Please try with Correct Password.`; // <-- set error message
        } else if (response.message === 'You have been blocked for 24 hours') {
          this.errorMessage = 'You have been blocked for 24 hours due to 5 consecutive incorrect password attempts.';
        }
        else if(response.message === 'Incorrect email'){
          this.errorMessage = `Incorrect email. Please try with Correct email.`;
        }
         else {
          // successful login
          this.router.navigate(['/home'], { state: { email: this.loginForm.value.email } });  // <-- navigate to home page
          console.log("Email is : ",this.loginForm.value.email);
        }
      });
    }
  }
}
