  var
  	newData = [],
  	lastDate = ['0', '2', '1987'],
  	firstDate;

  function getDay(date, pos) {
  	// console.log(date);
  	var xhr = new XMLHttpRequest();
  	xhr.open('GET', 'data/calendar/' + date + '.json');
  	xhr.onload = function() {
  		if (pos == 'append') {
  			newData.push(JSON.parse(xhr.responseText));
  		} else if (pos == 'prepend') {
  			newData.unshift(JSON.parse(xhr.responseText));
  		}
  		// console.log(JSON.parse(xhr.responseText).date);
  		if (newData.length == 3) {
  			init(newData);
  			firstDate = ['2', '2', '1987'];
  		}
  	};
  	xhr.send();
  }

  function appendDay(argument) {
  	lastDate[0] = +lastDate[0] + 1 + '';
  	getDay(lastDate.join('.'), 'append');
  }

  function prependDay(argument) {
  	firstDate[0] = +firstDate[0] - 1 + '';
  	getDay(firstDate.join('.'), 'prepend');
  }

  for (var i = 0; i < 3; i++) {
  	appendDay();
  }


  function init(newData) {
  	// console.log(newData);
  	calendar = new Vue({
  		el: "#days",
  		data: {
  			content: newData
  		},
  		created: function() {
  			this.fetchData()
  		},
  		computed: {
  			// brands: function() {
  			// 	return
  			// }
  		},
  		methods: {
  			hourClick: function(e, index) {
  				// console.log(e, index);
  			},
  			fetchData: function() {
  				// console.log('fetch');
  			}
  		},
  		components: {
  			'hour': {
  				props: ['hour'],
  				template: '<div>{{hour.time}} - {{hour.html}} <slot>xx</slot></div>'
  			}
  		}
  	})
  }


  var scrollTopFun = function() {
  	return window.pageYOffset;
  }



  // Vue.component('hour', {
  //   props: ['hour'],
  //   template: '<div>{{hour.time}} - {{hour.html}}</div>'
  // })



  window.onscroll = function() {
  	var
  		scrollTop = window.pageYOffset,
  		windowHeight = window.innerHeight,
		allCalendarDiv = document.getElementById("days"),
 		positionInfo = allCalendarDiv.getBoundingClientRect(),
  		allCalendarheight = positionInfo.height;


  	// console.log(positionInfo);
  	// console.log(windowHeight - scrollTop, windowHeight, allCalendarheight, allCalendarheight - windowHeight);

  	if (-positionInfo.top + 300 > positionInfo.height - windowHeight) {
  		appendDay();
  	}

  	
  }


