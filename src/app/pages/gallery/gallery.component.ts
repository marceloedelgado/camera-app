import { Component } from '@angular/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { Plugins } from '@capacitor/core';

import '@capacitor-community/camera-preview';

const { CameraPreview, Filesystem } = Plugins;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  image: string | null = null;
  cameraActive = false;

  constructor() {}

  async openCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraPreview',
      className: 'cameraPreview',
    };

    await CameraPreview['start'](cameraPreviewOptions); // Utiliza la notación de índice para acceder a 'start'
    this.cameraActive = true;
  }

  async stopCamera() {
    await CameraPreview['stop'](); // Utiliza la notación de índice para acceder a 'stop'
    this.cameraActive = false;
  }

  async captureImage() {
    const result = await CameraPreview['getPhoto']({
      quality: 100,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    }); // Utiliza la notación de índice para acceder a 'getPhoto'

    this.image = result && result.webPath;
  }

  async saveImage() {
    if (!this.image) {
      console.error('No hay imagen para guardar');
      return;
    }

    try {
      await Filesystem['writeFile']({
        path: 'captured-image.jpg',
        data: this.image,
        directory: 'PICTURES',
      });

      console.log('Imagen guardada');
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  }
}
