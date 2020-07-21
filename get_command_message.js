module.exports = function(RED) {

	function multiple_compare(self, file, slot, currentMode_n){
		console.log(self);
		for(var i=0; i<self.qtdCompare; i++){
			var _compare_n = {};

			if (self.compare_n[i] == "equalTo") {
				_compare_n = { command_value: {"==": (!isNaN(parseFloat(self.equal_n[i])))? parseFloat(self.equal_n[i]):self.equal_n[i] } };
			}
			if (self.compare_n[i] == "interval") {
				_compare_n = { command_value: {">=": parseFloat(self.minValue_n[i]), "<=": parseFloat(self.maxValue_n[i])} };
			}
			if (self.compare_n[i] == "maxValue") {
				_compare_n = { command_value: {">=": null, "<=": parseFloat(self.maxValue_n[i])} };
			}
			if (self.compare_n[i] == "minValue") {
				_compare_n = { command_value: {">=": parseFloat(self.minValue_n[i]), "<=": null} };
			}

			if(!(slot === "begin" || slot === "end")){
                if(currentMode_n == "test"){
                    file.slots[slot].jig_test.push({
						type: "processing_modular_V1_0",
						slot: 1,
						compare: _compare_n,
						method: "compare_support",
						command_in: "",
						get_output: {
							command_in: "command_out"
						}
					}); 
                }
                else{
                    file.slots[slot].jig_error.push({
						type: "processing_modular_V1_0",
						slot: 1,
						compare: _compare_n,
						method: "compare_support",
						command_in: "",
						get_output: {
							command_in: "command_out"
						}
					}); 
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push({
						type: "processing_modular_V1_0",
						slot: 1,
						compare: _compare_n,
						method: "compare_support",
						command_in: "",
						get_output: {
							command_in: "command_out"
						}
					}); 
                }
                else{
                    file.slots[3].jig_test.push({
						type: "processing_modular_V1_0",
						slot: 1,
						compare: _compare_n,
						method: "compare_support",
						command_in: "",
						get_output: {
							command_in: "command_out"
						}
					}); 
                }
            }
		}

		return file;
	}

	function get_command_messageNode(config) {
		RED.nodes.createNode(this,config);
		this.command_ref = config.command_ref;
		this.compare_select = config.compare_select;
		this.equalTo = config.equalTo;
		this.maxValue = config.maxValue;
		this.minValue = config.minValue;
        this.qtdCompare = config.qtdCompare;
		
		this.compare_n=[]; this.equal_n=[]; this.maxValue_n = []; this.minValue_n = [];		
        this.compare_n.push(config.compare_select1); this.equal_n.push( config.equalTo1); this.maxValue_n.push(config.maxValue1); this.minValue_n.push(config.minValue1);
        this.compare_n.push(config.compare_select2); this.equal_n.push( config.equalTo2); this.maxValue_n.push(config.maxValue2); this.minValue_n.push(config.minValue2);
        this.compare_n.push(config.compare_select3); this.equal_n.push( config.equalTo3); this.maxValue_n.push(config.maxValue3); this.minValue_n.push(config.minValue3);
        this.compare_n.push(config.compare_select4); this.equal_n.push( config.equalTo4); this.maxValue_n.push(config.maxValue4); this.minValue_n.push(config.minValue4);
        this.compare_n.push(config.compare_select5); this.equal_n.push( config.equalTo5); this.maxValue_n.push(config.maxValue5); this.minValue_n.push(config.minValue5);
        this.compare_n.push(config.compare_select6); this.equal_n.push( config.equalTo6); this.maxValue_n.push(config.maxValue6); this.minValue_n.push(config.minValue6);
        this.compare_n.push(config.compare_select7); this.equal_n.push( config.equalTo7); this.maxValue_n.push(config.maxValue7); this.minValue_n.push(config.minValue7);
        this.compare_n.push(config.compare_select8); this.equal_n.push( config.equalTo8); this.maxValue_n.push(config.maxValue8); this.minValue_n.push(config.minValue8);
        this.compare_n.push(config.compare_select9); this.equal_n.push( config.equalTo9); this.maxValue_n.push(config.maxValue9); this.minValue_n.push(config.minValue9);
        this.compare_n.push(config.compare_select10); this.equal_n.push( config.equalTo10); this.maxValue_n.push(config.maxValue10); this.minValue_n.push(config.minValue10);
		
		var node = this;
		node.on('input', function(msg) {
			var _compare = {};
			var globalContext = node.context().global;
			var file = globalContext.get("exportFile");
			var test_file = {};
			var slot = globalContext.get("slot");
			
			var currentMode = globalContext.get("currentMode");
			if (node.compare_select == "equalTo") {
				_compare = {
					command_value: {"==": (!isNaN(parseFloat(node.equalTo)))? parseFloat(node.equalTo):node.equalTo }
				};
			}
			if (node.compare_select == "interval") {
				_compare = {
					command_value: {">=": parseFloat(node.minValue), "<=": parseFloat(node.maxValue)}
				};
			}
			if (node.compare_select == "maxValue") {
				_compare = {
					command_value: {">=": null, "<=": parseFloat(node.maxValue)}
				};
			}
			if (node.compare_select == "minValue") {
				_compare = {
					command_value: {">=": parseFloat(node.minValue), "<=": null}
				};
			}
			var command = {
				type: "processing_modular_V1_0",
				slot: 1,
				compare: _compare,
				method: "get_command_message",
				message_in: "",
				command_ref: node.command_ref,
				get_output: {message_in: "message_received"}
			};
			console.log("ok")
			if(!(slot === "begin" || slot === "end")){
                if (currentMode == "test") {
					file.slots[slot].jig_test.push(command);
					test_file = multiple_compare(node, file, slot, currentMode);
				}
				else { 
					file.slots[slot].jig_error.push(command);
					test_file = multiple_compare(node, file, slot, currentMode);
				}
            }
            else{
                if (slot == "begin") {
					// file.begin.push(command);
                    file.slots[0].jig_test.push(command);
					test_file = multiple_compare(node, file, slot, currentMode);
				}
				else { 
					// file.end.push(command);
                    file.slots[3].jig_test.push(command);
					test_file = multiple_compare(node, file, slot, currentMode);
				}
            }

			globalContext.set("exportFile", test_file);
			console.log(command);
			
			node.send(msg);
		});
	}
	RED.nodes.registerType("get_command_message", get_command_messageNode);
};