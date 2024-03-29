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
  
  toolbox = `<xml id="toolbox" style="display: none">
  <category id="catLogic" colour="210" name="Lógica">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_operation"></block>
<!-- <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
    <block type="logic_null"></block>
    <block type="logic_ternary"></block> -->
  </category>
  <category id="catLoops" colour="120" name="Bucles">
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="controls_whileUntil"></block>
    <block type="controls_for">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
      <value name="BY">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="controls_forEach"></block>
    <block type="controls_flow_statements"></block>
  </category> 
  <category id="catMath" colour="230" name="Matemáticas">
    <block type="math_number"></block>
    <block type="math_arithmetic">
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="math_single">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">9</field>
        </shadow>
      </value>
    </block>
    <block type="math_trig">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">45</field>
        </shadow>
      </value>
    </block>
    <block type="math_constant"></block>
    <block type="math_number_property">
      <value name="NUMBER_TO_CHECK">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
      </value>
    </block>
    <block type="math_change">
      <value name="DELTA">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="math_round">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">3.1</field>
        </shadow>
      </value>
    </block>
    <block type="math_on_list"></block>
    <block type="math_modulo">
      <value name="DIVIDEND">
        <shadow type="math_number">
          <field name="NUM">64</field>
        </shadow>
      </value>
      <value name="DIVISOR">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="math_constrain">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="LOW">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="HIGH">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_float"></block>
  </category>
  <category id="catText" colour="160" name="Texto">
    <block type="text"></block>
    <block type="text_join"></block>
    <block type="text_append">
      <value name="TEXT">
        <shadow type="text"></shadow>
      </value>
    </block>
    <block type="text_length">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_isEmpty">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_indexOf">
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR">text</field>
        </block>
      </value>
      <value name="FIND">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_charAt">
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR">text</field>
        </block>
      </value>
    </block>
    <block type="text_getSubstring">
      <value name="STRING">
        <block type="variables_get">
          <field name="VAR">text</field>
        </block>
      </value>
    </block>
    <block type="text_changeCase">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_trim">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_print">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_prompt_ext">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
  </category>
  <category id="catInput" colour="20" name="Lectura de entrada">
    <block type="input_variable_int"></block>
    <block type="input_variable_string"></block>
  </category>
  <category id="catLists" colour="260" name="Listas">
    <block type="lists_create_with">
      <mutation items="0"></mutation>
    </block>
    <block type="lists_create_with"></block>
    <block type="lists_repeat">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_indexOf">
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR">list</field>
        </block>
      </value>
    </block>
    <block type="lists_getIndex">
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR">list</field>
        </block>
      </value>
    </block>
    <block type="lists_setIndex">
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR">list</field>
        </block>
      </value>
    </block>
    <block type="lists_getSublist">
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR">list</field>
        </block>
      </value>
    </block>
    <block type="lists_split">
      <value name="DELIM">
        <shadow type="text">
          <field name="TEXT">,</field>
        </shadow>
      </value>
    </block>
    <block type="lists_sort"></block>
  </category>
  <sep></sep>
  <category id="catVariables" colour="330" custom="VARIABLE" name="Variables"></category>
  <category id="catFunctions" colour="290" custom="PROCEDURE" name="Funciones"></category>
</xml>`;
  userResult;
  userResultIntro: string;
  workspace: any;
  tab;
  _id;
  username;
  uniquename;
  //selectedLang;
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
    
  parameters: string;
  @Input() sequence: number;
  @Input() title: string;
  @Input() solution: string;
  @Input() hints: string;
  @Input() description: string;
  @Input() options = {
    value: "python",
    name: "Python"
  };

  editorOptions = { theme: "vs", language: "python" };
  code: string = "";
  submitId: string = "";  

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

  async ngOnInit() {
    
    let codeBlocklyXml = "";
    //console.log("environment", environment);
    this.tab = "description";
    this,this.userResultIntro= "Aquí podrás ver el resultado de tu código para los casos de prueba que aparecen en la descripción";
    this.userResult = "Por favor, entrega una solución válida para ver el resultado";
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
            this.parameters = question.parameters;
            this.submitId = question.id3;

            if(this.parameters != "none") {
              this.toolbox = this.parameters;
            }
            this.workspace = Blockly.inject('blocklyDiv', {
              toolbox: this.toolbox, 
              scrollbars: false
            }); 
            
            
            const query = window.location.search;
            const urlParams = new URLSearchParams(query);
            if(urlParams.get("sub_id")){
              this.submissionService.getSubmissionById(urlParams.get("sub_id")).subscribe(
                submission => {
                  if(submission != null){
                    codeBlocklyXml = submission.solutionBlockly;
                    var xml = Blockly.Xml.textToDom(codeBlocklyXml);
                    Blockly.Xml.domToWorkspace(xml, this.workspace);
                  }
                },
                error => {
                  this.handleError(error);
                }
                );
              }
            this.asyncEnd();
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
    let solution = "import sys\nclass Solution(object):\n\tdef main(self):\n\t\tog_stdout = sys.stdout\n\t\tsys.stdout = open('answer.txt', 'a')\n\t\tfileTestCase = open('testcase.txt', 'r')\n\t\tfor x in range(int(fileTestCase.readline())):\n\t\t\t";
    console.log(Blockly.Python.workspaceToCode(this.workspace));
    solution = solution + Blockly.Python.workspaceToCode(this.workspace).replaceAll('\n', '\n\t\t\t');
    solution = solution + ("\n\t\tsys.stdout.close()\n\t\tsys.stdout = og_stdout\n\t\tfileTestCase.close()")
    
    let xmlBlockly = Blockly.Xml.workspaceToDom(this.workspace);
    let solutionBlockly = Blockly.Xml.domToText(xmlBlockly);
    
    this.printLog(solution);
    this.printLog(this.submitId);
    let submission = new Submission(
      id,
      this.username,
      this.uniquename,
      solution,
      solutionBlockly,
      "initial",
      new Date(),
      0
      );
      this.printLog(submission);
      
      // Submit solution
      this.submissionService.submitSolution(submission).subscribe(
        response => {
          this.printLog(response.message);
          this.userResult = "Por favor, entrega una solución válida para ver el resultado";
          this.userResultIntro = "Aquí podrás ver el resultado de tu código para los casos de prueba que aparecen en la descripción";
          
          if (response.status === "pass") {//si ha acertado

            this.resultMessage = response.message.split('\n')[0];
            this.userResultIntro = response.message.split('\n')[1];
            if(environment.production){
              this.userResult = response.message.split(':\n')[1];
            } else{
              this.userResult = response.message.split(':\r\n')[1];
            }
            this.userResult.substring(0, this.userResult.length - 1)
            //.replace('\n', '');
            this.handleSuccess2(response.message);
            this.testResult = 10;
            
            this.submissionService
            .getQuestionByKeys(this.uniquename, this.username)
            .subscribe(
              question => {
                //ya tenemos la question entera
                //la modificamos
                question.success++;
                //la devolvemos modificada
                this.questionService.updateQuestion(question).subscribe(
                  () => {},
                  error => {
                    this.handleError(error);
                  }
                );  
              },
              error => {
                this.handleError(error);
              }
            );
          } 
          else {
            if(response.message[0] !== 'E'){ //si ha sido respuesta incorrecta pero compila
              this.resultMessage = response.message.split('\n')[0];
              this.userResultIntro = response.message.split('\n')[1];
              if(environment.production){
                this.userResult = response.message.split(':\n')[1];
              } else{
                this.userResult = response.message.split(':\r\n')[1];
              }
              this.userResult.substring(0, this.userResult.length - 1)
              this.handleError2(response.message);
              this.testResult = 20;
            }
            else {
              this.resultMessage = response.message.split('\n')[0];
              this.handleError2(response.message);
              this.testResult = 20;
            }
            this.submissionService
            .getQuestionByKeys(this.uniquename, this.username)
            .subscribe(
              question => {
                //ya tenemos la question entera
                //la modificamos
                question.fails++;
                //la devolvemos modificada
                this.questionService.updateQuestion(question).subscribe(
                  () => {},
                  error => {
                    this.handleError(error);
                  }
                );  
              },
              error => {
                this.handleError(error);
              }
            );
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
