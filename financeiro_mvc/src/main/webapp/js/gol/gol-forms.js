$(function() {
	$('[title]').tooltip();
	
	$('form').validate();
	
	$('input[type!=reset]').addClass('form-control');
	
	$('select').addClass('form-control');

	$("input[name='dataVencimento']").datepicker({
		dateFormat : 'dd/mm/yy'
	});
	
	$("input[name='dataEmissao']").datepicker({
		dateFormat : 'dd/mm/yy'
	});

	$('input[name=cpf]').mask('000.000.000-00', {
		reverse : true
	});

	$('input[name=valor]').mask('#########0.00', {
		reverse : true
	})

	$('input[name=dataEmissao]').mask('00/00/0000');

	$("input[name='endereco.cep']").mask('00000-000');

	$("input[name='fornecedor.nome']").autocomplete({
		source : function(request, response) {
			$.ajax({
				url : 'api/entidades',
				success : function(data) {
					response(data.map(function(row) {
						return {
							id : row.id,
							label : row.nome
						}
					}));
				}
			});
		},
		select: function(event, ui) {
			$("input[name='fornecedor.id']").val(ui.item.id)
		}
	});
	
	$("input[name='grupoDespesa.descricao']").autocomplete({
		source : function(request, response) {
			$.ajax({
				url : 'api/gruposDespesas',
				success : function(data) {
					response(data.map(function(row) {
						return {
							id : row.id,
							label : row.codigo + " " + row.descricao
						}
					}));
				}
			});
		},
		select: function(event, ui) {
			$("input[name='grupoDespesa.id']").val(ui.item.id)
		}
	});
});