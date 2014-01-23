//writes the html for the left arrow
var left_arrow = '<style>\
				div.floating-previous\
				{position:fixed;z-index:200;left:1px; right: auto; width:20px;top:45%;}\
				div.floating-previous a, div.floating-menu h3 {display:block;margin:0 0.5em;}\
			</style>\
			<div class="floating-previous">\
					<img id="larrow" style="border:0;" src="Images/left-arrow.png" alt="Previous page" width="40">\
			</div>'

$('#includedContent').append(left_arrow);




