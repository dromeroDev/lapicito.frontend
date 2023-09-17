import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from 'src/app/core/models/usuario';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-avatar-edit',
  templateUrl: './avatar-edit.component.html',
  styleUrls: ['./avatar-edit.component.scss'],
})
export class AvatarEditComponent implements OnInit {
  @Input() public user: IUsuario;
  selectedFile = null;
  form: UntypedFormGroup;
  filePath: string;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      img: new UntypedFormControl(null),
    });
    this.filePath = this.user.avatar_url;
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
    this.userService
      .saveAvatar(this.selectedFile, this.user.id)
      .subscribe((event) => {
        this.selectedFile = undefined;
        this.close();
      });
  }
}
