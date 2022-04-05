/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<any>();
  @Input() avatar: string;
  selectedImage: string;

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    console.log('picker', this.avatar);
    if (this.avatar) {
      this.selectedImage = this.avatar;
    }
  }

  async onPickImage() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 50,
    });
    const savedPhoto = await this.savePicture(capturedPhoto);
    console.log(savedPhoto);
    this.imagePick.emit(savedPhoto.webviewPath);
    // this.selectedImage = await onLoadImage(savedPhoto);
    this.selectedImage = savedPhoto.webviewPath;
    console.log(this.selectedImage);
  }
  private async savePicture(cameraPhoto: Photo) {
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
  private async readAsBase64(cameraPhoto: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export async function onLoadImage(savedPhoto) {
  const readFile = await Filesystem.readFile({
    path: savedPhoto.filepath,
    directory: Directory.Data,
  });
  return `data:image/jpeg;base64,${readFile.data}`;
}
