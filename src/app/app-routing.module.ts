import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterUiComponent } from './converter-ui/converter-ui.component';
import { InfoScreenComponent } from './info-screen/info-screen.component';

const routes: Routes = [
  { path: '', component: ConverterUiComponent },
  { path: 'info', component: InfoScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
