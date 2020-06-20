import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";

import { MaterialModule } from "./core/modules/material-module";
import { ContentfulService } from "./core/services/contentful.service";

import { AppComponent } from "./app.component";
import { MdToHtmlPipe } from "./core/pipe/md-to-html.pipe";
// layout
import { FooterComponent } from "./layout/footer/footer.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
// routes
import { AboutComponent } from "./routes/about/about.component";
import { HomeComponent } from "./routes/home/home.component";
import { WorkDialogComponent } from "./routes/works/work-dialog.component";
import { WorksComponent } from "./routes/works/works.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    WorksComponent,
    WorkDialogComponent,
    MdToHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    MaterialModule
  ],
  providers: [ContentfulService],
  bootstrap: [AppComponent]
})
export class AppModule {}
