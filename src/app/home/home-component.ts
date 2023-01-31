import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { DialogformComponent } from '../dialogform/dialogform.component';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerCallService } from '../services/server-call.service';
export interface SkillSet {
  name: string;
}

@Component({
  selector: 'job-Listing-Home',
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss'],
})
export class ChipsExampleComponent {
  jobData: any;

  constructor(
    private serverCallService: ServerCallService,
    public dailog: MatDialog,
    private http: HttpClient
  ) {
    this.getData();
  }

  getData(): void {
    this.http.get('http://localhost:3000/jobData').subscribe((response) => {
      console.log(response);
      this.jobData = response;
      console.log(this.jobData);
    });
  }

  toggleBadgeVisibility() {
    throw new Error('Method not implemented.');
  }
  title = 'joblisting';
  hidden: any;

  getSearchedData(value: any): void {
    this.http
      .get('http://localhost:3000/jobData?q=' + value)
      .subscribe((response) => {
        console.log(response);
        this.jobData = response;
        if (this.jobData.length == 0) {
          this.noDataFound = true;
        } else {
          this.noDataFound = false;
        }
      });
  }

  onClick() {
    this.dailog.open(DialogformComponent);

    // if job added event triggered in service
    this.serverCallService.jobAdded.subscribe((res) => {
      console.log(res);

      this.getData();
    });
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: SkillSet[] = [];

  noDataFound: boolean = false;

  // to manage actions of chips
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add skills
    if (value) {
      this.skills.push({ name: value });
      console.log('chips added', value);

      // calling method to serach data
      this.getSearchedData(value);

      this.jobData = this.serverCallService.servicejobData;
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: SkillSet): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);

      // action for removing single chips
      if (this.skills.length > 0)
        this.getSearchedData(this.skills[this.skills.length - 1].name);
      else if (this.skills.length == 0) {
        this.removeAllChips();
      }
    }
  }

  removeAllChips() {
    this.skills.splice(0, this.skills.length);
    this.getData();
    this.noDataFound = false;
  }

  edit(skill: SkillSet, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove skill if it no longer has a name
    if (!value) {
      this.remove(skill);
      return;
    }

    // Edit existing skill
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills[index].name = value;
    }
  }

  // to clone the job
  cloneJob(id: any) {
    console.log('clone:', id);

    let CloneObj: any;

    this.jobData?.forEach((job: any) => {
      if (Number(id) == Number(job.id)) {
        CloneObj = JSON.parse(JSON.stringify(job));
        CloneObj.id = Number(
          CloneObj.id +
            100 +
            this.jobData.length +
            1 +
            Math.floor(Math.random() * 100)
        );
      }
    });

    this.serverCallService.forEdit = true;
    this.serverCallService.forClone = true;

    this.jobData?.forEach((job: any) => {
      if (id == job.id) {
        this.serverCallService.editObj = JSON.parse(JSON.stringify(CloneObj));
      }
    });

    this.serverCallService.editJob(Number(CloneObj.id));

    this.dailog.open(DialogformComponent);

    this.serverCallService.jobAdded.subscribe((response) => {
      console.log(response);

      this.getData();
    });
  }

  // to delete the job
  deleteJob(id: any) {
    console.log('delete:', id);

    let deleteJobObj: any;
    this.jobData?.forEach((job: any) => {
      if (Number(id) == Number(job.id)) {
        deleteJobObj = job;
      }
    });

    this.serverCallService.deleteJob(Number(id));

    // getting updated data from server
    this.serverCallService.jobdDeleted.subscribe((response) => {
      console.log(response);
      this.getData();
    });
  }

  // to edit the job
  editJob(id: any) {
    this.serverCallService.forEdit = true;
    this.serverCallService.editJob(Number(id));

    this.jobData?.forEach((job: any) => {
      if (id == job.id) {
        this.serverCallService.editObj = JSON.parse(JSON.stringify(job));
      }
    });

    this.dailog.open(DialogformComponent);

    this.serverCallService.jobEdited.subscribe((response) => {
      this.getData();
    });
  }
}
