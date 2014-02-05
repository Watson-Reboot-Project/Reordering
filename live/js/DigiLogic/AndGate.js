/**************************************************************************************
*	Author:		Neil Vosburg
*	Class:		AndGate.js
*
*	Behavior:	This class represents the functionality of an AND gate. The class contains
*				variables for "plugins", "plugout", "plugoutWire", and "plugoutComp".
*				Plugins for the AND gate are the two input lines. The AND gate has one plugout
*				which is the one line associated with its output. The plugout wire is
*				associated with the line that runs to the component it is connected to
*				from its plugout. The "plugoutComp" stands for plugout component, which is
*				the components the AND gate outputs to. Note that this class and the OrGate
*				class is very similar (the only major difference is the evaluate function).
***************************************************************************************/

function AndGate(initX, initY, setName, id, setup) {
	
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; VARIABLE DECLARATIONS ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	
	var plugin1 = null;				// the first (top) input line
	var plugin1Val = -1;
	var connectorPlugin1;			// if this gate's plugin1 is connected to a connector, this keeps track of the plugout number of the connector it is connected to
	var plugin1Comp = null;			// the component that is connected to plugin1
	
	var plugin2 = null;				// the second (bottom) input line
	var plugin2Val = -1;
	var connectorPlugin2;			// if this gate's plugin2 is connected to a connector, this keeps track of the plugout number of the connector it is connected to
	var plugin2Comp = null;			// the component that is connected to plugin2

	var plugout = null;				// the output line
	var plugoutWire = null;			// the wire the connects the output to the input of another gate
	var plugoutComp = null;			// the component this gate's output is connected to
	
	var name = setName;				// the name of this gate
	var ID = id;					// the ID of this gate
	
	var group;						// the group that all of the AND gate's components are added to
	var gateShape;					// the custom shape for the AND gate
	var transFg;					// a transparent foreground for the AND gate
	
	var scale = setup.getGScale();
	var mainLayer = setup.getMainLayer();
	var stage = setup.getStage();
	var thisObj = this;
	
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; FUNCTION DECLARATIONS ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	
	this.draw = draw;
	this.getType = getType;
	this.getFunc = getFunc;
	this.getName = getName;
	this.getID = getID;
	this.getGroup = getGroup;
	this.getPlugin = getPlugin;
	this.getPluginComp = getPluginComp;
	this.setPluginComp = setPluginComp;
	this.getConnectorPlugin = getConnectorPlugin;
	this.setConnectorPlugin = setConnectorPlugin;
	this.getPlugout = getPlugout;
	this.getPlugoutComp = getPlugoutComp;
	this.setPlugoutComp = setPlugoutComp;
	this.getPlugoutWire = getPlugoutWire;
	this.setPlugoutWire = setPlugoutWire;
	this.setPluginCompNull = setPluginCompNull;
	this.setPluginVal = setPluginVal;
	this.evaluate = evaluate;
	this.probe = probe;
	
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; VARIABLE ASSIGNMENTS ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	
	// a custom shape to draw the AND gate; composed of one quadratic curve and a line
	gateShape = new Kinetic.Shape({
			drawFunc : function (context) {
				// begin custom shape
				context.beginPath();
				context.moveTo(scale * 50, 0);
				context.quadraticCurveTo(scale * 125, scale * 25, scale * 50, scale * 50);
				// complete custom shape
				context.closePath();
				// KineticJS specific context method
				context.fillStrokeShape(this);
			},
			stroke : 'black',
			strokeWidth : 1,
		});

	// the line for the first plugin
	plugin1 = new Kinetic.Line({
			points : [scale * 12, scale * 12, scale * 50, scale * 12],
			stroke : 'black',
			strokeWidth : 1,
			lineCap : 'round',
			lineJoin : 'round'
		});

	// the line for the second plugin
	plugin2 = new Kinetic.Line({
			points : [scale * 12, scale * 38, scale * 50, scale * 38],
			stroke : 'black',
			strokeWidth : 1,
			lineCap : 'round',
			lineJoin : 'round'
		});

	// the line for the plugout
	plugout = new Kinetic.Line({
			points : [scale * 87, scale * 25, scale * 123, scale * 25],
			stroke : 'black',
			strokeWidth : 1,
			lineCap : 'round',
			lineJoin : 'round'
		});

	// create the transparent rectangle that makes it easy to click the AND gate		
	transFg = new Kinetic.Rect({
		x: scale * 12,
		y: scale * 0,
		width: plugout.getPoints()[1].x - plugin1.getPoints()[0].x,
		height: (plugin2.getPoints()[0].y + 10)
	});

	// create the group for the components that make up the AND gate; place it at the x,y coords passed to the object
	group = new Kinetic.Group({
			x : initX,
			y : initY,
			rotationDeg : 0,
			draggable : false
		});

	// add cursor styling when the user mouseovers the group
	group.on('mouseover', function () {
		document.body.style.cursor = 'pointer';
	});
	group.on('mouseout', function () {
		document.body.style.cursor = 'default';
	});
	
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; FUNCTION IMPLEMENTATIONS ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

	// draw the AND gate
	function draw() {
		// add each component to the group
		group.add(gateShape);	// the custom gate shape
		group.add(plugin1);		// ... the first plugin
		group.add(plugin2);		// ... the second plugin
		group.add(plugout);		// ... the plugout
		group.add(transFg);		// and finally the transparent foreground
		mainLayer.add(group);	// add the group to the main layer
		stage.draw();					// call draw on the stage to redraw its components
	}
	
	// accessor for the gate type
	function getType() { return "and"; }
	
	function getID() { return ID; }
	
	// accessor for the gate function (returns "gate" for OR, AND, and NOT; returns "connection" for CONNECTOR)
	function getFunc() { return "gate"; }
	
	// accessor for the gate name
	function getName() { return name; }
	
	// accessor for the group (used in controller for setting events on this object)
	function getGroup() { return group; }
	
	// returns the line for a plugin in GLOBAL coordinates; used in the controller for drawing wires (the controller functions in global coordinates; which makes sense)
	function getPlugin(num) {	// num is the plugin number to return
		var line;
		
		if (num == 1) {
			line = new Kinetic.Line({
				// make a new line and transform the line's coordinates to global coordinates; we do this by adding the group's coordinates to the line's coordinates
				points: [group.getX() + plugin1.getPoints()[0].x, group.getY() + plugin1.getPoints()[0].y, group.getX() + plugin1.getPoints()[1].x, group.getY() + plugin1.getPoints()[1].y]
			});
		}
		else {
			line = new Kinetic.Line({
				// same concept as above; must transform coordinates to global coordinates
				points: [group.getX() + plugin2.getPoints()[0].x, group.getY() + plugin2.getPoints()[0].y, group.getX() + plugin2.getPoints()[1].x, group.getY() + plugin2.getPoints()[1].y]
			});
		}
		
		return line;
	}
	
	// accessor for a connector plugin number (recall that connectorPlugin# is for when a plugin is connected to a connector)
	function getConnectorPlugin(num) {
		if (num == 1) return connectorPlugin1;
		else if (num == 2) return connectorPlugin2;
	}
	
	// mutator for a connector plugin (this is called when the AND gate's input is connected to a connector)
	function setConnectorPlugin(pluginNum, plugoutNum) {
		if (pluginNum == 1) connectorPlugin1 = plugoutNum;
		else if (pluginNum == 2) connectorPlugin2 = plugoutNum;
	}
	
	// accessor for the component connected to the AND gate's input (the component before the AND gate)
	function getPluginComp(num) {
		if (num == 1) return plugin1Comp;
		else if (num == 2) return plugin2Comp;
	}
	
	// return the line for the plugout in GLOBAL coordinates; same concept as plugin lines
	function getPlugout() {
		var line = new Kinetic.Line({
			points: [group.getX() + plugout.getPoints()[0].x, group.getY() + plugout.getPoints()[0].x, group.getX() + plugout.getPoints()[1].x, group.getY() + plugout.getPoints()[1].y]
		});
				
		return line;
	}
	
	// accessor for the wire (line) that connects the plugout to a component for output
	function getPlugoutWire() { return plugoutWire;	}
	
	// mutator for the wire (line) that connects the plugout to a component for output
	function setPlugoutWire(line) { plugoutWire = line;	}
	
	// accessor for the component connected to the AND gate's output
	function getPlugoutComp() { return plugoutComp; }
	
	// sets the component that the AND gate is connected to
	function setPlugoutComp(comp) { plugoutComp = comp; evaluate();	}
	
	// set a plugin to NULL that equals the given component passed as parameter (used in disconnection)
	function setPluginCompNull(comp)
	{
		if (plugin1Comp == comp) {
			plugin1Comp = null;
			plugin1Val = -1;
		}
		
		if (plugin2Comp == comp) {
			plugin2Comp = null;
			plugin2Val = -1;
		}
		
		evaluate();
	}
	
	// set the component that the AND gate's input is connected to
	function setPluginComp(num, comp) {
		if (num == 1) plugin1Comp = comp;
		else if (num == 2) plugin2Comp = comp;
		
		comp.evaluate();
	}
	
	// add a value to this AND gate's input values (used in computing the output of the circuit); these two values will be OR'ed together
	
	// add a value to this AND gate's input values (used in computing the output of the circuit); these two values will be OR'ed together
	function setPluginVal(comp, val) {
		if (comp == plugin1Comp && comp == plugin2Comp) { 
			plugin1Val = val; plugin2Val = val;
			if (val == -1 || val == 0) { plugin1.setStroke("blue"); plugin2.setStroke("blue"); }
			else { plugin1.setStroke("red"); plugin1.setStroke("red"); }
			
		}
		else if (comp == plugin1Comp) {
			plugin1Val = val;
			if (val == -1 || val == 0) plugin1.setStroke("blue");
			else plugin1.setStroke("red");
		}
		else if (comp == plugin2Comp) {
			plugin2Val = val;
			if (val == -1 || val == 0) plugin2.setStroke("blue");
			else plugin2.setStroke("red");
		}
		
		evaluate();
	}
	
	// evaluate this gate; AND the two values in pluginVals, and send the output to the next component
	function evaluate() {
		if (plugin1Val != -1 && plugin2Val != -1) {
			var res = 0;
			if (plugin1Val == 1 && plugin2Val == 1) res = 1;
			
			if (plugoutComp !== null) {
				plugoutComp.setPluginVal(thisObj, res);
				setPlugoutWireColor();
			}
		}
		else {
			if (plugoutComp !== null) plugoutComp.setPluginVal(thisObj, -1);
		}
	}
	
	function probe() {
		var str = "(";
		if (plugin1Comp !== null && plugin2Comp !== null) {
			str += plugin1Comp.probe();
			str += " * ";
			str += plugin2Comp.probe();
			str += ")";
			return str;
		}
		else return null;
	}
	
	function setPlugoutWireColor() {
		if (plugin1Val == 1 && plugin2Val == 1) { plugout.setStroke("red"); plugoutWire.setStroke("red"); gateShape.setFill("red"); }
		else { plugout.setStroke("blue"); plugoutWire.setStroke("blue"); gateShape.setFill("blue"); }
	}
}
