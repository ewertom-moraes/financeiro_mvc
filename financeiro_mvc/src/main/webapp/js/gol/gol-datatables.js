$(function() {
	$('#tabelaTitulos').dataTable({
		"ajax" : {
			"url" : 'api/titulos',
			"dataSrc" : ""
		},
		"language" : {
			"url" : 'pt-br.json'
		},
		"columns" : [ {
			"data" : "tipo"
		}, {
			"data" : "descricao"
		}, {
			"data" : "fornecedor.nome"
		}, {
			"data" : "grupoDespesa.descricao"
		}, {
			"data" : "dataEmissao"
		}, {
			"data" : "dataVencimento"
		}, {
			"data" : "valor"
		} ]

	}).addClass('table').addClass('table-striped').addClass('table-bordered');
});