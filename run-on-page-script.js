$(document).ready(function () {
	console.log('EXTENSION running on page')
	
	if (window.location.href.indexOf('linkedin') > -1) {
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
});

