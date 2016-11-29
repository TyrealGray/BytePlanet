import { initBytePlanetPage } from './assets/js/main';

initBytePlanetPage();

var tableBodyEl = document.getElementById("diariesTableBody");

var requestStories = new Request('assets/data/diaries.json'),
	storiesEl = [];

fetch(requestStories).then((response) => {
	response.json().then(function (stories) {
		console.log(stories);
		for (var story of stories.en) {
			storiesEl.push(`<tr data-url="diary/${story.url}.html" >
                                <td>${ story.title}</td>
                                <td>${ story.date}</td>
                            </tr>`);
		}

		tableBodyEl.innerHTML = storiesEl.join('');

		// tableBodyEl.getElementsByTagNameNS('tr').map(function(e){
		// 	console.log()
		// })

		$(tableBodyEl).find('tr').each(function(){
			$(this).click(function(){
				location.href=$(this).data('url');
			})
		})
	})
});


