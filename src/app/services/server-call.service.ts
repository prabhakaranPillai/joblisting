import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ServerCallService {
  servicejobData: any;
  forEdit: boolean = false;
  forClone: boolean = false;

  // event emmiters
  jobAdded = new EventEmitter<any>();
  jobEdited = new EventEmitter<any>();
  jobdDeleted = new EventEmitter<any>();

  constructor(private http: HttpClient, public dailog: MatDialog) {
    this.http.get('http://localhost:3000/jobData').subscribe((response) => {
      console.log(response);
      this.servicejobData = response;
      console.log(this.servicejobData);
    });
    console.log('from server:', this.servicejobData);
  }

  // get data from server
  getData() {
    this.http.get('http://localhost:3000/jobData').subscribe((response) => {
      console.log(response);
      this.servicejobData = response;
      console.log(this.servicejobData);
    });
  }

  getUpdatedData() {
    let data = this.http
      .get('http://localhost:3000/jobData')
      .subscribe((res) => {
        console.log(res);
        this.servicejobData = res;
      });
    return data;
  }

  editCompletedData: any;

  addJob(newJobObject: any) {
    if (!this.forEdit) {
      this.http
        .post('http://localhost:3000/jobData', newJobObject)
        .subscribe((response) => {
          console.log(response);
          this.getData();
          this.jobAdded.emit('added');
        });
    } else if (this.forEdit && !this.forClone) {
      this.http
        .patch('http://localhost:3000/jobData/' + newJobObject.id, newJobObject)
        .subscribe((response) => {
          console.log(response);
          this.getData();
          this.jobEdited.emit(newJobObject.id + ' edited');
          this.forEdit = false;
        });

      console.log('changed data', this.servicejobData);
    } else {
      this.http
        .post('http://localhost:3000/jobData', newJobObject)
        .subscribe((response) => {
          console.log(response);
          this.getData();
          this.jobAdded.emit('added');
          this.forClone = false;
          this.forEdit = false;
        });
    }
  }

  editObj: any;

  editJob(id: any) {
    this.http.get('http://localhost:3000/jobData').subscribe((response) => {
      this.servicejobData = response;
    });
  }

  deleteJob(id: any) {
    console.log('delete:', id);

    let deleteJobObj: any;
    this.servicejobData?.forEach((job: any) => {
      if (Number(id) == Number(job.id)) {
        deleteJobObj = job;
      }
    });

    // deleting job in the server
    this.http
      .delete('http://localhost:3000/jobData/' + id, deleteJobObj)
      .subscribe((response) => {
        console.log(response);

        this.jobdDeleted.emit(id + 'Deleted');
      });

    this.getData();
  }
}
