$(function() {
	
	$.extend(FormSerializer.patterns, {
		  validate: /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
	});

	$("[id^='incluir']").click(function() {
		var id = $(this).attr('id');

		var resourceName = extractResourceName(id);

		$.ajax({
			type : 'POST',
			url : resourceUrl(resourceName),
			data : formData(resourceName),
			contentType : 'application/json',
			success: function(data) {
				var dataTable = $('#tabela'+resourceName.capitalize()).DataTable();
				dataTable.ajax.reload();
			}
		});
		
	}).addClass('btn').addClass('btn-default');

	$("[id^='atualizar']").click(function() {
		var id = $(this).attr('id');

		var resourceName = extractResourceName(id);
		
		$.ajax({
			type : 'PUT',
			url : resourceUrlWithId(resourceName),
			data : formData(resourceName)
		});
	});

	$("[id^='excluir']").click(function() {
		var id = $(this).attr('id');

		var resourceName = extractResourceName(id);
		
		$.ajax({
			type : 'DELETE',
			url : resourceUrlWithId(resourceName)
		});
	});

	$("[id^='consultar']").click(function() {
		var id = $(this).attr('id');

		var resourceName = extractResourceName(id);
		
		$.get(resourceUrlWithId(resourceName));
	});

	$("[id^='listar']").click(function() {
		var id = $(this).attr('id');

		var resourceName = extractResourceName(id);
		
		$.get(resourceUrl(resourceName), function(data) {
			$('#listagem').text(data);
		});
	});

});

function extractResourceName(str) {
	var regex = /[A-Z]{1}\w+/g
	
	var firstMatch = regex.exec(str);
	
	return firstMatch.toString().toLowerCase();
}

function resourceUrl(resourceName) {
	return 'api/' + resourceName;
}

function resourceForm(resourceName) {
	return $('#' + resourceName)
}

function formData(formName){
    return $('#'+formName).serializeJSON();
}

function resourceUrlWithId(resourceName) {
	return 'api/' + resourceName + $('#' + resourceName + 'input[name=id]')
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}