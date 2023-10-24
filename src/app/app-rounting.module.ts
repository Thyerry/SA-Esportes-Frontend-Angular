import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SenderComponent } from './sender/sender.component';
import { ConsumerComponent } from './consumer/consumer.component';

const routes: Routes = [
  { path: '', component: SenderComponent },
  { path: 'sender', component: SenderComponent },
  { path: 'consumer', component: ConsumerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
