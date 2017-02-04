import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	templateUrl: 'search.component.html',
	styleUrls: ['../app.component.css']
})

export class SearchComponent{
	public searchTerm: string;

	constructor(private slimLoadBar: SlimLoadingBarService, private http: Http, private title: Title, private sanitize: DomSanitizer, private router: Router, private route: ActivatedRoute){
		this.route.params.subscribe(params => {
			this.searchTerm = params['term'];
			console.log(this.searchTerm);
			this.slimLoadBar.complete();
		})
	}

}