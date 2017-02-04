import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { DomSanitizer,Title } from '@angular/platform-browser';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'post',
	templateUrl: 'post.component.html',
	styleUrls: ['../app.component.css']
})

export class PostComponent{
	public id: number;
	public posts: any;
	public baseuri = "rajamuda.agri.web.id";
	public notfound: boolean = false;
	public noconnection: boolean = false;

	constructor(private slimLoadBar: SlimLoadingBarService, private title: Title, private router: Router, private route: ActivatedRoute, private http: Http, private sanitize: DomSanitizer){
		this.route.params.subscribe(params => {
			this.id = params['id'];
		})

		this.getData();
	}

	ngOnInit(){
		window.scrollTo(0,0);
	}

	getData(){
		// console.log(this.id);
		this.http.get("http://"+this.baseuri+"/api/getpost.php?view=one&id="+this.id)
			.map((res:Response) => res.json())
			.subscribe(data => {
				// console.log(data);
				if(data.result!=404){
					this.title.setTitle(data[0].judul_post+' | Catatan Rajamuda');
					this.posts = data;
					this.posts[0].isi_post = this.sanitize.bypassSecurityTrustHtml(this.posts[0].isi_post);
					this.noconnection = false;
					this.notfound = false;
				}else{
					this.posts = 1;
					this.notfound = true;
				}
			}, err =>{
				this.noconnection = true;
				setTimeout(()=>{
					this.getData();
				},3000);
			})
			this.slimLoadBar.complete();
	}
}
