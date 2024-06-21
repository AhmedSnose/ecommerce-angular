import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  imports:[RouterLink],
  standalone:true
})
export class LogoComponent {
  @Input() width: number = 100;
}