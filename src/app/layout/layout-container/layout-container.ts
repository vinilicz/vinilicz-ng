import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-layout-container',
  imports: [RouterOutlet, Header],
  templateUrl: './layout-container.html',
  styleUrl: './layout-container.scss'
})
export class LayoutContainer {
  
}
