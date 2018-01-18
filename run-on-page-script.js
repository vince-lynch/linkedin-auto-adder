$(document).ready(function () {
	console.log('EXTENSION running on page')
	
	if (window.location.href.indexOf('search') > -1) {
		console.log('on linkedin - stimulating click');
		
		var addFirstConnection = function(){
			setTimeout(function () {
				var nextConnectBtn = $(".search-result__actions--primary:enabled:contains(Connect)").eq(0);
				// disable so we cant click on this user again
				// click on this user;
				nextConnectBtn.trigger("click");
				nextConnectBtn.html('Sent invite');
				nextConnectBtn.prop("disabled", true);
				setTimeout(function () {
					$(".button-primary-large.ml1").eq(0).trigger("click");
					
					anyMoreConnections()
					
				}, 2000)
			}, 2000)
		}
		
		var anyMoreConnections = function(){
			// wait until modal disappears
			setTimeout(function () {
				// if anymore connection opportunities on page then repeat
				if($(".search-result__actions--primary:enabled:contains(Connect)").length > 0){
					// add the next connection
					addFirstConnection();
				} else {
					console.log('no more connection-opportunities on this page')
					goToNextPage()
				}
			},2000)
		}
		
		var goToNextPage = function(){
			var searchString = window.location.search.split('&page=');
			var pageNum = parseInt(searchString[1]);
			window.location.search =  searchString[0] + '&page=' + (pageNum + 1);
		}
		
		
		// first time
		addFirstConnection();
		
	}
	
	var scrollDownLots = function(){
		var $target = $('html,body');
		$target.animate({scrollTop: $target.height()}, 1000);
	}
	
	var findWordRecruitAndAdd = function(keyword){
		var elements = $('.mn-person-info__occupation:contains('+ keyword + ')')
		elements.each(function( index ) {
			 var parent = $( this ).parents('.mn-person-info');
			 var connectBtn =  parent.find('.button-secondary-small');
			 connectBtn.trigger('click');
			 connectBtn.html('Sent invite');
			 //connectBtn.prop("disabled", true);
		});
		//var element = elements.eq(0).parents('.mn-person-info')
		//element.find('.button-secondary-small').trigger('click')
	}
	
	var scrollDownTimes = function(times){
		var i = 0;
		setInterval(function(){
			if(i < times){
				scrollDownLots();
				i++;
			} else {
				findWordRecruitAndAdd('Recruit');
				findWordRecruitAndAdd('Recruitment');
				findWordRecruitAndAdd('Recruiter');
				findWordRecruitAndAdd('Talent');
			}
		}, 1000)
	}
	
	if (window.location.href.indexOf('mynetwork') > -1) {
		console.log('on mynetwork page - scrolling and looking for boxes with "recruit" in them');
		
		scrollDownTimes(10);
		
		// repeat every 45 seconds
		setInterval(function(){
			scrollDownTimes(10);
		}, (45 * 1000))
		
	}
	
	
});

