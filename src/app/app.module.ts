import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

//LOGIN CON FACEBOOK Y GOOGLE
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    UserModule,
    PostModule,
    AppRoutingModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '760502764966-ordqhlej7pos3530n6pe6de2dq134qj6.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('5582663298470591'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
