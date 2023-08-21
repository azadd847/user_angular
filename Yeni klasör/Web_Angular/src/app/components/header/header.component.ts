import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isSidenavOpen = false; // Bu değişken sidenav'ın açık/kapalı durumunu tutar

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
