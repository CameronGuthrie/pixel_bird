var taps = 0;
var score = 0;
var highscore = 0;
var bird = $("#gamebird");
var scrollground = $("#groundscroll");
var play = false;
var gameover = false;
var bird_top = 0;
var gametime = 1;
var r_bird_top = ($("#gamebird").offset().top - $("#game").offset().top - 52);
var bird_fall = 0;
var falltime = 0;
var ground = 165;
var flash = $("#flash");
var bar1 = 1e4;
var bar2 = 1e4;
var bar3 = 1e4;
var num = 0;

window.setInterval(animation, 16);

// TAP HANDLE SHIT <- FUCK WITH THIS //

$.event.special.tap = {
  setup: function() {
    var self = this,
      $self = $(self);

    // Bind touch start
    $self.on('touchstart', function(startEvent) {
      // Save the target element of the start event
      var target = startEvent.target;

      // When a touch starts, bind a touch end handler exactly once,
      $self.one('touchend', function(endEvent) {
        // When the touch end event fires, check if the target of the
        // touch end is the same as the target of the start, and if
        // so, fire a click.
        if (target == endEvent.target) {
          $.event.simulate('tap', self, endEvent);
        }
      });
    });
  }
};

// PLAY BUTTON ON TITLE SCREEN //

$("#titleplay").click(function(){

	var transition = $("#transition");
	play = false;
   	gameover = false;
   	bird_top = 0;
	gametime = 0;
	bar1= 1e4;
	bar2 = 1e4;
	bar3 = 1e4;

    $("#swish").get(0).currentTime = 0;
    $("#swish").get(0).volume = .7;
    $("#swish").get(0).play();

	transition.animate({"left" : "0px"}, 100, function() {
        $('#score2').hide(),
        $('#score3').hide(),
        $('#score4').hide(),
        $('#score1').css({"background-position": "-" + (328) + "px"}),
        
        $('#scored1').css({
            "background": "transparent url(images/smallnumbers-4x.gif)",
            "background-position": "24px"}),
        $('#scored1').show(),
        $('#scored2').hide(),
        $('#scored3').hide(),
        $('#scored4').hide(),

        $('#high1').css({
            "background": "transparent url(images/smallnumbers-4x.gif)",
            "background-position": "24px"}),
        $('#high1').show(),
        $('#high2').hide(),
        $('#high3').hide(),
        $('#high4').hide(),

		$("#gameoverscreen").css({"display" : "none"}),
		$("#titleplay").css({"display" : "none"}),
		$("#titlebob").css({"display" : "none"}),
		$("#titletitle").css({"display" : "none"}),

		$("#bar1").css({"left": bar1});
   	 	$("#bar2").css({"left": bar2});
    	$("#bar3").css({"left": bar3});

		bird.css({"display" : "block"}),
		bird.css({"margin-top" : bird_top}),
		bird.css({"-webkit-transform" : "rotate(" + (0) + "deg)"}),
		bird.css({"background" : "transparent url(images/bird-4x.gif)"}),
		bird.css({ "-webkit-animation" : "titlebird .25s steps(3, end) infinite" }),
		bird.css({ "-moz-animation" : "titlebird .25s steps(3, end) infinite" }),
		bird.css({ "animation" : "titlebird .25s steps(3, end) infinite" }),

		scrollground.css({ "-webkit-animation" : "gameground .5s steps(160, end) infinite" }),
		scrollground.css({ "-moz-animation" : "gameground .5s steps(160, end) infinite" }),
		scrollground.css({ "animation" : "gameground .5s steps(160, end) infinite" }),

		$("#taptoflap").css({"display" : "block"}),
		$("#currentscore").css({"display" : "block"}),
		$("#tapoverlay").css({"display" : "block"}),
		transition.animate({"left" : "-100%"}, 100, function() {
			transition.css({"left" : "100%"})
		})
	})
});


// IN GAME STUFF //

function stopAnimation(elem){
    elem.css("-webkit-animation", "pause");
   	elem.css("-moz-animation", "pause");
    elem.css("-ms-animation", "pause");
    elem.css("animation", "pause");
    if (elem = bird){
		elem.css({"background" : "transparent url(images/deadbird-4x.gif)"});
	};
};

function animation() {
	if (play) {
		bird_fall++;
        if (bird_top > ground) {
            game_over()
        } else if (bird_fall > 10) {
            deg = bird_fall / 0.8 - 40;
            if (deg < 0) {
                bird_top = bird_top + 7
            } else if (deg < 40) {
                bird_top = bird_top + 4;
                bird_fall = bird_fall + 8
            } else if (deg < 70) {
                bird_top = bird_top + 6;
                bird_fall = bird_fall + 10
            } else {
                bird_top = bird_top + 8;
                bird_fall = bird_fall + 12
            }
            if (deg > 90) deg = 90;
            bird.stop().css({
                "margin-top": bird_top,
                "-webkit-transform" : "rotate(" + deg + "deg)"
            }, 80)
        } 

		if (gametime == 80){
			bar1 = -300
		}
		if (gametime == 180){
			bar2 = -300
		}
		if (gametime == 280){
			bar3 = -300
		}

		gametime++;

		bar1 = (bar1 - 3);
		if (bar1 < - 300) {
			bar1 += 900;
			bar1p = Math.round(Math.random() * 150);
			$("#bar1top").css({"margin-top": bar1p - 512});
			$("#bar1bot").css({"margin-top": bar1p + 212});
		}
		bar2 = (bar2 - 3);
		if (bar2 < - 300){
			bar2 += 900;
			bar2p = Math.round(Math.random() * 150);
			$("#bar2top").css({"margin-top": bar2p - 512});
			$("#bar2bot").css({"margin-top": bar2p + 212});
		}
		bar3 = (bar3 - 3);
		if (bar3 < - 300){
			bar3 += 900;
			bar3p = Math.round(Math.random() * 150);
			$("#bar3top").css({"margin-top": bar3p - 512});
			$("#bar3bot").css({"margin-top": bar3p + 212});
		}

		$("#bar1").css({"left": bar1});
      	$("#bar2").css({"left": bar2});
        $("#bar3").css({"left": bar3});

        if (bar1 <= 70 && bar1 >= 68 || bar2 <= 70 && bar2 >= 68  || bar3 <= 70 && bar3 >= 68 ) {
            score++;
            update_score()
            $("#alert").get(0).currentTime = 0;
            $("#alert").get(0).volume = .3;
            $("#alert").get(0).play();
        }
	   
       // COLLISION (IT'S A LITTLE BROKEN RIGHT NOW) //

        p_bird_top = $("#gamebird").offset().top - $("#game").offset().top - 52;
        if (bar1 >= 64 && bar1 <= 158 && (p_bird_top < bar1p || p_bird_top > bar1p + 108)) {
            game_over()
        } else if (bar2 >= 64 && bar2 <= 158 && (p_bird_top < bar2p || p_bird_top > bar2p + 108)) {
            game_over()
        } else if (bar3 >= 64 && bar3 <= 158 && (p_bird_top < bar3p || p_bird_top > bar3p + 108)) {
            game_over()
        }

    }
};


function update_score(){
    if (score > 9999) return;
    if (score > highscore) {
    	highscore = score;
        $("#newhighscore").show();
    } else {
    	$("#newhighscore").hide();
    }
    // CALLING MEDALS FOR GAMEOVER SCREEN BASED ON SCORE
    if (score >= 30){
    	$("#medal").css({
            "background": "transparent url(images/gmedal-4x.gif)"
        });
    	$("#medal").show();
    } else if (score >= 20){
    	$("#medal").css({
            "background": "transparent url(images/smedal-4x.gif)"
        });
    	$("#medal").show();
    } else if (score >= 10){
    	$("#medal").css({
            "background": "transparent url(images/bmedal-4x.gif)"
        });
    	$("#medal").show();
    } else {
    	$("#medal").hide();
    }

    n = score;
    if (score >= 1e3){
    	num = Math.floor(n / 1000);
    	n = n - (num * 1e3);

    	$("#score4").css({
    		"background": "transparent url(images/bignumbers-4x.gif)", 
            "background-position": 36 + (num * 36) + "px"
        });
        $("#score4").show();

        $("#scored4").css({
        	"background": "transparent url(images/smallnumbers-4x.gif)", 
            "background-position": 24 + (24 * num) + "px"
        });
        $("#scored4").show();

        if (score == highscore) {
            $("#high4").css({
                "background": "transparent url(images/smallnumbers-4x.gif)", 
                "background-position": 24 + (24 * num) + "px"
            });
            $("#high4").show();
        }
    } else {
        $("#score4").hide();
        $("#scored4").hide();
    }

    if (score >= 100){
    	num = Math.floor(n / 100);
    	n = n - (num * 100);

    	$("#score3").css({
    		"background": "transparent url(images/bignumbers-4x.gif)", 
           	"background-position": 36 + (num * 36) + "px"
        });
        $("#score3").show();

        $("#scored3").css({
            "background": "transparent url(images/smallnumbers-4x.gif)", 
            "background-position": 24 + (24 * num) + "px"
        });
        $("#scored3").show();

        if (score == highscore) {
            $("#high3").css({
                "background": "transparent url(images/smallnumbers-4x.gif)", 
                "background-position": 24 + (24 * num) + "px"
            });
            $("#high3").show();
        }
    } else {
        $("#score3").hide();
        $("#scored3").hide();
    }

    if (score >= 10){
    	num = Math.floor(n / 10);
    	n = n - (num * 10);

    	$("#score2").css({
    		"background": "transparent url(images/bignumbers-4x.gif)", 
            "background-position": 36 + (num * 36) + "px"
        });
        $("#score2").show();

        $("#scored2").css({
            "background": "transparent url(images/smallnumbers-4x.gif)", 
            "background-position": 24 + (24 * num) + "px"
        });
        $("#scored2").show();

        if (score == highscore) {
            $("#high2").css({
                "background": "transparent url(images/smallnumbers-4x.gif)", 
                "background-position": 24 + (24 * num) + "px"
            });
            $("#high2").show();
        }
    } else {
        $("#score2").hide();
        $("#scored2").hide();
    }

    num = n;
	$("#score1").show();
	$("#score1").css({
    		"background": "transparent url(images/bignumbers-4x.gif)", 
            "background-position": 36 + (num * 36) + "px"
    });

    $("#scored1").css({
        "background": "transparent url(images/smallnumbers-4x.gif)", 
        "background-position": 24 + (24 * num) + "px"
    });
    $("#scored1").show();

    if (score == highscore) {
        $("#high1").css({
            "background": "transparent url(images/smallnumbers-4x.gif)", 
            "background-position": 24 + (24 * num) + "px"
        });
        $("#high1").show();
    }
}

//gameover function //

function game_over() {
    if (gameover) return;
    $("#crack").get(0).currentTime = 0;
    $("#crack").get(0).volume = .4;
    $("#crack").get(0).play();
   	gameover = true;
    setcookie("highscore", highscore, 30);
	flash.fadeIn(32, function(){	
		play = false;	
	    bird_top = ground,
		stopAnimation(bird),
		stopAnimation(scrollground),
		bird.stop().css({
		"-webkit-transform" : "rotate(" + (90) + "deg)"
		}, 200),
	    bird.stop().animate({
	        "margin-top": bird_top
	    }, 128),
	    $("#gameoverscreen").css({"display" : "block"}),
	    $("#currentscore").css({"display" : "none"}),
		$("#tapoverlay").css({"display" : "none"}),

	    flash.fadeOut(16, function(){	
	    	$("#titleplay").css({"top" : 800}),
	    	$("#titleplay").css({"display" : "block"}),
	    	$("#titleplay").animate({"top" : 480}, 100)
		})
	})
};

// tapping (works on click) //

$("#tapoverlay").mousedown(function(){ 
    if (!play) {
        play = true;
        $("#taptoflap").fadeOut(280, function(){});
        bird_top = 0;
        score = 0;
        highscore = Math.floor(getcookie("highscore"));
    }
    if (!gameover) {
        $("#punch").get(0).currentTime = 0;
        $("#punch").get(0).volume = .7;
        $("#punch").get(0).play();
        bird_top = bird_top - 80;
        bird_fall = 0;
        bird.stop().css({
        	"-webkit-transform" : "rotate(" + (-30) + "deg)"
		}, 200);
        bird.stop().animate({
        	"margin-top": bird_top
        }, 128);
    }
});

//cookie function//
// this is broken as hell, need to work out what's wrong with it //
function setcookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function getcookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}