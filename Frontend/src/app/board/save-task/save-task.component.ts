import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {

  public taskData: any;
  public errorMessage: String;
  public selectedFile: any;

  constructor(private boardService: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  saveTask() {
    if (!this.taskData.name || !this.taskData.description) {
      console.log('Failed process: Incomplete data');
      this.errorMessage = 'Failed process: Incomplete data';
      this.closeAlert();
    } else {
      this.boardService.saveTask(this.taskData).subscribe(
        (res) => {
          console.log(res);
          //localStorage.setItem('token', '');
          this.taskData = {};
          this.router.navigate(['/listTask']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      );
    }
  }

  upload(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  saveTaskImg() {
    if (!this.taskData.name || !this.taskData.description || !this.selectedFile) {
      this.errorMessage = 'incomplete data';
      console.log('incomplete data');
      this.closeAlert();
    } else {
      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name);
      data.append('name', this.taskData.name);
      data.append('description', this.taskData.description);
      this.boardService.saveTaskImg(data).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['listTask']);
        },
        (err) => {
          console.log(err.error);
          this.errorMessage = err.erro;
          this.closeAlert();
        }
      );
    }
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }

}
