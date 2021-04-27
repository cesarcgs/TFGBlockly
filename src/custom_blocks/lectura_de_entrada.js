 Blockly.Constants.Text.HUE = 160;
 Blockly.Blocks['input_variable_int'] = {
    init: function() {
      this.jsonInit({
          "type": "input_variable_int",
          "message0": "Leer entero",
          "inputsInline": false,
          "output": "Number",
          "colour": 20,
          "tooltip": "",
          "helpUrl": ""
        });
    }
  };
  Blockly.Blocks['input_variable_string'] = {
    init: function() {
      this.jsonInit({
          "type": "input_variable_string",
          "message0": "Leer palabra",
          "inputsInline": false,
          "output": "Number",
          "colour": 20,
          "tooltip": "",
          "helpUrl": ""
        });
    }
  };
Blockly.Python['input_variable_int'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'int(f.readline())';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['input_variable_string'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'str(f.readline())';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
