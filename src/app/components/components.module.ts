import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CanvasDrawComponent],
  exports:[CanvasDrawComponent],
  imports: [
    IonicModule
  ]
  
})
export class ComponentsModule { }
