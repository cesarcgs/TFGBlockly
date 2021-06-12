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
  questionscheck;
  submissions;
  username;
  doneList: Array<string> = [];
  freqList: Array<number> = [];
  ngOnInit() {

    this.username = this.authService.getUserName();
    if (this.username === "") {
      this.getQuestions(this.username);
    }
    else {
      this.getSubmissions(this.username);
    }
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
    this.submissionService.getQuestionsCheck().subscribe(
      data => {
        this.questionscheck = data;
        if (username !== "") {
          this.showProgress();
        }
        this.submissionService.getQuestions().subscribe(
          data => {
            this.questions = data;
            },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  showProgress() {
    let i = 0, j = 0;
    let estado: string; //ni, i, res -- no intentado, intentado, resuelto
    for (var question of this.questionscheck) {
      this.doneList.push();//populate array
      this.freqList.push();
    }
    for (var question of this.questionscheck) {//iteramos todas las questions
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
      this.freqList[question.sequence - 1] = 100 * question.success / (question.fails + question.success);
      this.doneList[question.sequence - 1] = estado;
    }
    console.log(this.doneList);
    console.log(this.freqList);
  }
}
