
$(document).ready(function(){
	loadPoints();	
});

function loadPoints() {		

	setTimeout(function(){
		if ($(".TagPageHeader-tagName").length == 0) {			
			console.log("It's not filter by sprint...")	;
			return;
		}
		 		
	    console.log('YMESE Extension loaded!!');
	    
		// hide all tasks
		let $rows = $(".TaskGroup .dropTargetRow");
		console.log('No of tasks: ', $rows.length);
		// $(".TaskGroup .dropTargetRow").hide();

		let map = {};

		for (var i = 0; i < $rows.length; i++) {
			let $row = $rows[i];
			let $divAvatar = $($row).find(".DomainUserAvatar.TaskRow-assignee.is-alwaysVisible div");
			let key = "";
			if ($($divAvatar).text().trim() == "") { // has avatar
				let style = $($divAvatar).attr('style');
				if (!style) { // has no assignee yet
					continue;
				}

				key = style.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
			} else {
				key = $($divAvatar).text();
			}

			// find points
			let points = 0;
			let $tags = $($row).find(".ItemRowTwoColumnStructure-right div.Pill--clickable");			
			for (var j = 0; j < $tags.length; j++) {
				let $tag = $tags[j];
				let text = $($tag).text();
				if (text.indexOf("pts") == -1) {
					continue;					
				}

				let pointStr = text.replace("pts", "").trim();
				if (Number(pointStr)) {
					points = Number(pointStr);
					break;
				} else if (pointStr == "1/2") {
					points = 0.5;
					break;
				}
			}			

			if (!map[key]) {
				map[key] = 0;
			} 

			map[key] += points;			
		}

		let html = '';
		for (var key in map) {
			if (key.startsWith("http")) {
				html += `<div style="padding-right: 20px; display: table"><div class="Assignee DomainUserAvatar TaskRow-assignee is-alwaysVisible"><div class="Avatar Avatar--small Avatar--color1 DomainUserAvatar-avatar" style="background-image: url('${key}');color: blue;font-size: 20px;"></div></div> <span style='display: table-cell; vertical-align: middle; padding-left: 5px;'>${map[key]} pts</span> </div>`;
			} else {
				html += `<div style="padding-right: 20px; display: table"><div class="Assignee DomainUserAvatar TaskRow-assignee is-alwaysVisible"><div class="Avatar Avatar--small Avatar--color4 DomainUserAvatar-avatar">${key}</div></div> <span style='display: table-cell; vertical-align: middle; padding-left: 5px;'>${map[key]} pts</span></div>`;
			}			
		}

		// prepend user with points in header right page
		$(".PageToolbarStructure-rightChildren").prepend(html);		
	}, 1000);	
}