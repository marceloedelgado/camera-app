import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';

import '@capacitor-community/camera-preview';

const { CameraPreview } = Plugins;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  image = null;
  cameraActive = false;

  constructor() {}

  openCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraPreview',
      className: 'cameraPreview',
    };

    CameraPreview['start'](cameraPreviewOptions);
    this.cameraActive = true;
  }

  stopCamera(){

  }

  captureImage(){

  }

  flipCamera(){
    
  }

}
