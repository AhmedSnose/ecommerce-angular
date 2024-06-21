import { Component } from '@angular/core';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'app-home-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports:[LogoComponent]
})
export class HomeFooterComponent {}
