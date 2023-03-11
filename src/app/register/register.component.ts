import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authobj } from '../interface/authobj';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '')

    if(user) {
      this.router.navigate(['/', 'dashboard'])
    }
  }

  onSubmit() {
    if (!this.username.trim() || !this.password.trim()) {
      this.message = "შეავსეთ ყველა ველი"
      return;
    }

    let data: Authobj = {
      username: this.username,
      password: this.password,
    };

    this.authService.reqRegister(data).subscribe((x) => {
      if (x) {
        this.message = "შექმნილია";
        this.router.navigate(['/']); 
      } else {
        this.message = "მომხმარებელი უკვე არსებობს";
      }
    });

    setTimeout(() => {
      this.message = '';
    }, 3000);

    this.username = '';
    this.password = '';
  }
}
