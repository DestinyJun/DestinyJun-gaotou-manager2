import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoComponent} from './video/video.component';
import {VideoGroupComponent} from './video-group/video-group.component';


const routes: Routes = [
  {path: 'video', component: VideoComponent},
  {path: 'video-group', component: VideoGroupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
