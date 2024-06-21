import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { SliderDataIF, slidersData } from '../../../../DATA';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-home-swiper',
  styleUrl: './homeSwiper.component.scss',
  templateUrl: './homeSwipper.component.html',
  imports: [NgStyle, NgFor],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class HomeSwipperComponent {
  @Input({
    required: true,
  })
  slidersData!: SliderDataIF[];
}
