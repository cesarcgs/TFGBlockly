import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-contextual-label",
  templateUrl: "./contextual-label.component.html",
  styleUrls: ["./contextual-label.component.css"]
})
export class ContextualLabelComponent implements OnInit {
  options = { 10: "Fácil", 20: "Medio", 30: "Difícil" };

  constructor() {}

  ngOnInit() {
    this.label = this.options[this.difficulty];
    let styleClass = "label round ";
    if (this.difficulty == 10) {
      styleClass += "label-success";
    } else if (this.difficulty == 20) {
      styleClass += "label-warning";
    } else if (this.difficulty == 30) {
      styleClass += "label-danger";
    }

    this.style = styleClass;
  }

  @Input() difficulty: number;
  @Input() style: string;
  @Input() label: string;
}
