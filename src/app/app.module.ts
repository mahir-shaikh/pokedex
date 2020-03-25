import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';
import { TabsModule, ProgressbarModule, TypeaheadModule }     from 'ngx-bootstrap';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PokemonDetailComponent }  from './pokemon-detail/pokemon-detail.component';
import { PokemonSearchComponent }  from './pokemon-search/pokemon-search.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule.forRoot()

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PokemonDetailComponent,
    PokemonSearchComponent,
    HeaderComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
