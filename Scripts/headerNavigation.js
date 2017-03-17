var prevItem = null;
var nextItem = null;
var currItem = null;

$(document).ready(function () {	
	var currItemId = localStorage.getItem('currItemId');
	var found = false;
	for (var i = 0; i < tileDataJson.length; i++) {
		var obj = findPrevNextLink(tileDataJson[i].tabContent, currItemId, null, null);
		if (obj != null) {
			currItem = obj.currItem;
			prevItem = obj.prevItem;
			nextItem = obj.nextItem;
			found = true;
			break;
		}
	}

	if (!found) {
		console.log('not found');
	}
	
	if (prevItem == null) {
		$('#leftNavigation').hide();
	}
	else {
		$('#leftNavigation').show();
		$('#leftNavigation .leftText').html(prevItem.text);
	}
	if (nextItem == null) {
		$('#rightNavigation').hide();
	}
	else {
		$('#rightNavigation').show();
		$('#rightNavigation .rightText').html(nextItem.text);
	}


	$('#leftNavigation').click(function () {
		if (prevItem != null && prevItem.slideshow == true) {
			localStorage.setItem('currItemId', prevItem.id);
			window.location = 'slideshow.html';
		}
		else if (prevItem != null) {
			localStorage.setItem('currItemId', prevItem.id);
			window.location = prevItem.link;
		}
	});
	$('#rightNavigation').click(function () {
		if (nextItem != null && nextItem.slideshow == true) {
			localStorage.setItem('currItemId', nextItem.id);
			window.location = 'slideshow.html';
		}
		else if (nextItem != null) {
			localStorage.setItem('currItemId', nextItem.id);
			window.location = nextItem.link;
		}
	});
});

function findPrevNextLink(rootNodeItems, currItemId, parentItem) {
	var returnObj;
	for (var i = 0; i < rootNodeItems.length; i++) {
		var curr = rootNodeItems[i];

		if (curr.id == currItemId) {
			var nextItem = null;
			var prevItem = null;
			if (curr.items && curr.items.length > 0) {
				nextItem = curr.items[0];
			}
			else if (i < rootNodeItems.length - 1) {
				nextItem = rootNodeItems[i + 1];
			}
			if (i == 0) {
				prevItem = parentItem;
			}
			else {
				prevItem = rootNodeItems[i - 1];
			}
			returnObj = {
				nextItem: nextItem,
				prevItem: prevItem,
				currItem: curr
			}
			break;
		}
		else {
			if (curr.items && curr.items.length > 0) {
				var obj = findPrevNextLink(rootNodeItems[i].items, currItemId, rootNodeItems[i]);
				if (obj != null) {
					returnObj = obj;
					break;
				}
			}
		}
	}
	return returnObj;
}