import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['../app.component.css']
})
export class HomeComponent {
	public page: number;
	public posts: any;
	public lastPage: boolean;
	public category: any;
	public baseuri = "rajamuda.agri.web.id";
	public noconnection: boolean = false;

	constructor(private slimLoadBar: SlimLoadingBarService, private title: Title, private router: Router, private route: ActivatedRoute, private http: Http, private sanitize: DomSanitizer){
		this.route.queryParams.subscribe(queryParams=>{
			this.page = parseInt(queryParams['page']);
			if(isNaN(this.page)){
				this.page = 1;
			}
			this.posts = null;
			setTimeout(()=>{
				this.getData(this.page);
			},100);
			window.scrollTo(0,0);
		})

		this.title.setTitle('Catatan Rajamuda');
	}

	getData(page){
		this.http.get("http://"+this.baseuri+"/api/getpost.php?view=all&page="+page)
			.map((res:Response) => res.json())
			.subscribe(data => {
				this.lastPage = data[data.length-1].last;
				this.posts = data;
				this.noconnection = false;
			}, err =>{
				this.noconnection = true;
				setTimeout(()=>{
					this.getData(page);
				},3000);
			})
			this.slimLoadBar.complete();
	}
}
