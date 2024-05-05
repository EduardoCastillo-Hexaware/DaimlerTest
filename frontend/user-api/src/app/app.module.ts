import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MenubarModule} from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { FooterComponent } from './shared/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    TreeTableModule,
    MessageModule,
    MessagesModule,
    MenubarModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
