
$(document).ready(function(){
	listar();
	$("[data-filtro]").on( "change", function() {
		listar();          
	});
	$( "[data-orderna]" ).on( "click", function() {
		ordena(this);
	});
});

function ordena(elem){
	var ordem = $(elem).attr('ordem'); 
	if(!valida(ordem) || ordem == "DESC")
		$(elem).attr('ordem', 'ASC');
	else if(ordem == "ASC")
		$(elem).attr('ordem', 'DESC');
	listar(elem);
}


function listar(elem){
	
	var ilista = 0;
	
	$(document).find('[data-lista]').each(function(){
		ilista++;
		$(this).attr('data-ilista',$(this).attr('data-lista')+ilista);
		
		var consulta = new Object();
		var entidade = $(this).attr('data-lista'); 
		var id = $(this).attr('data-ilista'); 
		
		// recolhe os elementos wt{} de cada consulta na pagina
		var htmlLoop = $(this).find('.wtLoop').html();
		if(!valida(htmlLoop))
			return;
		
		var campos = [];
		
		var wts = htmlLoop.match(/wt{\S+}/g); 
		for(var i=0; i<wts.length;i++){
			if(wts[i]==null)
				continue;
			wts[i] = wts[i].substring(3, wts[i].length-1);
			var campo = new Object();
			campo.nome = wts[i];
			campo.filtros = [];
			
			$('[data-filtro*="'+campo.nome+'"]').each(function(){
				
				if(valida(this.value) && this.value.trim()!=""){
				
					var filtro = new Object();
					filtro.valor = $(this).val();
					
					var datafiltro = $(this).attr('data-filtro').split(" ");
					
					
					if($(this).hasClass('texto'))
						campo.tipo = "texto";
					if($(this).hasClass('data'))
						campo.tipo = "data";
					if($(this).hasClass('hora'))
						campo.tipo = "hora";
					
					if(datafiltro.length > 1)
						filtro.condicao = datafiltro[1];
					else
						filtro.condicao = "igual";
//					
					campo.filtros.push(filtro);
				}
			});
			
			
			if(valida(elem) && $(elem).attr('data-orderna') == campo.nome){
				var ordem = $(elem).attr('ordem');
				campo.ordenacao = ordem;
			}
			
			campos.push(campo);
		} 
		campos.filtros = filtros;
		
		// configura a consulta da vez com os seus valores pegos
		consulta.id = id;
		consulta.entidade = entidade;
		consulta.campos = campos;
		
		$.ajax({
			  dataType: "json", 
			  contentType: "application/json",
			  url: CONTEXTO + '/' + app + "/"+consulta.entidade,
			  data: $.customParam(consulta),
			  success: function(registros){
					
				var lista =  $('[data-ilista="'+consulta.id+'"]');
				$(lista).find('.listagem').remove(); // remove registros de requisicao anterior
				var wtLoop = $(lista).find('.wtLoop');
				
				// loop de registros/ rows da cosulta
				$(registros).each(function(iregistro, registro){
					var novaLinha = wtLoop.clone();
					$(novaLinha).css({'display' : ''});
					$(novaLinha).removeClass('wtLoop');
					$(novaLinha).addClass('listagem');
					
					// loop de requisicoes de valores  - wt{campo}
					$(consulta.campos).each(function(icampo, campo){
						var valor = "";
						try { 
							valor = eval("registro."+campo.nome);
						} catch(err) { valor="";  }
						
						if(!valor)
							valor="";
						var re = new RegExp('wt{'+campo.nome+'}', "g");
						$(novaLinha).html($(novaLinha).html().replace(re ,valor));
						
					});
						
					// inclui a chave do registo na sua linha
					$(novaLinha).attr('chave', registro.id);
					$(novaLinha).attr('value', registro.id);
					$(wtLoop).parent().append(novaLinha);
				}); // fim da linha
			}
		});
	});
}

function inserir(form){
	
	var entidade = $(form).attr('id');
	$(form).find('[name="id"]').val('');
	
	$.ajax({
		method: "POST",
		type: "POST",
		contentType: "application/json",
		url: CONTEXTO + '/' + app +  "/"+entidade,
		data: $(form).serializeJSON(),
		success: sucessoCrud,
		error : errorCrud,
	});
}

function consultar(elem){
	var id = $(elem).closest('[chave]').attr('chave');
	var entidade = $(elem).closest('[data-lista]').attr('data-lista');
	//$.get('api/' + entidade + '/'+id);
	$.ajax({
	  url: CONTEXTO + '/' + app +  '/' + entidade + '/'+id,
	  success: function(registro){
		  var form = $('form#'+entidade);
		  
		  $(form).find('input, select, textarea').each(function(){
			 var name = $(this).attr('name');
			 var valor = "";
				try { 
					valor = eval("registro."+name);
				} catch(err) {  
					valor = "";
				}
				$(this).val(valor);
		  });
	  }
	});
}
	

function alterar(form){
	var entidade = $(form).attr('id');
	var id = $(form).find('[name="id"]')[0].value;
	
	var obj = [];
	$(form).find(':input').each(function(){
		obj.push(this.name);
	});
	
	var header = new Object();
	header.campos = obj;
	var campos = obj;
	
	var formCopia = $(form).clone(); 
	$(formCopia).find('input, select, textarea').each(function(){
		if(this.value==""){
			$(this).remove();
		}
	});
	
	$.ajax({
		method: "PUT",
		contentType: "application/json",
		url: CONTEXTO + '/' + app +  '/' + entidade + '/'+id,
		headers: header,
		data: $(formCopia).serializeJSON(),
		success: sucessoCrud,
		error: errorCrud
	});
}

function deletar(form){
	
	if (!confirm('Tem certeza que deseja excluir este Registro?'))
		return;
	
	var entidade = $(form).attr('id');
	var id = $(form).find('[name="id"]')[0].value;
	
	$.ajax({
		method: "DELETE",
		contentType: "application/json",
		url: CONTEXTO + '/' + app +  '/' + entidade + '/'+id,
		data: $(form).serializeJSON(),
		success: sucessoCrud
	});
}


function sucessoCrud(data){
	$(document).find('.modal').modal('hide');
	listar();
}

function errorCrud(data, textStatus, errorT){
	if(valida(data.responseJSON) && valida(data.responseJSON.fieldErrors)){
		console.log('Erros de validação encontrados');
		var div = $('<div/>');
		$(div).append('<h4> Erros de Preenchimento, por favor Revise as seguintes Informações: </h4>')
		var ul = $('<ul/>');
		$(data.responseJSON.fieldErrors).each(function(ierro, erro){
			$(ul).append('<li> Campo: <b>'+erro.field + '</b> - mensagem: '+erro.message + '</li>');
		});
		$(div).append(ul);
		$('#modalErro').find('.modal-body').html(div);
		$('#modalErro').modal('show');
	}
}
