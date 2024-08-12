import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUser } from '../interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  msg = ""
  email = ""
  showAddMsg = false
  addNewUser = false

  constructor(
    private dataService: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: "",
      newEmail: "",
      newName: ""
    });
  }

  login() {
    this.showAddMsg = false
    this.msg = ""
    if (this.form.value.email) {
      if (!this.isValidEmail(this.form.value.email)) {
        this.msg = "Tiene que ingresar un email válido."
      } else {
        this.dataService.findUser(this.form.value.email).subscribe(res => {
          if (res.status === "OK" && res.data.length) {
            this.router.navigate(['/home'])
          } else {
            this.showAddMsg = true
          }
        });
      }
    } else {
      this.msg = "Tiene que ingresar un email."
    }
  }

  isValidEmail(email: string): boolean {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
  }

  showUserForm() {
    this.form.patchValue({ newEmail: this.form.value.email })
    this.showAddMsg = false
    this.addNewUser = true
  }

  showLoginForm() {
    this.form.reset()
    this.addNewUser = false
    this.msg = ""
  }

  addUser() {
    if (!this.form.value.newName) {
      this.msg = "Tiene que ingresar un nombre."
    } else if (!this.form.value.newEmail) {
      this.msg = "Tiene que ingresar un email."
    } else if (!this.isValidEmail(this.form.value.newEmail)) {
      this.msg = "Tiene que ingresar un email válido."
    } else {
      const newUser: CreateUser = {
        email: this.form.value.newEmail,
        fullName: this.form.value.newName
      }
      this.dataService.addUser(newUser).subscribe(res => {
        if (res.status === "OK") {
          this.showLoginForm()
        }
      });
    }
  }
}
