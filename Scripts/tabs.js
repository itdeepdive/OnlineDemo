var scrollPosition = 0;
var scrollAnimationDuration = 800;

$(document).ready(function () {	
	setTabHeaders();	

	$('#rightArrow').click(function () {
		scrollRight();
	});
	$('#leftArrow').click(function () {
		scrollLeft();
	});
});


function setTabHeaders() {
	var tabList = $('#tabList');
	var tabContent = $('#tabContent');

	var selectedTabId = window.sessionStorage.getItem("selectedTabId");
	window.sessionStorage.removeItem('selectedTabId');
	selectedTabId = selectedTabId == null ? 0 : selectedTabId;
	var initScroll = 0;
	for (var i = 0; i < tileDataJson.length; i++) {
		var t = tileDataJson[i];
		var appendStringTabList = '<li role="presentation" class="%%isActive%%"><a href="#tabContent' + t.id + '" aria-controls="tabContent' + t.id + '" role="tab" data-toggle="tab"><div class="tab" id="tabHeader' + t.id + '"><div class="tabImg"></div><div class="tabText"><p>' + t.text + '</p></div></div></a></li>';

		var appendStringTabContent = '<div role="tabpanel" class="tab-pane %%isActive%%" id="tabContent' + t.id + '"><div class="treeview"></div></div>';

		if (t.id == selectedTabId) {
			appendStringTabList = appendStringTabList.replace('%%isActive%%', 'active');
			appendStringTabContent = appendStringTabContent.replace('%%isActive%%', 'active');
			initScroll = i * 93;
		}
		else {
			appendStringTabList = appendStringTabList.replace('%%isActive%%', '');
			appendStringTabContent = appendStringTabContent.replace('%%isActive%%', '');
		}

		tabContent.append(appendStringTabContent);
		tabList.append(appendStringTabList);

		$('#tabContent' + t.id + ' .treeview').kendoTreeView({
			dataSource: t.tabContent,
			select: onSelect.bind(tileDataJson[i]),
			//select: onSelect,
			//dataUrlField: "link",
		});
		$('#tabHeader' + i + ' .tabImg').css('background-image', 'url("Styles/img/Tiles/' + t.imgLocation + '")');
		//$('#tile' + i).click(clickTile.bind(tileDataJson[i]));
	}

	$('#tabListContent').css('width', (tileDataJson.length * 93) + 50);
	initScroll = Math.min($('#tabListContent').outerWidth() - $('#tabListContentScroll').outerWidth(), initScroll);
	$('#tabListContentScroll').animate({ scrollLeft: initScroll }, 800);
	if (initScroll == $('#tabListContent').outerWidth() - $('#tabListContentScroll').outerWidth()) {
		$('#rightArrow').css('opacity', '0.3');
	}
	if (initScroll > 0) {
		$('#leftArrow').css('opacity', '1');
	}
}

function scrollRight() {
	$('#leftArrow').css('opacity', '1');
	scrollPosition += $('#tabListContentScroll').outerWidth();
	scrollPosition = Math.min($('#tabListContent').outerWidth() - $('#tabListContentScroll').outerWidth(), scrollPosition);
	//$('#tabListContentScroll').scrollLeft(scrollPosition);
	$('#tabListContentScroll').animate({ scrollLeft: scrollPosition }, scrollAnimationDuration);
	if (scrollPosition == $('#tabListContent').outerWidth() - $('#tabListContentScroll').outerWidth()) {
		$('#rightArrow').css('opacity', '0.3');
	}
}

function scrollLeft() {
	$('#rightArrow').css('opacity', '1');
	scrollPosition -= $('#tabListContentScroll').outerWidth();
	scrollPosition = Math.max(scrollPosition, 0);
	if (scrollPosition == 0) {
		$('#leftArrow').css('opacity', '0.3');
	}
	$('#tabListContentScroll').animate({ scrollLeft: scrollPosition }, scrollAnimationDuration);
}

function onSelect(a) {
	var item = findTreeItem(this.tabContent, a.node.innerText, null);
	//return;
	if (item != null && item.slideshow == true) {
		localStorage.setItem('currItemId', item.id);
		window.location = 'slideshow.html';
	}
	else if (item != null) {
		localStorage.setItem('currItemId', item.id);
		window.location = item.link;
	}
}

function findTreeItem(rootNode, text, parentLink) {
	if (text.indexOf('\n') >= 0) {
		text = text.substring(0, text.indexOf('\n')).trim();
	}
	var returnObj;
	for (var i = 0; i < rootNode.length; i++) {
		var curr = rootNode[i];

		if (curr.text.trim() == text) {
			returnObj = curr;
			break;
		}
		else {
			if (curr.items && curr.items.length > 0) {
				var obj = findTreeItem(rootNode[i].items, text, rootNode[i].link);
				if (obj != null) {
					returnObj = obj;
					break;
				}
			}
		}
	}
	return returnObj;
}