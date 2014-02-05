/*******************************************************************************
 * Author:		Neil Vosburg
 * File:		figure.js
 *
 *				This class is responsible for putting code into the editor,
 *				creating and calling on the interpreter to step through
 *				the code.
 *******************************************************************************/
 
function Figure(figureNum) {
	var myInterpreter = null;
	var done = false;
	var intervalID;
	var funcList = [];
	var codeStr;
	var runMode = false;
	var varArr = [];
	var scopeArr = [];
	var thisObj = this;
	var _runButton;
	var figDiv;
	var outputBox;
	var varBox;
	var varTable;
	var editor;
	var editorTable;
	var haltFlag;
	var lastLine = -1;
	var firstMove = true;
	
	this.walkButton = walkButton;
	this.runButton = runButton;
	this.updateVariables = updateVariables;
	
	figDiv = document.getElementById("fig" + figureNum + "Div");
	figDiv.innerHTML = '<div class="leftcontent" readonly> \
							<h4>&nbsp;Code Window</h4> \
							<div class="txtarea" style="height:100%; border-style:ridge; background-color:lightgrey;"> \
								<table id="fig' + figureNum + 'Editor" class="codeTable"></table> \
							</div> \
						</div> \
						<aside class="toprightcontent"> \
							<h4>Program Output</h4> \
							<textarea id="fig' + figureNum + 'Output" class="righttxtarea" rows="12" cols="50" wrap="off" readonly></textarea> \
						</aside> \
						<aside class="bottomrightcontent"> \
							<h4>&nbsp;Variables</h4> \
							<div id="fig' + figureNum + 'VarBox" class="bottomrighttxtarea"> \
								<table id="fig' + figureNum + 'VarTable" class="normal"></table> \
							</div> \
							</aside> \
							<div class="rightbuttons" style="height:100%; background-color:red;"> \
								<button type="button" id="fig' + figureNum + 'Run" onclick="figure' + figureNum + '.runButton()">Run</button> \
								<button type="button" onclick="figure' + figureNum + '.walkButton()">Walk</button> \
							</div> ';
							
	outputBox = document.getElementById("fig" + figureNum + "Output");
	varBox = document.getElementById("fig" + figureNum + "VarBox");
	varTable = document.getElementById("fig" + figureNum + "VarTable");
	editorTable = document.getElementById("fig" + figureNum + "Editor");
	editor = new Editor(editorTable, figureNum);
	codeStr = setupFigure(figureNum);
	_runButton = document.getElementById("fig" + figureNum + "Run");
	
	/*
	* setupFigure()
	* Sets up the figure depending on the figure number passed to it.
	*
	* Edit the figures assigned to you, and don't worry about doing the ones that I have specified. The editor doesn't allow
	* to declare a variable in a function yet.
	*
	* Editor Interface
	*
	* Create variable declaration: 			editor.addVariable('variable', [ 'variableName', 'TYPE' ]) (TYPE doesn't mean anything really)
	* Create variable declaration (array):	editor.addVariable('array', [ 'arrayName', 'size', 'TYPE']) (again, TYPE doesn't mean anything to the execution)
	* Create assignment:					editor.addOneLineElement('assignment', [ 'varName', 'value' ]) OR editor.addOneLineElement('assignment', [ 'varName', 'varName|literal', '+|-', 'varName|literal'])
	* Write:								editor.addOneLineElement('write', [ '"TEXT"' ])
	* Writeln:								editor.addOneLineElement('writeln', [ '"TEXT"' ])
	* String Prompt:						editor.addOneLineElement('stringPrompt', [ 'varName', '"TEXT"', 'literal' ])
	* Numeric Prompt:						editor.addOneLineElement('numericPrompt', [ 'varName', '"TEXT"', 'literal' ])
	* Function Call:						editor.addOneLineElement('functionCall', [ 'functionName'(,'param1', 'param2', 'param3' ...)) (NOTE: not implemented for more than one parameter yet)
	* Return:								editor.addOneLineElement('return', ['varName|literal'])
	* While Loop:							editor.addWhile([ 'varName', '>|<|>=|<=|==|!=', 'literal|varName']) (NOTE: > must be &gt;, < must be &lt;, etc; look up codes for other symbols
	* For Loop:								editor.addForLoop([ 'varName', 'literal|varName', 'varName', '>|<|>=|<=|==|!=', 'varName|literal', 'varName', '++|--']) (the parameters go in order of the for loop)
	* If..Then:								editor.addIfThen(([ 'varName|literal', '>|<|>=|<=|==|!=', 'varName|literal'])
	* If..Else:								editor.addIfElse(([ 'varName|literal', '>|<|>=|<=|==|!=', 'varName|literal'])
	* Add Function:							editor.addFunction([ 'functionName'(, 'param1', 'param2', 'param3' ...), 'comment'])
	*
	* Increment Selected Row (by 1):		editor.incSelRow();
	* Decrement Selected Row (by 1):		editor.decSelRow();
	*
	* NOTES:	The selected row is where the editor is going to insert the next line. The selected row will always be the last line after the code you insert. Therefore, after a one line element,
	*			the next line is automatically selected. However, for an IfElse() statement, you must decrement the selected row four times to get inside the IF brackets before adding
	*			code (see figure 22). If you are unsure, just add your code and see where it pops up inside the editor and then adjust as needed. Lastly, always make sure the selected row is
	*			the last empty row when you finish implementing your figure. See the example figures to see how I always incremented the selected row at the end.
	*
	*			The variables may not show up correctly at the moment in the variables box. I'm aware of this. We will get a fix for this soon, hopefully. If there are any bugs, do what you can
	*			and let me know. The most important thing is to just make sure your code looks right in the editor. Please feel free to ask me if you have any questions, problems, or concerns.
	*/
	function setupFigure(figureNum) {
		if (figureNum == 5) {
			// figure 5 code
		}
		else if (figureNum == 6) {
			// figure 6 code
		}
		else if (figureNum == 7) {
			// figure 7 code
		}
		else if (figureNum == 10) {
			// figure 10 code (not sure if mike will keep this one, but let's do it anyway)
		}
		else if (figureNum == 12) {
			// figure 12 code
		}
		else if (figureNum == 13) {
			// figure 13 code
		}
		else if (figureNum == 14) {
			// figure 14 code
		}
		else if (figureNum == 16) {
			// figure 16 code (not sure about this one either, but let's do it)
		}
		else if (figureNum == 18) {
			// figure 18 code
		}
		else if (figureNum == 19) {
			// figure 19 code
		}
		else if (figureNum == 21) {
			// figure 21 code
		}
		else if (figureNum == 22) {
			editor.addVariable('variable', [ 'numberOfGrades', 'NUMERIC' ]);
			editor.addVariable('variable', [ 'total', 'NUMERIC' ]);
			editor.addVariable('variable', [ 'i', 'NUMERIC' ]);
			editor.addVariable('variable', [ 'grade', 'NUMERIC' ]);
			editor.addVariable('variable', [ 'average', 'NUMERIC' ]);
			editor.addOneLineElement('numericPrompt', [ 'numberOfGrades', '"Enter the number of grades."', '0' ]);
			editor.addOneLineElement('assignment', [ 'total', '0' ]);
			editor.addFor([ 'i', '1', 'i', '&lt;=', 'numberOfGrades', 'i', '++' ]);
			editor.decSelRow();
			editor.addOneLineElement('numericPrompt', [ 'grade', '"Enter a grade."', '0' ]);
			editor.addOneLineElement('write', ['"Grade "']);
			editor.addOneLineElement('write', ['i']);
			editor.addOneLineElement('write', ['": "']);
			editor.addOneLineElement('writeln', ['grade']);
			editor.addOneLineElement('assignment', ['total', 'total', '+', 'grade']);
			editor.incSelRow();
			editor.addOneLineElement('write', ['"The average of the grades is "']);
			editor.addIfElse(['numberOfGrades', '&gt;', '0']);
			for (var i = 0; i < 4; i++) editor.decSelRow();
			editor.addOneLineElement('assignment', [ 'average', 'total', '/', 'numberOfGrades']);
			editor.addOneLineElement('write', ['average']);
			for (var i = 0; i < 3; i++) editor.incSelRow();
			editor.addOneLineElement('writeln', ['"undefined"']);
			editor.incSelRow();
		}
		else if (figureNum == 23) {
			// figure 23 code
		}
		else if (figureNum == 24) {
			editor.addVariable('variable', ['count', 'NUMERIC']);
			editor.addOneLineElement('numericPrompt', ['count', '"How many bottles?"', '0']);
			editor.addWhile(['count', '&gt;', '0']);
			editor.decSelRow();
			editor.addOneLineElement('write', ['count']);
			editor.addOneLineElement('writeln', ['" bottles of beer on the wall,"']);
			editor.addOneLineElement('write', ['count']);
			editor.addOneLineElement('writeln', ['" bottles of beer."']);
			editor.addOneLineElement('writeln', ['"Take one down. Pass it around."']);
			editor.addOneLineElement('assignment', ['count', 'count', '-', '1']);
			editor.addOneLineElement('write', ['count']);
			editor.addOneLineElement('writeln', ['" bottles of beer on the wall."']);
			editor.addOneLineElement('writeln', ['" "']);
			editor.incSelRow();
		}
		else if (figureNum == 27) {
			// don't do this one yet; I will have to implement variables within functions before this can be done
		}
		else if (figureNum == 28) {
			// same thing; don't do this one yet, the editor isn't ready for it yet
		}
		else if (figureNum == 29) {
			// figure 29 code
		}
		else if (figureNum == 30) {
			editor.addVariable('variable', ['count', 'NUMERIC']);
			editor.addFunction(['singsong', 'beers', 'Returns nothing']);
			editor.decSelRow(); editor.decSelRow();
			editor.addIfThen(['beers', '&gt;', '0']);
			editor.decSelRow();
			editor.addOneLineElement('write', ['beers']);
			editor.addOneLineElement('writeln', ['" bottles of beer on the wall,"']);
			editor.addOneLineElement('write', ['beers']);
			editor.addOneLineElement('writeln', ['" bottles of beer."']);
			editor.addOneLineElement('writeln', ['"Take one down. Pass it around."']);
			editor.addOneLineElement('assignment', ['beers', 'beers', '-', '1']);
			editor.addOneLineElement('write', ['beers']);
			editor.addOneLineElement('writeln', ['" bottles of beer on the wall."']);
			editor.addOneLineElement('writeln', ['" "']);
			editor.addOneLineElement('functionCall', ['singsong', 'beers' ]);
			//editor.addOneLineElement('writeln', ['"test"']);
			for (var i = 0; i < 4; i++) editor.incSelRow();
			editor.addOneLineElement('numericPrompt', ['count', '"How many bottles?"', '0']);
			editor.addOneLineElement('functionCall', ['singsong', 'count' ]);
			editor.addOneLineElement('writeln', ['"Later..."']);
		}
		else if (figureNum == 32) {
			// figure 32 code
			// the editor will probably give you the wrong variables at the moment for this one
			// just make sure the code appears correct in the editor 
		}
		else if (figureNum == 38) {
			// don't worry about this one at the moment; the editor can't handle it yet
		}
		

		codeStr = editor.getEditorText();

		return codeStr;
	}

	function init(interpreter, scope) {

		var wrapper = function (text) {
			text = text ? text.toString() : '';
			return interpreter.createPrimitive(alert(text));
		};
		interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));

		var wrapper2 = function (text1, text2) {
			text1 = text1 ? text1.toString() : '';
			text2 = text2 ? text2.toString() : '';
			return interpreter.createPrimitive(prompt(text1, text2));
		}
		interpreter.setProperty(scope, 'prompt', interpreter.createNativeFunction(wrapper2));

		var wrapper3 = function (text) {
			text = text ? text.toString() : '';
			return interpreter.createPrimitive(outputBox.value += text);
		};
		interpreter.setProperty(scope, 'document1write', interpreter.createNativeFunction(wrapper3));

		var wrapper4 = function (text) {
			text = text ? text.toString() : '';
			return interpreter.createPrimitive(outputBox.value += text + "\n");
		};
		interpreter.setProperty(scope, 'document1writeln', interpreter.createNativeFunction(wrapper4));

	};

	function parseButton() {
		var code = document.getElementById('code').value
			myInterpreter = new Interpreter(code, init);
		disable('');
	}
	
	function walkButton() {
		if (done) { reset(); return; }
		
		if (myInterpreter === null) myInterpreter = new Interpreter(codeStr, init, thisObj);
		if (runMode == true) {
			clearInterval(intervalID);
			runMode = false;
			_runButton.innerText = "Run";
			return;
		}
		while (walk() == false) { }
	}

	function walk() {
		var res;
		var node;
		var start;
		var end;
		var flag = false;
		var status;
		
		if (done == true) {
			_runButton.innerText = "Run";
			reset();
			return true;
		}
		
		if (firstMove == true) {
			outputBox.value = "";
			clearTable();
			firstMove = false;
		}

		while (flag == false) {
			if (myInterpreter.step() == false) {
				flag = true;
				done = true;
				start = -1;
				end = -1;
			}
			else {
				test();
				if (myInterpreter.stateStack[0]) {
					node = myInterpreter.stateStack[0].node;
					start = node.start;
					end = node.end;
				}
			}
			
			status = editor.isNewLine(start, end);
			if (haltFlag == true) {
				editor.selectLine(status[1]);
				haltFlag = false;
				break;
			}
			else {
				if (status[0] == true) {
					editor.selectLine(status[1]);
					flag = true;
				}
			}
			
		}

		/*
		if (myInterpreter.step() == false) {
			if (editor.selectLine(-1, -1) == false) {
				done = true;
				res = false;
			}
			else res = true;
		}
		else {
			res = editor.selectLine(start, end, varArr.length, haltFlag);
			haltFlag = false;
			test();
			
		}
		*/
		outputBox.scrollTop = outputBox.scrollHeight;
		varBox.scrollTop = varBox.scrollHeight;

		return true;
	}

	function runButton() {
		if (done) reset();
		if (runMode == true) {
			clearInterval(intervalID);
			_runButton.innerText = "Run";
			runMode = false;
			return;
		}
		_runButton.innerText = "Stop";
		if (myInterpreter === null) myInterpreter = new Interpreter(codeStr, init, thisObj);
		
		runMode = true;
		intervalID = setInterval(run, 100);
	}
	
	function run() {
		walk();
		//while(walk() == false);
	}

	function reset() {
		console.log("Resetting.");
		_runButton.innerText = "Run";
		done = false;
		runMode = false;
		varArr = [];
		scopeArr = [];
		clearInterval(intervalID);
		myInterpreter = null;
		editor.reset();
		firstMove = true;
		console.log("Reset done.");
	}
	
	function updateVariables(mode, scope, leftValue, rightValue) {
		var found = false;
		if (mode == "add") {
			for (var i = 0; i < varArr.length; i++) {
				if (scope == varArr[i][0] && (varArr[i][1] == leftValue || varArr[i][1].data == leftValue)) {
					if (varArr[i].length == 2) varrArr[i].push(rightValue);
					else varArr[i][2] = rightValue;
					found = true;
					break;
				}
			}
			if (!found) {
				if (leftValue.data && rightValue.data) varArr.push([scope, leftValue.data, rightValue.data]);
				else if (leftValue.data) varArr.push([scope, leftValue.data, rightValue]);
				else if (rightValue.data) varArr.push([scope, leftValue, rightValue.data]);
				else varArr.push([scope, leftValue, rightValue]);
				
				scopeArr.push(scope);
			}
		}
		else {
			for (var i = 0; i < varArr.length; i++) {
				if (scope == varArr[i][0] && (varArr[i][1] == leftValue || varArr[i][1].data == leftValue)) {
					var scopeNum = getScopeNum(varArr[i][0]);
					if (scopeNum != -1) scopeArr.splice(scopeNum, 1);
					varArr.splice(i, 1);
				}
			}
		}
		
		updateTable();
	}
	
	function test() {
		var scopeNum;
		try {
			scopeNum = getScopeNum(myInterpreter.getScope());
		}
		catch (err) {
			return;
		}
		
		var count = 0;
		for (var i = 0; i < varArr.length; i++) {
			if (getScopeNum(varArr[i][0]) > scopeNum) { updateVariables("del", varArr[i][0], varArr[i][1]); haltFlag = true; }
		}
		/*
		for (var i = 0; i < varArr.length; i++) {
			if (varArr[i][0] == scope) {
				console.log("Scope: " + getScopeNum(varArr[i][0]) + " :: Variable: " + varArr[i][1] + " :: Value: " + varArr[i][2]);
				for (var j = 0; j < varArr.length; j++) {
					if (i != j && varArr[j].length > 2 && getScopeNum(varArr[j][0]) > getScopeNum(varArr[i][0]) && varArr[i][1] == varArr[j][1]) {
						console.log("Deleting...");
						updateVariables("del", varArr[j][0], varArr[j][1]);
					}
					else {
						console.log("i,j: " + i + "," + j);
						console.log("Length: " + varArr[j].length);
						console.log("JScope: " + getScopeNum(varArr[j][0]) + "  :: iScope: " + getScopeNum(varArr[i][0]));
						console.log("jName: " + varArr[j][1] + " :: iName: " + varArr[i][1]);
						console.log(varArr[j][1]);
					}
				}
			}
		}
		*/
	}
	
	function getScopeNum(scope) {
		for (var i = 0; i < scopeArr.length; i++) if (scopeArr[i] == scope) return i;
		return -1;
	}
	
	
	function clearTable() {
		varTable.innerHTML = "";
		return;
	}
	
	function updateTable() { 
		varTable.innerHTML = "";
		var row;
		var cell;
		
		row = varTable.insertRow(0);
		for (var i = 0; i < 3; i++) {
			cell = row.insertCell(i);
			if (i == 0) cell.innerText = "scope";
			else if (i == 1) cell.innerText = "variable";
			else cell.innerText = "value";
		}
		
		for (var i = 0; i < varArr.length; i++) {
			row = varTable.insertRow(i + 1);
			for (var j = 0; j < 3; j++) {
				cell = row.insertCell(j);
				if (j == 0) cell.innerText = getScopeNum(varArr[i][0]);
				else if (j == 1) cell.innerText = varArr[i][1];
				else cell.innerText = varArr[i][2];
			}
		}
	}
}
