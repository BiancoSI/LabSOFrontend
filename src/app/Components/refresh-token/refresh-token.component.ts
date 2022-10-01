import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth.service';
import { User } from '../../Object/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-refresh-token',
  templateUrl: './refresh-token.component.html',
  styleUrls: ['./refresh-token.component.css']
})
export class RefreshTokenComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.refreshToken().subscribe({
      next: (response :any) =>{
        this.auth.autentica(response as User);
        this.router.navigate([this.route.snapshot.queryParamMap.get('redirectTo')]);
      }
    })
  }

}
