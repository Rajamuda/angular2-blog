import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class SearchService{
	public searchTerm = "";

	constructor(private router: Router, private route: ActivatedRoute){}

	setTerm(data: string){
		this.searchTerm = data;
	}

	getTerm(){
		return this.searchTerm;
	}

	fetchData(data){
		this.setTerm(data);
    this.router.navigate(['/search', {q: this.getTerm()}]);
	}
}