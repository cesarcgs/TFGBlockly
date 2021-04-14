import { Component, ViewChild, Input, OnInit, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Question, Submission } from "../../models";
import { BaseComponent } from "../base.component";
import { environment } from "../../../environments/environment";

declare var Blockly: any;

@Component({
  selector: "app-algorithm-question",
  styleUrls: ["algorithm-question.component.css"],
  templateUrl: "./algorithm-question.component.html"
})
export class AlgorithmQuestionComponent extends BaseComponent {
  editorConfig = {
    editable: false,
    spellcheck: false,
    height: "auto",
    minHeight: "5rem",
    width: "auto",
    minWidth: "0",
    translate: "no",
    enableToolbar: false,
    showToolbar: false,
    placeholder: "Enter text here...",
    imageEndPoint: "",
    toolbar: []
  };
  
  workspace: any;
  tab;
  _id;
  username;
  uniquename;
  selectedLang;
  submissions: any = [];
  testResult: number; // -1: not submitted, 10: pass, 20: fail
  resultMessage;
  //Create form

  //Borrar
  baseForm = new FormGroup({
    language: new FormControl(
      "javascript",
      Validators.compose([Validators.required])
      ),
      solution1: new FormControl("", Validators.compose([Validators.required])),
      solution2: new FormControl("", Validators.compose([Validators.required])),
      solution3: new FormControl("", Validators.compose([Validators.required])),
      output: new FormControl("", null)
  });

  @Input() sequence: number;
  @Input() title: string;
  @Input() description: string;
  @Input() solution: string;
  @Input() hints: string;
  @Input() options = {
    value: "python",
    name: "Python"
  };

  editorOptions = { theme: "vs", language: "python" };
  code: string = "";
  submitId: string = "";  

  onChange(language) {
    this.printLog(language);
    this.selectedLang = language;
  }

  changeTab(tab) {
    this.tab = tab;
    this.refresh();
  }

  refresh() {
    if (this.tab === "submissions") {
      this.asyncBegin();
      this.submissionService
        .getSubmissions(this.username, this.uniquename)
        .subscribe(
          data => {
            this.submissions = data;
            this.asyncEnd();
          },
          error => {
            this.handleError(error);
          }
        );
    }
  }

  ngOnInit() {
    
    console.log("environment", environment);
    this.tab = "description";
    this.testResult = -1;
    this.uniquename = this.route.snapshot.paramMap.get("uniquename");
    this.username = this.authService.getUserName();
    if (this.uniquename != null) {
      this.asyncBegin();
      this.submissionService
        .getQuestionByKeys(this.uniquename, this.username)
        .subscribe(
          question => {
            this.printLog(question);
            this.sequence = question.sequence;
            this.title = question.title;
            this.description = question.description;
            this.solution = question.solution;
            this.hints = question.hints;
            this.baseForm.setValue({
              language: "javascript",
              solution1: question.mainfunction,
              solution2: question.jsmain,
              solution3: question.pythonmain,
              output: ""
            });
            this.code = question.pythonmain;
            this.selectedLang = "javascript";
            this.submitId = question.id3;
            this.asyncEnd();
          },
          error => {
            this.handleError(error);
          }
        );
    }
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      scrollbars: false
    }); 
  }

  onSave() {
    this.testResult = -1;
    if (!this.validate()) {
      return;
    }

    //Form is valid, now perform create or update
    let question = this.baseForm.value;
    this.printLog(question);

    let id = "";
    let solution = "";
    id = this.submitId;
    solution = this.code;
    let submission = new Submission(
      id,
      this.username,
      this.uniquename,
      question.language,
      solution,
      "initial",
      new Date(),
      null,
      0
    );
    this.printLog(submission);

    if (id == null || id == "") {
      //Create question
      this.submissionService.createSubmission(submission).subscribe(
        newsubmission => {
          this.submitId = newsubmission._id;
          this.handleSuccess("Your solution has been saved successfully.");
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      //Update question
      this.submissionService.updateSubmission(submission).subscribe(
        updatedsubmission => {
          this.submitId = updatedsubmission._id;
          this.handleSuccess("Your solution has been updated successfully.");
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  onSubmitSolution() {
    this.testResult = -1;
    /*if (!this.validate2()) {
      return;
    }*/

    //Form is valid, now perform create or update
    //let question = this.baseForm.value;
    //this.printLog(question);
    let id = this.submitId;
    //let solution = this.code;
    let solution = "import sys\nclass Solution(object):\n\tdef main(self):\n\t\tog_stdout = sys.stdout\n\t\tsys.stdout = open('answer.txt', 'a')\n\t\t";
    console.log(Blockly.Python.workspaceToCode(this.workspace));
    solution = solution + Blockly.Python.workspaceToCode(this.workspace).replaceAll('\n', '\n\t\t');
    solution = solution + ("sys.stdout.close()\n\t\tsys.stdout = og_stdout")
    this.printLog(solution);
    this.printLog(this.submitId);
    let submission = new Submission(
      id,
      this.username,
      this.uniquename,
      "python",
      solution,
      "initial",
      new Date(),
      null,
      0
    );
    this.printLog(submission);

    // Submit solution
    this.submissionService.submitSolution(submission).subscribe(
      response => {
        this.printLog(response);
        /*
        this.baseForm.setValue({
          language: submission.language,
          solution: submission.solution,
          output: response.message
          //status: submission.status
        });*/
        if (response.status === "pass") {
          this.handleSuccess2(response.message);
          this.testResult = 10;
          this.resultMessage = response.message;
        } else {
          this.handleError2(response.message);
          this.testResult = 20;
          this.resultMessage = response.message;
        }
        // reset id to null to avoid update
        this.submitId = "";
        this.refresh();
      },
      error => {
        this.handleError2(error);
      }
    );
  }
}
