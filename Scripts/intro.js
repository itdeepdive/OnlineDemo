var scrollPosition = 0;

$(document).ready(function () {
	var tabList = $('#tabList');
	var tabContent = $('#tabContent');

	for (var i = 0; i < tileDataJson.length; i++) {
		var t = tileDataJson[i];
		var appendStringTabList = '<li role="presentation" class="%%isActive%%"><a href="#tabContent' + t.id + '" aria-controls="tabContent' + t.id + '" role="tab" data-toggle="tab"><div class="tab" id="tabHeader' + t.id + '"><div class="tabImg"></div><div class="tabText"><p>' + t.text + '</p></div></div></a></li>';

		var appendStringTabContent = '<div role="tabpanel" class="tab-pane %%isActive%%" id="tabContent' + t.id + '"><div class="treeview"></div></div>';

		if (i == 1) {
			appendStringTabList = appendStringTabList.replace('%%isActive%%', 'active');
			appendStringTabContent = appendStringTabContent.replace('%%isActive%%', 'active');
		}
		else {
			appendStringTabList = appendStringTabList.replace('%%isActive%%', '');
			appendStringTabContent = appendStringTabContent.replace('%%isActive%%', '');
		}

		tabContent.append(appendStringTabContent);
		tabList.append(appendStringTabList);

		$('#tabContent' + t.id + ' .treeview').kendoTreeView({
			dataSource: t.tabContent,
			//select: onSelect,
			select: onSelect.bind(tileDataJson[i]),
			//dataUrlField: "link",
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

function onSelect(a) {
	var item = findTreeItem(this.tabContent, a.node.innerText, null);
	
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