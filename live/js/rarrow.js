//writes the html from the right arrow
var right_arrow = '<style>\
				div.floating-next\
				{position:fixed;z-index:200; left: auto; right:1px; top:45%;}\
				div.floating-next a, div.floating-menu h3 {display:block;margin:0 0.5em;}\
			</style>\
			<div class="floating-next">\
				<a href="ch02.html">\
					<img id="rarrow" style="border:0;" src="Images/right-arrow.png" alt="Next page" width="40">\
				</a>\
			</div>'

$('#includedContent').append(right_arrow);




