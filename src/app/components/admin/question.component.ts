import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseComponent } from "../base.component";
import { DiffEditorModel } from "ngx-monaco-editor";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html"
})
export class QuestionComponent extends BaseComponent {
  // configuration of rich text editor(ngx-editor)
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: "20rem",
    minHeight: "5rem",
    width: "auto",
    minWidth: "0",
    translate: "no",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    imageEndPoint: "",
    toolbar: [
      [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "superscript",
        "subscript"
      ],
      ["fontName", "fontSize", "color"],
      [
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "indent",
        "outdent"
      ],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      [
        "paragraph",
        "blockquote",
        "removeBlockquote",
        "horizontalLine",
        "orderedList",
        "unorderedList"
      ],
      ["link", "unlink", "image", "video"]
    ]
  };

  _id;

  public selectedValue;
  public htmlContent; //todo , can be deleted
  //public text;

  editorOptions1 = {
    theme: "vs",
    language: "java"
  };
  editorOptions2 = {
    theme: "vs",
    language: "javascript"
  };
  editorOptions3 = {
    theme: "vs",
    language: "python"
  };
  code1: string = 'function x() {\nconsole.log("Hello world!");\n}';
  code2: string = 'function x() {\nconsole.log("Hello world!");\n}';
  code3: string = 'function x() {\nconsole.log("Hello world!");\n}';

  onTitleChange(value) {
    if (value) {
      let words = value.split(" ");
      let name = "";
      for (let i = 0; i < words.length; i++) {
        name += words[i].toLowerCase();
        name += "-";
      }
      this.baseForm.get("uniquename").setValue(name.slice(0, name.length - 1));
    } else {
      this.baseForm.get("uniquename").setValue("");
    }
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    if (this._id == null || this._id == "") {
      this.initialValidation = true;
      // create
      this.baseForm = this.formBuilder.group({
        sequence: [
          null,
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(2147483647)
          ]
        ],
        title: [null, [Validators.required, Validators.minLength(5)]],
        uniquename: [null, [Validators.required]],
        description: [null, [Validators.required]],
        parameters: ["none", [Validators.required]],
        difficulty: [10, [Validators.required]],
        hints: [],
        solution: [],
        fails: [0],
        success:[0]
      });
      this.selectedValue = 10;
      //this.htmlContent = "";
      //this.codecontent = "";
    } else {
      this.baseForm = this.formBuilder.group({
        _id: [],
        sequence: [],
        title: [],
        uniquename: [],
        description: [],
        difficulty: [],
        hints: [],
        solution: [],
        parameters: [],
        fails: [],
        success: []
      });

      /*
      this.baseForm = this.formBuilder.group({
        _id: [null, [Validators.required]],
        sequence: [
          null,
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(2147483647)
          ]
        ],
        title: [null, [Validators.required, Validators.minLength(5)]],
        uniquename: [null, [Validators.required]],
        description: [null, [Validators.required]],
        difficulty: [null, [Validators.required]],
        frequency: [
          null,
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(100)
          ]
        ],
        rating: [
          null,
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(5)
          ]
        ]
      });*/
      this.questionService.getQuestionById(this._id).subscribe(
        question => {
          this.baseForm.setValue({
            _id: question._id,
            sequence: question.sequence,
            title: question.title,
            uniquename: question.uniquename,
            description: question.description,
            difficulty: question.difficulty,
            hints: question.hints,
            parameters: question.parameters,
            solution: question.solution || "",
            fails: question.fails,
            success: question.success
          });

          // add validation later to avoid flash of red message
          this.baseForm.controls["_id"].setValidators([Validators.required]);
          this.baseForm.controls["sequence"].setValidators([
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(2147483647)
          ]);
          this.baseForm.controls["title"].setValidators([
            Validators.required,
            Validators.minLength(5)
          ]);
          this.baseForm.controls["uniquename"].setValidators([
            Validators.required
          ]);
          this.baseForm.controls["description"].setValidators([
            Validators.required
          ]);
          this.baseForm.controls["parameters"].setValidators([
            Validators.required
          ]);
          this.baseForm.controls["difficulty"].setValidators([
            Validators.required
          ]);
          this.selectedValue = question.difficulty;
          //this.htmlContent = question.description;
        },
        error => {
          this.printError(error);
        }
      );
    }
  }

  //Handle create and update question
  onSubmit() {
    if (!this.validate()) {
      return;
    }

    let question = this.baseForm.value;
    this.printLog(question);

    if (question._id == null || question._id == "") {
      //Create question
      question._id = "";
      this.questionService.createQuestion(question).subscribe(
        () => {
          this.handleSuccess(
            "Problema creado correctamente.",
            true,
            "/admin/questions"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      //Update question
      this.questionService.updateQuestion(question).subscribe(
        () => {
          this.handleSuccess(
            "Problema editado correctamente.",
            true,
            "/admin/questions"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }
}
