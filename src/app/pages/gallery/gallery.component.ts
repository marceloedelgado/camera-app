import { Component } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { Plugins } from '@capacitor/core';
import { catchError } from 'rxjs';

const { Filesystem } = Plugins;

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

    await CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;
  }

  async stopCamera() {
    await CameraPreview.stop();
    this.cameraActive = false;
  }
  

  async captureImage () {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
    quality: 90
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this. stopCamera ();
    
  } catch (error: any) {
    console.error('Error al capturar la imagen:', error);
  }
  


  async saveImage() {
    try {
      if (!this.image) {
        console.error('No hay imagen para guardar');
        return;
      }

      const fileName = 'captured-image.jpg';
      const base64PictureData = this.image.split(',')[1]; // Remover el prefijo 'data:image/jpeg;base64,'

      await Filesystem['writeFile']({
        path: fileName,
        data: base64PictureData,
        directory: 'PICTURES',
      });

      console.log('Imagen guardada');
      this.openCamera(); // Volver a abrir la cámara después de guardar la imagen
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  }
}
