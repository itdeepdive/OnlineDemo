var scrollPosition = 0;

$(document).ready(function () {
	var content = $('#tilesContent');
	var tabList = $('#tabList');
	var tabContent = $('#tabContent');
	for (var i = 0; i < tileDataJson.length; i++) {
		var appendString = '<div class="tile" id="tile' + i + '"><div class="tileImg"></div>' + 
			'<div class="tileText"><p>' + tileDataJson[i].text + '</p></div></div>';
		content.append(appendString);
		$('#tile' + i + ' .tileImg').css('background-image', 'url("Styles/img/Tiles/' + tileDataJson[i].imgLocation + '")');
		$('#tile' + i).click(clickTile.bind(tileDataJson[i]));

		var t = tileDataJson[i];
		console.log(t.text);
		var appendStringTabList = '<li role="presentation" class="%%isActive%%"><a href="#tabContent' + t.id + '" aria-controls="tabContent' + t.id + '" role="tab" data-toggle="tab"><div class="tab" id="tabHeader' + t.id + '"><div class="tabImg"></div><div class="tabText"><p>' + t.text + '</p></div></div></a></li>';

		var appendStringTabContent = '<div role="tabpanel" class="tab-pane %%isActive%%" id="tabContent' + t.id + '"><div class="treeview"></div></div>';

		//if (t.id == selectedTabId) {
		//	appendStringTabList = appendStringTabList.replace('%%isActive%%', 'active');
		//	appendStringTabContent = appendStringTabContent.replace('%%isActive%%', 'active');
		//	initScroll = i * 93;
		//}
		//else {
		//	appendStringTabList = appendStringTabList.replace('%%isActive%%', '');
		//	appendStringTabContent = appendStringTabContent.replace('%%isActive%%', '');
		//}

		tabContent.append(appendStringTabContent);
		tabList.append(appendStringTabList);

		$('#tabContent' + t.id + ' .treeview').kendoTreeView({
			dataSource: t.tabContent,
			//select: onSelect,
			dataUrlField: "link",
		});
		$('#tabHeader' + i + ' .tabImg').css('background-image', 'url("Styles/img/Tiles/' + t.imgLocation + '")');
	}	
	
	$('#tabListContent').css('width', (tileDataJson.length * 93) + 40);

	$('#rightArrow').click(function () {
		$('#leftArrow').css('opacity', '1');
		scrollPosition += $('#tabListContentScroll').outerWidth();
		scrollPosition = Math.min($('#tabListContent').outerWidth() - $('#tabListContentScroll').outerWidth(), scrollPosition);
		//$('#tabListContentScroll').scrollLeft(scrollPosition);
		$('#tabListContentScroll').animate({ scrollLeft: scrollPosition }, 800);
		if (scrollPosition == $('#tabListContent').outerWidth() - $('#tabListContentScroll').outerWidth()) {
			$('#rightArrow').css('opacity', '0.3');
		}
	});

	$('#leftArrow').click(function () {
		$('#rightArrow').css('opacity', '1');
		scrollPosition -= $('#tabListContentScroll').outerWidth();
		scrollPosition = Math.max(scrollPosition, 0);
		if (scrollPosition == 0) {
			$('#leftArrow').css('opacity', '0.3');
		}
		$('#tabListContentScroll').animate({ scrollLeft: scrollPosition }, 800);
	});
});

function clickTile() {
	if (this.href) {
		localStorage.setItem('currItemId', '0.0');
		window.location = this.href;
	}
	else {
		window.sessionStorage.setItem("selectedTabId", this.id);
		window.location = 'Tabs.html';
	}
}