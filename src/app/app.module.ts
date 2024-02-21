import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {FormRendezVousComponent} from "./pages/client/form-rendez-vous/form-rendez-vous.component";
import {FooterComponent} from "./layouts/full/footer/footer.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        BlankComponent,
        SidebarComponent,
        HeaderComponent,
        BrandingComponent,
        AppNavItemComponent,
        FooterComponent,
        //
    ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSelectModule,
    MatOptionModule,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NgApexchartsModule,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
