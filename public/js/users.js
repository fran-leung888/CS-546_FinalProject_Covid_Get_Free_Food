(function($) {
	// Let's start writing AJAX calls!
	var myNewTaskForm = $('#searchForm');
	var newContent = $('#showList');
	var form = $('#reservation')
	var input = $('#search_term')


	// var requestConfig = {
	// 	method: 'GET',
	// 	url: 'http://api.tvmaze.com/shows'
	// };

	// $.ajax(requestConfig).then(function(responseMessage) {
	// 	var element = responseMessage;
	// 	var newId;
	// 	var newName;
	// 	var newLink;
	
	
	// 	for(let x of element){
	// 		newId = x.id;
	// 		newName = x.name;
	// 		newLink = x._links.self.href;

	// 		let a = $(`<a class='clickLink' id="${newId}" href="${newLink}"> ${newName} </a><br>`);
	// 		newContent.append(a);

	// 		a.on('click', function(event){
	// 			event.preventDefault();
	// 			let id = $(this).attr('id');
				
	// 			var requestConfig = {
	// 				method: 'GET',
	// 				url: `http://api.tvmaze.com/shows/${id}`
	// 			};
	
	// 			$.ajax(requestConfig).then(function(responseMessage) {
	// 				console.log(responseMessage);

	// 				newContent.hide();
	// 				$('#show').empty();
	// 				$('#show').show();
	// 				$('#homeLink').show();
	
	// 				let genres = responseMessage.genres;

	// 				if(responseMessage.name == null){ 
	// 					showName = "N/A"
	// 				}else{
	// 					showName = responseMessage.name;
	// 				}

	// 				if(responseMessage.image.medium == null){ 
	// 					image = "../public/no_image.jpeg"
	// 				}else{
	// 					image = responseMessage.image.medium;
	// 				}

	// 				if(responseMessage.language == null){ 
	// 					language = "N/A"
	// 				}else{
	// 					language = responseMessage.language;
	// 				}
					
	// 				if(responseMessage.rating.average == null){ 
	// 					rating = "N/A"
	// 				}else{
	// 					rating = responseMessage.rating.average;
	// 				}

	// 				if(responseMessage.network == null || responseMessage.network.name == null){ 
	// 					network = "N/A"
	// 				}else{
	// 					network = responseMessage.network.name;
	// 				}

	// 				if(responseMessage.summary == null){ 
	// 					summary = "N/A"
	// 				}else{
	// 					summary = responseMessage.summary;
	// 				}


	// 				let h1 = $(`<h1> ${showName} </h1>`);
	// 				let img = $(`<img src="${image}" ></img>`);
	// 				let dl = $(`<dl> <dd>Language: <br>${language}</dd><br>
	// 							<dd id="genres">Genres: </dd><br>
	// 							<dd>Average Rating: <br>${rating}</dd><br>
	// 							<dd>Network: <br>${network}</dd><br>
	// 							<dd>Summary: ${summary}</dd></dl>`);
	// 				$('#show').append(h1);
	// 				$('#show').append(img);
	// 				$('#show').append(dl);

	// 				if(genres.length == 0){
	// 					$('#genres').append('N/A');
	// 				}else{
	// 					for(let x of genres){
	// 						let ul = $(`<ul>${x}</ul>`);
	// 						$('#genres').append(ul);
	// 					}

	// 				}
	
	// 			});


	// 		});

	// 	}

		
	// });


	form.submit(function(event) {
		event.preventDefault();

		// var newInput = input.val();

		// if(newInput.trim() == ''){
			$('#error').show();
            console.log("aa");
		// }else{
		// 	$('#error').hide();
		// 	$('#homeLink').show();
		// } 
		
		// newContent.empty();
		
		
		

		// var requestConfig = {
		// 	method: 'GET',
		// 	url: `http://api.tvmaze.com/search/shows?q=${newInput}`,
		// };

		// $.ajax(requestConfig).then(function(responseMessage) {
		// 	for(let x of responseMessage){
		// 		var newId = x.show.id;
		// 		var newName = x.show.name;
		// 		var newLink = x.show._links.self.href;
	
		// 		const b = $(`<a class='clickLink' id="${newId}" href="${newLink}"> ${newName} </a><br>`);
		// 		newContent.append(b);

		// 		b.on('click', function(event){
		// 			event.preventDefault();
		// 			newContent.hide();
		// 			$('#show').empty();
		// 			$('#show').show();

		// 			let id = $(this).attr('id');

		// 			var requestConfig = {
		// 				method: 'GET',
		// 				url: `http://api.tvmaze.com/shows/${id}`
		// 			};
		
		// 			$.ajax(requestConfig).then(function(responseMessage) {
		// 				console.log(responseMessage);

		// 				let genres = responseMessage.genres;

		// 				if(responseMessage.name == null){ 
		// 					showName = "N/A"
		// 				}else{
		// 					showName = responseMessage.name;
		// 				}

		// 				if(responseMessage.image.medium == null){ 
		// 					image = "../public/no_image.jpeg"
		// 				}else{
		// 					image = responseMessage.image.medium;
		// 				}

		// 				if(responseMessage.language == null){ 
		// 					language = "N/A"
		// 				}else{
		// 					language = responseMessage.language;
		// 				}
						
		// 				if(responseMessage.rating.average == null){ 
		// 					rating = "N/A"
		// 				}else{
		// 					rating = responseMessage.rating.average;
		// 				}

		// 				if(responseMessage.network == null || responseMessage.network.name == null){ 
		// 					network = "N/A"
		// 				}else{
		// 					network = responseMessage.network.name;
		// 				}

		// 				if(responseMessage.summary == null){ 
		// 					summary = "N/A"
		// 				}else{
		// 					summary = responseMessage.summary;
		// 				}


		// 				let h1 = $(`<h1> ${showName} </h1>`);
		// 				let img = $(`<img src="${image}" ></img>`);
		// 				let dl = $(`<dl> <dd>Language: <br>${language}</dd><br>
		// 							<dd id="genres">Genres: </dd><br>
		// 							<dd>Average Rating: <br>${rating}</dd><br>
		// 							<dd>Network: <br>${network}</dd><br>
		// 							<dd>Summary: ${summary}</dd></dl>`);
		// 				$('#show').append(h1);
		// 				$('#show').append(img);
		// 				$('#show').append(dl);

		// 				if(genres.length == 0){
		// 					$('#genres').append('N/A');
		// 				}else{
		// 					for(let x of genres){
		// 						let ul = $(`<ul>${x}</ul>`);
		// 						$('#genres').append(ul);
		// 					}

		// 				}

		// 			});
	
	
	
		// 		});
	
				
		// 	}
			
		// });
		
		
	});

})(window.jQuery);
