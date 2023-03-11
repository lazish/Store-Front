import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authobj } from '../interface/authobj';
import { AuthService } from '../service/auth.service';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router, private uiService:UiService) {}

  ngOnInit() {
    const userJson = localStorage.getItem('user');
    console.log('userJson:', userJson);
    const user = userJson ? JSON.parse(userJson) : null;
    console.log('user:', user);
    if (user) {
      this.router.navigate(['/', 'dashboard'])
    }
}
      

  onSubmit() {
    if (!this.username.trim() || !this.password.trim()) {
      this.message= "შეავსეთ ყველა ველი"
      return;
    }

    let data: Authobj = {
      username: this.username,
      password: this.password,
    };

    this.authService.reqLogin(data).subscribe((x: boolean) => {
      if(x === false) {
        this.message = "არასწორია ელ-ფოსტა ან პაროლი"
        return;
      }
      localStorage.setItem("user", JSON.stringify(x));

      data.username === 'admin'? this.router.navigate(['/', 'admin']) : this.router.navigate(['/', 'dashboard']) 

    });

    setTimeout(() => {
      this.message = '';
    }, 3000);

    this.username = '';
    this.password = '';
  }

}
