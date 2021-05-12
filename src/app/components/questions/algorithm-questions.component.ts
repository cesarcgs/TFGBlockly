import { Component, OnInit } from "@angular/core";
import { SubmissionService } from "./../../services";
import { BaseComponent } from "../base.component";


@Component({
  selector: "app-algorithm-questions",
  templateUrl: "./algorithm-questions.component.html"
})
export class AlgorithmQuestionsComponent extends BaseComponent {
  //constructor(private submissionService: SubmissionService) {} esto no me suena bien
  questions;
  submissions;
  username;
  doneList: Array<string> = [];
  ngOnInit() {

    this.username = this.authService.getUserName();
    if (this.username === "") {
      this.getQuestions(this.username);
    }
    else {
      this.getSubmissions(this.username);
    }
  }

  ngAfterContentInit() {
  }
  getSubmissions(username: any) {
    this.submissionService.getSubmissionsByOneUser(username).subscribe(
      data => {
        this.submissions = data;
        this.getQuestions(username);
      },
      error => {
        console.log(error);
      }
    );
  }

  //Fetch all questions
  getQuestions(username: any) {
    this.submissionService.getQuestions().subscribe(
      data => {
        this.questions = data;
        if (username !== "") {
          this.showProgress();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  showProgress() {
    let i = 0, j = 0;
    let estado: string; //ni, i, res -- no intentado, intentado, resuelto
    //console.log(this.submissions);
    for (var question of this.questions) {//iteramos todas las questions
      estado = "ni";
      while (i < this.submissions.length) {
        if (question.uniquename === this.submissions[i].questionname) { //si el usuario ha tenido una submission para esa pregunta
          if (this.submissions[i].status === "fail") {
            estado = "i";
            i++;
            j = i;
            break;
          }
          else if (this.submissions[i].status === "pass") {
            estado = "res";
            i++;
            j = i;
            break;
          }
        }
        i++;
        if(i == this.submissions.length) {
          i = j;
          break;
        }
      }
      this.doneList.push(estado);
    }
    console.log(this.doneList);

  }
}
