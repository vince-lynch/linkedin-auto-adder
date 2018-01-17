//https://www.linkedin.com/search/results/people/?facetGeoRegion=%5B%22gb%3A4573%22%5D&facetNetwork=%5B%22S%22%5D&keywords=contract%20javascript%20recruitment&origin=GLOBAL_SEARCH_HEADER&page=8

function initApp() {
	console.log('background.js init app called')
	
	// MESSAGING //
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
		console.log("frontend is sending a message");
	})

}



window.onload = function() {
  initApp();
};
