import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import {  CameraResultType } from '@capacitor/camera';

import '@capacitor-community/camera-preview';

const { CameraPreview, Camera } = Plugins;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  image: string | null = null;
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

  stopCamera() {
    CameraPreview['stop']();
    this.cameraActive = false;
  }

  captureImage() {
    CameraPreview['getPhoto']({
      quality: 100,
      resultType: CameraResultType.Uri
    }).then((result: any) => {
      this.image = result && result.webPath;
    }).catch((error: any) => {
      console.error('Error capturing image', error);
    });
  }

  flipCamera() {
    CameraPreview['flip']();
  }

  savelmage() {
    // Aquí deberías implementar la lógica para guardar la imagen capturada
    console.log('Guardando imagen:', this.image);
  }
}