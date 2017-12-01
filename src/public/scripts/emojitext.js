var linecount = 0;
var discord = false;

function generateText() {
	
	linecount = 0;
	discord = false;
	
	var outline = $('#outline').val();
	var fill = $('#fill').val();
	var columns = $('#columns').val();
	var input = $('#text').val().toUpperCase();
	var border = $('#border').val();
	//alert(outline + fill + columns + input);
	
	discord = ($('#discord').is(":checked"));
	
	var outputarea = $('#output');
	
	var output = "";
	
	var columna = [];
	var columnb = [];
	
	/*for (var i = 65; i <= 90; i++) {
		var letter = String.fromCharCode(i);
		
		//output += getCharacter(letter) + "\n\n";
	}*/
	
	if ((input.length % 2) !== 0) {
		input += " ";
	}
	
	var inputarray = input.split('');
	
	for (var i = 0; i < inputarray.length; i++) {
		if (i % 2 === 0) {
			columna.push(getCharacter(inputarray[i]));
		} else {
			columnb.push(getCharacter(inputarray[i]));
		}
	}
	
	var awidth = 0;
	var bwidth = 0;
	
	for (var a = 0; a < columna.length; a++) {
		var aletter = columna[a];
		
		var alwidth = (aletter.length - 4) / 5;
		
		if (awidth < alwidth) {
			awidth = alwidth;
		}
	}
	
	for (var b = 0; b < columnb.length; b++) {
		var bletter = columnb[b];
		
		var blwidth = (bletter.length -4) / 5;
		
		if (bwidth < blwidth) {
			bwidth = blwidth;
		}
	}
	
	outline = outline.replace(/O/g, '');
	outline = outline.replace(/X/g, '');
	
	fill = fill.replace(/O/g, '');
	fill = fill.replace(/X/g, '');
	
    var borderwidth = 1;
	
	var height = columna.length;
	var totalwidth = (borderwidth * 2) + 3 + awidth + bwidth;
	
	output += borderlines(totalwidth, borderwidth, border);
	
	var fillwidth = totalwidth - (borderwidth * 2);
	
	output += fillLine(totalwidth, borderwidth, fillwidth, border, outline);
	
	for (var li = 0; li < columna.length; li++) {
		
		var lettera = columna[li];
		var letterb = columnb[li];
		
		var letterasplit = lettera.split("\n");
		var letterbsplit = letterb.split("\n");
		
		for (var letterline = 0; letterline < letterasplit.length; letterline++) {
			
			for (var lb1 = 0; lb1 < borderwidth; lb1++) {
				output += border;
			}
			
			var aline = letterasplit[letterline];
			var bline = letterbsplit[letterline];
			
			output += outline;
			
			output += aline;
			
			for (var letterapad = aline.length; letterapad < awidth; letterapad++) {
				output += outline;
			}
			
			output += outline;
			
			output += letterbsplit[letterline];
			
			for (var letterbpad = bline.length; letterbpad < bwidth; letterbpad++) {
				output += outline;
			}
			
			output += outline;
			
			for (var rb1 = 0; rb1 < borderwidth; rb1++) {
				output += border;
			}
			
			output += addLine();
		}
		
		output += fillLine(totalwidth, borderwidth, fillwidth, border, outline);
	}
	
	output += borderlines(totalwidth, borderwidth, border);
	
	output = output.replace(/O/g, outline);
	output = output.replace(/X/g, fill);
	
	outputarea.val(output);
	
}

function addLine() {
	
	var output = "";
	
	output += "\n";
	linecount++;
	
	if (discord && linecount > 0 && (linecount % 15) === 0) {
		output += "\n";
	}
	
	return output;
}

function borderlines(totalwidth, borderwidth, border) {
	
	var output = "";
	
	for (var height = 0; height < borderwidth; height++) {
		for (var width = 0; width < totalwidth; width++) {
			output += border;
		}
		
		output += addLine();
	}
	
	return output;
}

function fillLine(totalwidth, borderwidth, fillwidth, border, outline) {
	
	var output = "";
	
	for (var fillline = 0; fillline < totalwidth; fillline++) {
		
		if (fillline < borderwidth) {
			output += border;
		} else if(fillline < borderwidth + fillwidth) {
			output += outline;
		} else if(fillline < totalwidth) {
			output += border;
		}
	}
	
	output += addLine();
	
	return output;
}

function getCharacter(char) {

	if (char === "A") {
		return "OXXO\nXOOX\nXXXX\nXOOX\nXOOX";
	}
	
	if (char === "B") {
		return "XXO\nXOX\nXXO\nXOX\nXXO";
	}
	
	if (char === "C") {
		return "OXX\nXOO\nXOO\nXOO\nOXX";
	}
	
	if (char === "D") {
		return "XXXO\nXOOX\nXOOX\nXOOX\nXXXO";
	}
	
	if (char === "E") {
		return "XXX\nXOO\nXXO\nXOO\nXXX";
	}
	
	if (char === "F") {
		return "XXX\nXOO\nXXO\nXOO\nXOO";
	}
	
	if (char === "G") {
		return "OXXO\nXOOO\nXOXX\nXOXO\nOXXO";
	}
	
	if (char === "H") {
		return "XOOX\nXOOX\nXXXX\nXOOX\nXOOX";
	}
	
	if (char === "I") {
		return "XXX\nOXO\nOXO\nOXO\nXXX";
	}
	
	if (char === "J") {
		return "XXXX\nOOXO\nOOXO\nXOXO\nOXXO";
	}
	
	if (char === "K") {
		//unfinished
		return "XOX\nXOX\nXXO\nXOX\nXOX";
	}
	
	if (char === "L") {
		return "XOO\nXOO\nXOO\nXOO\nXXX";
	}
	
	if (char === "M") {
		//unfinished
		return "XOOX\nXXXX\nXOOX\nXOOX\nXOOX";
	}
	
	if (char === "N") {
		return "XOOX\nXXOX\nXOXX\nXOOX\nXOOX";
	}
	
	if (char === "O") {
		return "OXXO\nXOOX\nXOOX\nXOOX\nOXXO";
	}
	
	if (char === "P") {
		return "XXXO\nXOOX\nXXXO\nXOOO\nXOOO";
	}
	
	if (char === "Q") {
		return "OXXO\nXOOX\nXOOX\nXOXO\nOXOX";
	}
	
	if (char === "R") {
		return "XXO\nXOX\nXXO\nXOX\nXOX";
	}
	
	if (char === "S") {
		//unfinished
		return "OXXX\nXOOO\nOXXO\nOOOX\nXXXO";
	}
	
	if (char === "T") {
		return "XXX\nOXO\nOXO\nOXO\nOXO";
	}
	
	if (char === "U") {
		return "XOOX\nXOOX\nXOOX\nXOOX\nOXXO";
	}
	
	if (char === "V") {
		return "XOOX\nXOOX\nXOOX\nOXXO\nOXXO";
	}
	
	if (char === "W") {
		//unfinished
		return "XOOX\nXOOX\nXOOX\nXXXX\nOXXO";
	}
	
	if (char === "X") {
		return "XOOX\nOXXO\nOXXO\nXOOX\nXOOX";
	}
	
	if (char === "Y") {
		//unfinished
		return "XOX\nXOX\nOXO\nOXO\nOXO";
	} 
	
	if (char === "Z") {
		return "XXXX\nOOOX\nOOXO\nOXOO\nXXXX";
	}
	
	if (char === " ") {
		return "OOOO\nOOOO\nOOOO\nOOOO\nOOOO";
	}
	
}