import { initBytePlanetPage } from './assets/js/main';

initBytePlanetPage();

var tableBodyEl = document.getElementById("diariesTableBody");

var requestStories = new Request('assets/data/diaries.json'),
	storiesEl = [];

fetch(requestStories).then((response) => {
	response.json().then(function (stories) {
		console.log(stories);
		for (var story of stories.en) {
			storiesEl.push(`<tr url="diary/${story.url}.html" >
                                <td>${ story.title}</td>
                                <td>${ story.date}</td>
                            </tr>`);
		}

		tableBodyEl.innerHTML = storiesEl.join('');

		Array.prototype.slice.call(tableBodyEl.getElementsByTagName('tr')).forEach(function (element) {
			console.log(element)
			document.addEventListener('onclick', () => {
				location.href = this.getAttribute('url');
			}, false)
		}, this);

	})
});


