import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  
  public user = new User();

  confirmPassword?:string;

  myForm!: FormGroup;

  err: any;

  loading: boolean=false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private toastr: ToastrService
  ) { }

    ngOnInit(): void {
    
      this.myForm = this.formBuilder.group({
      
            username : ['', [Validators.required]],
            email : ['', [Validators.required, Validators.email]],
            password : ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword : ['', [Validators.required]]
        } 
      );
  }
  
  /*
 onRegister() {
    this.loading=true;
    
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {

        this. authService.setRegistredUser(this.user); 
        //alert("veillez confirmer votre email"); 
        //this.toastr.success('veillez confirmer votre email', 'Confirmation');
      this.loading=false;
        // Show SweetAlert success notification
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Veuillez confirmer votre email',
        showConfirmButton: false,
        timer: 1500,
      });
        this.router.navigate(["/verifEmail"]);

        // Optionally, navigate to the email verification page (uncomment the line below if needed):
        // this.router.navigate(["/verifEmail", this.user.email]);
      },
      error: (err: any) => {
        console.log(err);
        if (err.error.errorCode==="USER_EMAIL_ALREADY_EXISTS") {
          // Assuming the backend sends an error message in `err.error.message`
          this.err = "Email already used";
        } else {
          // Handle other errors (e.g., 500, 404, etc.)
          this.err = "Une erreur inconnue est survenue. Veuillez réessayer.";
        }
      }
    });
  }*/
 /*   onRegister() {
      this.loading = true;
  
      this.authService.registerUser(this.user).subscribe({
          next: (res) => {
              this.authService.setRegistredUser(this.user);
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Veuillez confirmer votre email',
                  showConfirmButton: false,
                  timer: 1500,
              });
              this.router.navigate(['/verifEmail']);
              this.loading = false;
          },
          error: (err: any) => {
              this.loading = false;
              if (err.error.errorCode === 'USER_EMAIL_ALREADY_EXISTS') {
                  this.err = 'Email déjà utilisé!';
                  this.toastr.error(this.err, 'Erreur');
              } else {
                  this.err = 'Une erreur inconnue est survenue. Veuillez réessayer.';
                  console.error(err);
              }
          }
      });
  }
*/



  onRegister() {
    console.log("Registering user...");
    this.loading = true;
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Veuillez confirmer votre email',
          showConfirmButton: false,
          timer: 1500,
      });
        this.loading = false;
       // this.toastr.success('Veillez confirmer votre email', 'Confirmation');
        
       this.router.navigate(["/verifEmail"]);
      },
      error: (err: any) => {
        this.loading = false; 
        if (err.error.message === "Email déjà existant!") { // Match the exact message from the backend
          this.err = "Email already in use!";
        } else {
          this.err = "An error occurred. Please try again.";
        }
      }
    });
  }
  
 

}