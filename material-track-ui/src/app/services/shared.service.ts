import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  loader: Subject<boolean> = new Subject();
  isLoading = false;
  isBackground = false;

  constructor() { }

  show() {
    this.isLoading = true;
  }
  hide() {
    this.isLoading = false;
  }
}
