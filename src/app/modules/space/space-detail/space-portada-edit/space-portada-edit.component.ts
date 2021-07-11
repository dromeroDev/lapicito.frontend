import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from 'src/app/core/models/usuario';
import { SpaceService } from 'src/app/core/services/space.service';

@Component({
  selector: 'app-space-portada-edit',
  templateUrl: './space-portada-edit.component.html',
  styleUrls: ['./space-portada-edit.component.scss'],
})
export class SpacePortadaEditComponent implements OnInit {
  @Input() public space: IUsuario;
  selectedFile = null;
  form: FormGroup;
  filePath: string;

  constructor(
    private activeModal: NgbActiveModal,
    private spaceService: SpaceService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      img: new FormControl(null),
    });
    this.filePath = this.space.portada_url;
  }

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      img: file,
    });

    this.form.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  upload() {
    this.spaceService
      .savePortada(this.selectedFile, this.space.id)
      .subscribe((event) => {
        this.selectedFile = undefined;
        this.close();
      });
  }
}
