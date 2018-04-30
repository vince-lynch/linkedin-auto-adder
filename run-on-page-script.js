console.log('outside of document.ready');

$(document).ready(function () {
	console.log('EXTENSION running on page');
	var onProfilePage = false;


    // Recruiter Search page // Add people to project
	if(window.location.href.indexOf('/recruiter/smartsearch') > -1){
		$('input[data-tracking-control-name="selectAllBtn"]').click();
		$('button#project-bulk-action').trigger('click');
	}


	
	
	if(window.location.href.indexOf('/in/') > -1){

		console.log('window is on profile page of someone who is not a connection');
		
		setTimeout(function(){
			$('button.pv-s-profile-actions__overflow-toggle.pv-top-card-section__inline-overflow-button.button-secondary-large-muted.mh1').click();
			console.log('ran this line of code');
			setTimeout(function(){
				$('button.pv-s-profile-actions.pv-s-profile-actions--connect.pv-s-profile-actions').click();
				setTimeout(function(){
					$('button:contains(Send now)').eq(0).click();
					setTimeout(function(){
						window.close();
					}, 2000)
				}, 1000)
			}, 1000)
		}, 2000)
	}
	
	// after invite is sent close the window.
	if(window.location.href.indexOf('invite-sent') > -1){
		console.log('should close window as invite has been sent')
		window.close();
	}
	
	
	if (window.location.href.indexOf('search') > -1) {
		console.log('on linkedin - stimulating click');
		
		var addFirstConnection = function(){
			setTimeout(function () {
				var inMailBtn = $("button:contains(Connect)").eq(0);
				if($("button:contains(Connect)").length == 0){
					inMailBtn = $("button:contains(InMail)").eq(0);
				}
				
				inMailBtn.html('Sent invite');
				inMailBtn.prop("disabled", true);
				var parentDiv = $(inMailBtn).parents('.search-result__wrapper');
				var profileLink = $(parentDiv).find('a[data-control-name="search_srp_result"]').attr('href');
				console.log('found profileLink', profileLink);
				if(profileLink){
					window.open('https://' +window.location.host + profileLink);
				}
				
				
				
				// disable so we cant click on this user again
				// click on this user;
				//nextConnectBtn.trigger("click");
				//nextConnectBtn.html('Sent invite');
				//nextConnectBtn.prop("disabled", true);
				setTimeout(function () {
					//$(".button-primary-large.ml1").eq(0).trigger("click");
					
					anyMoreConnections()
					
				}, 2000)
			}, 2000)
		}
		
		var anyMoreConnections = function(){
			// wait until modal disappears
			setTimeout(function () {
				// if anymore connection opportunities on page then repeat
				if($("button:contains(InMail)").length > 0 || $("button:contains(Connect)").length > 0){
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
		var elements = $('.pymk-card__occupation--card-layout:contains('+ keyword + ')');
		var numberOfSent = 0;

		$(elements).each(function(index){
		   var connectBtn = $(this).parents('li').find('span:contains(Connect)');

		   if(connectBtn.length > 0){
		   	numberOfSent += 1;
		   	connectBtn.html('sent invite');
		    connectBtn.parents('button').trigger('click');
		   }
		})
		if(numberOfSent > 0){
			console.log('sent invites to ', numberOfSent, ' ', keyword, ' professionals');
		}
		
		
	}
	
	var scrollDownTimes = function(times){
		var i = 0;
		var scrollDownInt = setInterval(function(){
			if(i < times){
				scrollDownLots();
				i++;
			} else {
				var jobTitleList = ['Radiographer',
								    'Speech Therapist',
								    'Dietician',
								    'Physiotherapist',
								    'Speech and Language',
								    'Radio',
								    'RADIO',
								    'radio',
								    'speech',
								    'Speech',
								    'diet',
								    'Diet',
								    'Imagining',
								    'Image',
								    'sono',
								    'Sono',
								    'image',
								    'Physio',
								    'Occupational',
								    'midwife',
								    'Midwife',
								    'mid-wife',
								    'Mid-wife',
								    'Diagnostic',
								    'diagnostic',
								    'Music',
								    'Drama',
								    'practitioner',
								    'Practitioner',
								    'Operating',
								    'Theatre',
								    'theatre',
								    'operating',
								    'Ortho',
								    'ortho',
								    'para',
								    'Paramedic',
								    'Pod',
								    'Prosthetist',
								    'prosthetist',
								    'Prosthe',
								    'prosthe',
								    'anesthetist',
								    'Anesthetist',
								    'Maternity', 
								    'Donor', 
								    'Dietetic', 
								    'Dental', 
								    'Creative', 
								    'Cardio', 
								    'Phlebo', 
								    'Optometr', 
								    'Nutrition', 
								    'Newborn',
								    'care',
								    'Care',
								    'Dosimet',
								    'dosimet'
								    ]

				for(let i = 0; i<jobTitleList.length - 1; i++){
					findWordRecruitAndAdd(jobTitleList[i]);
				}
			    var $target = $('html,body');
				$("html, body").animate({
					scrollTop: 20
				}, 1000);   

				clearInterval(scrollDownInt);
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
	
	if(window.location.href.indexOf('search/results/people') > -1){
		console.log('you are on the search results page');
	}
	
	
});

