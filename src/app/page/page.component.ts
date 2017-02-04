import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: 'page.component.html',
  styleUrls: ['../app.component.css']
})
export class PageComponent{
	public id: any;
	public pageValid: boolean;
	public pageName: string = "";

  constructor(private slimLoadBar: SlimLoadingBarService, private router: Router, private route: ActivatedRoute, private title: Title){
  	this.route.params.subscribe(params =>{
    	this.id = params['id'];
    });
    this.getData();
  }

  ngOnInit(){}

  getData(){
  	var page = ['about','contact'];

  	if(isNaN(this.id) && page.indexOf(this.id) == 0){
  		this.pageValid = true;
  		this.pageName = this.id;
  		if(this.id == "about"){
  			this.title.setTitle("Tentang Saya | Catatan Rajamuda");
  		}
  	}else if(!isNaN(this.id)){
  		this.pageValid = true;
  	}else{
  		this.pageValid = false;
  	}
    this.slimLoadBar.complete();
  }

}
