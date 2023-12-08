import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
@Component({
     selector: 'app-header',
     templateUrl: './header.component.html',
     styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
     public isUserLoggedIn: boolean = false;
     public user: any;

     // prettier-ignore
     constructor(
          private _dialog: MatDialog, 
          
     ) {}

     ngOnInit() {
          this.isUserLoggedIn = this._storageService.isUserLoggedIn();
          this._broadcastService.login$.subscribe((message) => {
               if (message == 'ULOGGEDIN' || message == 'ULOGGEDOUT') {
                    this.isUserLoggedIn = this._storageService.isUserLoggedIn();
                    this.user = this._storageService.getUserInfo();
               }
          });
          $(window).scroll(function () {
               if ($(window).scrollTop() > 0) {
                    $('.main-header').addClass('floatingNav');
               } else {
                    $('.main-header').removeClass('floatingNav');
               }
          });
     }

     @HostListener('window:scroll', ['$event'])
     onWindowScroll() {
          let element = document.querySelector('.stickey-header') as HTMLElement;
          if (window.scrollY > element.clientHeight) {
               element.classList.remove('transparent-background');
               element.classList.add('color-background');
          } else {
               element.classList.add('transparent-background');
               element.classList.remove('color-background');
          }
     } 
}
