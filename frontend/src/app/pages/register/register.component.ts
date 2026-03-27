import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  template: '',
  styles: []
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(['/login'], { queryParams: { mode: 'register' } });
  }
}
