import { Routes } from '@angular/router';
import { InfoScreenComponent } from './info-screen/info-screen.component';
import { ConverterUiComponent } from './converter-ui/converter-ui.component';

// Register routes for routing application links
export const routes: Routes = [
  { path: '', component: ConverterUiComponent },
  { path: 'info', component: InfoScreenComponent },
];
