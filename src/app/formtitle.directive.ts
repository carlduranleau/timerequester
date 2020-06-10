import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormtitle]'
})
export class FormtitleDirective {

  constructor(private el:ElementRef) {
  	el.nativeElement.style.fontWeight="bold";
  	el.nativeElement.style.fontStyle="italic";
  	el.nativeElement.style.color="#AAAAAA";
  	el.nativeElement.style.fontSize="20px";
  }
}
