import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

/*COMPONENT*/
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';

/*EXTERNAL COMPONENT*/
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

/*PROVIDER*/
// import { SearchService } from './search.service';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', redirectTo: '/home', pathMatch: 'full'},
  {path: 'page/:id', component: PageComponent},
  {path: 'page/:id', redirectTo: '/page/:id', pathMatch: 'full'},
  {path: 'post/:id', component: PostComponent},
  {path: 'post/:id', redirectTo: '/post/:id', pathMatch: 'full'},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'category/:id', redirectTo: '/category/:id', pathMatch: 'full'},
  {path: 'search/:term', component: SearchComponent},
  // {path: 'search/:term', redirectTo: '/search'}
  // { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    PostComponent,
    CategoryComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    SlimLoadingBarModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
