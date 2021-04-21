/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
 //'use strict';

 /*goog.provide('Blockly.Blocks.texts');  // Deprecated
 goog.provide('Blockly.Constants.Text');
 
 goog.require('Blockly');
 goog.require('Blockly.Blocks');
 goog.require('Blockly.FieldDropdown');
 goog.require('Blockly.FieldImage');
 goog.require('Blockly.FieldMultilineInput');
 goog.require('Blockly.FieldTextInput');
 goog.require('Blockly.FieldVariable');
 goog.require('Blockly.Mutator');
 */
 
 /**
  * Unused constant for the common HSV hue for all blocks in this category.
  * @deprecated Use Blockly.Msg['TEXTS_HUE']. (2018 April 5)
  */
 Blockly.Constants.Text.HUE = 160;
 
 Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
   // Block for text value
   {
     "type": "input_variable_int",
     "message0": "Input variable",
     "inputsInline": false,
     "output": "Number",
     "colour": 45,
     "tooltip": "",
     "helpUrl": ""
   }
 ]);  // END JSON EXTRACT (Do not delete this comment.)
 
 Blockly.Blocks['input_variable_int'] = {
    init: function() {
      this.jsonInit({
          "type": "input_variable_int",
          "message0": "Input variable",
          "inputsInline": false,
          "output": "Number",
          "colour": 45,
          "tooltip": "haz movidas",
          "helpUrl": ""
        });
    }
  };
  