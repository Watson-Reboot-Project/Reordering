//writes the html from the navbar
var navbar_content = '<div="container"> <!--nav bar outer container -->\
			<img class="navbar-fixed-top" id="clickme" src="Images/max.png" > <!-- plus sign -->\
			<div class="navbar navbar-default navbar-fixed-top" id="navbar"> <!--navbar-static-top-->\
				<div class="navbar-inner">\
					<div class="container"> <!-- navbar container -->\
	\
						<a href = "index.html" class="navbar-brand"> <img src="Images/logo2.png"></a> <!--Logo in navbar -->\
	\
						<button class = "navbar-toggle" data-toggle = "collapse" data-target = ".navHeaderCollapse"> <!--Header button-->\
							<span class = "icon-bar"></span>\
							<span class = "icon-bar"></span>\
							<span class = "icon-bar"></span>\
						</button>\
	\
						<div class = "collapse navbar-collapse navHeaderCollapse"> <!-- collapse navbar -->\
							<ul class = "nav navbar-nav navbar-right">\
								<li class="dropdown"> <a href="#" class = "dropdown-toggle btn" data-toggle = "dropdown">Chapters<b class = "caret"></b></a>\
									<ul class="dropdown-menu">\
								  		<li> <a href="ch01.html">Chapter 1</a></li>\
								  		<li> <a href="ch02.html">Chapter 2</a></li>\
								  		<li> <a href="ch03.html">Chapter 3</a></li>\
								  		<li> <a href="ch04.html">Chapter 4</a></li>\
								  		<li> <a href="ch05.html">Chapter 5</a></li>\
								  		<li> <a href="ch06.html">Chapter 6</a></li>\
								  		<li> <a href="ch07.html">Chapter 7</a></li>\
								  		<li> <a href="ch08.html">Chapter 8</a></li>\
								  		<li> <a href="ch09.html">Chapter 9</a></li>\
								  		<li> <a href="ch10.html">Chapter 10</a></li>\
								  		<li> <a href="ch11.html">Chapter 11</a></li>\
								  		<li> <a href="ch12.html">Chapter 12</a></li>\
								  		<li> <a href="ch13.html">Chapter 13</a></li>\
								  		<li> <a href="ch14.html">Chapter 14</a></li>\
								  	</ul>\
								</li>\
								<li><a class="btn" href = "#d">Documentation</a></li>\
								<li><a class="btn" href = "#t">Tutorials</a></li>\
								<li><a class="btn" href = "#a">About</a></li>\
								<li><a href = "#p" id="min"><img src="Images/minus_bar.png"></a></li> <!-- Minus bar image -->\
							</ul>\
						</div> <!-- END collapse navbar -->\
					</div>  <!-- END navbar container -->\
				</div> <!-- END navbar-inner -->\
			</div> <!-- END navbar-static-top -->\
		</div> <!--END nav bar outer container -->'

$('#includedContent').append(navbar_content);
		var toggle = 0;
		  $('#min').click(
		  function() {
		  $('#navbar').slideUp('slow');
						toggle=1;
		  }
		  );
		  $('#clickme').click(
		  function() {
		  $('#navbar').slideDown('slow');
						toggle=0;
		  }
		  );
			var timer; /* disapearing navbar, disapearing plus sing, next and prev. arrows */
			$(document).mousemove(function() {
				if (timer) {
					clearTimeout(timer);
					timer = 0;
				}

				if (toggle==0) {$('#navbar').fadeIn(); $('#rarrow').fadeIn(); $('#larrow').fadeIn(); }
				else {$('#clickme').fadeIn(); $('#rarrow').fadeIn(); $('#larrow').fadeIn();}
				timer = setTimeout(function() {
					$('#navbar').fadeOut(); $('#clickme').fadeOut(); $('#rarrow').fadeOut(); $('#larrow').fadeOut();
				}, 3000)
			});



