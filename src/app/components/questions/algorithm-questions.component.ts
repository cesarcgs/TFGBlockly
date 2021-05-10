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
    this.getSubmissions(this.username); 
  }
  
  ngAfterContentInit() {//aqui hay que meter una pinky promise
  }
  getSubmissions(username: any) {
    this.submissionService.getSubmissionsByOneUser(username).subscribe(
      data => {
        this.submissions = data;
        this.getQuestions();
      },
      error => {
        console.log(error);
      }
      );
    }
    
    //Fetch all questions
    getQuestions() {
      this.submissionService.getQuestions().subscribe(
        data => {
          let i = 0;
          this.questions = data;
          let estado: string; //ni, i, res -- no intentado, intentado, resuelto
          console.log(this.submissions);
          for(var question of this.questions) {//iteramos todas las questions
            estado = "ni";
            while(i < this.submissions.length){
              if(question.uniquename === this.submissions[i].questionname) {//si el usuario ha tenido una submission para esa pregunta
                if(this.submissions[i].status === "fail") {
                  estado = "i";
                  i++;
                  break;
                }
                else if (this.submissions[i].status === "pass"){
                  estado = "res";
                  i++;
                  break;
                }
              } 
              i++;
            }
            this.doneList.push(estado);
          }
          console.log(this.doneList);
      },
      error => {
        console.log(error);
      }
    );
  }
}
