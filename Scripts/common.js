
$(document).ready(function () {
	$('#logoutButton').click(function () {
		window.location = 'login.html';
	});

	$('#menuButton').click(function () {
		$('#tabsModal').modal('show');
	});

	$('#closeModalButton').click(function () {
		$('#tabsModal').modal('hide');
	});
});