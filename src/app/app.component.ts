import { Component, HostListener, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import 'rxjs/Rx';

// import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isHome: boolean;
  public isLoad: boolean;
  public navIsFixed: boolean = false;
  public baseuri = "rajamuda.agri.web.id";
  public categories: any;
  public formSubmit: boolean = false;
  public search: {data?: string} = {};

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private slimLoadBar: SlimLoadingBarService, private http: Http){
  	router.events.subscribe((event: NavigationEvent) => {
        if (event instanceof NavigationStart) { 
          this.slimLoadBar.start();
          let activeRoute: string = event.url;
          if(activeRoute != "/home"){
          	this.isHome = false;
          }else{
          	this.isHome = true;
          }
          if(activeRoute == "/"){
            this.isHome = true;
          }
          this.isLoad = true;
        }else if(event instanceof NavigationEnd) {
          this.isLoad = false;
        }
      });

    this.getCategory();
  }

  getCategory(){
    this.http.get("http://"+this.baseuri+"/api/getcat.php")
      .map((res:Response)=> res.json())
      .subscribe(data => {
        this.categories = data;
      })
  }

  onSearch(search){
    this.formSubmit = true;

    if(search.valid){
      this.router.navigate(['/search/'+this.search.data]);
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this.document.body.scrollTop;
    if (number > 120) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && number < 120) {
      this.navIsFixed = false;
    }
  }
}
