import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authobj } from '../interface/authobj';
import { Update } from '../interface/update';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user") || "")

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

    this.authService.update(data).subscribe((x) => {
      x
        ? (this.message = 'განახლებულია')
        : (this.message = 'ელ-ფოსტა არასწორია');
    });

    setTimeout(() => {
      this.message = '';
    }, 3000);

    this.username = '';
    this.password = '';
  }
}
