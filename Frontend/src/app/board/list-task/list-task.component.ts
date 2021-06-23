import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  public tasksData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(private router: Router, private boardService: BoardService) {
    this.tasksData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.boardService.listTask().subscribe(
      (res) => {
        console.log(res);
        this.tasksData = res.board;
      },
      (err) => {
        console.log(err.error);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  updateTask(task: any, status: String) {
    const tempStatus = task.status;
    task.status = status;
    this.boardService.updatedTask(task).subscribe(
      (res) => {
        task.status = status;
      },
      (err) => {
        task.status = tempStatus;
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  deleteTask(task: any) {
    this.boardService.deleteTask(task).subscribe(
      (res) => {
        const index = this.tasksData.indexOf(task);
        if (index > -1) {
          this.tasksData.splice(index, 1);
          this.successMessage = "Task delete";
          this.closeAlert();
        }
      },
      (err) => {
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  closeAlert() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  closeX() { 
      this.successMessage = '';
      this.errorMessage = '';
  }

}
