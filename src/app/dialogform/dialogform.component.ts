import { Component, EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ServerCallService } from '../services/server-call.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.scss'],
})
export class DialogformComponent {
  constructor(private serverCallService: ServerCallService) {}

  addOppurtuinityForm: any;
  value = 'Clear me';

  // for language list
  Languages = new FormControl('');
  LanguagesList: string[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'Java',
    'C#',
  ];

  // for Tools list
  tools = new FormControl('');
  toolsList: string[] = ['React', 'Vue', 'Saas'];

  count: number = 1000 + Math.floor(Math.random() * 100);
  jobForEdit: any;

  ngOnInit(): void {
    console.log(this.serverCallService.editObj);

    this.jobForEdit = this.serverCallService.editObj;

    this.addOppurtuinityForm = new FormGroup({
      new: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.new : true
      ),
      featured: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.featured : false
      ),
      company: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.company : null,
        Validators.required
      ),
      logo: new FormControl(
        this.serverCallService.forEdit
          ? this.jobForEdit.logo
          : '../../assets/images/icon-remove.svg',
        Validators.required
      ),

      id: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.id : this.count
      ),
      position: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.position : null,
        Validators.required
      ),
      contract: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.contract : null,
        Validators.required
      ),
      role: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.role : null,
        Validators.required
      ),
      level: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.level : null,
        Validators.required
      ),
      postedAt: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.postedAt : null,
        Validators.required
      ),
      location: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.location : null,
        Validators.required
      ),
      languages: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.languages : null,
        Validators.required
      ),
      // tools: new FormControl(),
      tools: new FormControl(
        this.serverCallService.forEdit ? this.jobForEdit.tools : null,
        Validators.required
      ),
    });
    this.serverCallService.forEdit ? (this.count = this.count) : this.count++;
  }

  // count: number = 10;

  newFormData: any;
  onSubmit() {
    console.log(this.addOppurtuinityForm);
    console.log(this.addOppurtuinityForm.value);

    if (!this.serverCallService.forEdit) {
      this.serverCallService.addJob(this.addOppurtuinityForm.value);
      this.count++;
    } else if (this.serverCallService.forEdit) {
      console.log('for edit:');
      console.log(this.addOppurtuinityForm.value);
      this.serverCallService.addJob(this.addOppurtuinityForm.value);
      this.serverCallService.editCompletedData = this.addOppurtuinityForm.value;
    }
  }

  onDailogClose() {
    this.serverCallService.forEdit = false;
  }
}
