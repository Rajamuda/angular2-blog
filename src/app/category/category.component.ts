import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	templateUrl: 'category.component.html',
	styleUrls: ['../app.component.css']
}) 

export class CategoryComponent{
	public id: number;
	public page: number;
	public posts: any;
	public lastPage: boolean;
	public category: any;
	public baseuri = "rajamuda.agri.web.id";
	public noconnection: boolean = false;
	public notfound: boolean = false;
	
	constructor(private slimLoadBar: SlimLoadingBarService, private http: Http, private title: Title, private sanitize: DomSanitizer, private router: Router, private route: ActivatedRoute){
		this.route.params.subscribe(params => {
			this.id = params['id'];
			this.route.queryParams.subscribe(queryParams=>{
				this.page = parseInt(queryParams['page']);
				if(isNaN(this.page)){
					this.page = 1;
				}
				this.posts = null;
				setTimeout(()=>{
					this.getData(this.page, this.id);
				},100);
				window.scrollTo(0,0);
			})
		})
	}

	getData(page, id){
		this.http.get("http://"+this.baseuri+"/api/getcat.php?id="+id).subscribe(data => {
			this.category = data.json();

			this.category = this.category.nama;
			this.title.setTitle("Kategori: "+this.category+" | Catatan Rajamuda");
		})
		this.http.get("http://"+this.baseuri+"/api/getpost.php?view=bycat&id="+id+"&page="+page)
			.map((res:Response) => res.json())
			.subscribe(data => {
				if(data.result==404){
					this.posts = 1;
					this.notfound = true;
				}else{
					this.lastPage = data[data.length-1].last;
					this.posts = data;
					this.noconnection = false;
					this.notfound = false;
				}
			}, err =>{
				this.noconnection = true;
				setTimeout(()=>{
					this.getData(page,id);
				},3000);
			})
			this.slimLoadBar.complete();
	}
}