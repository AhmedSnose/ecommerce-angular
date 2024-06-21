import { Component } from '@angular/core';

@Component({
  selector: 'app-main-container',
  standalone: true,
  template: `
    <div class="main-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
  .main-container {
    margin-top:4rem;
    width: 100%; 
    background-color: rgba(140, 140, 250, 0.2);
  }
`,
})
export class MainContainerComponent {}
