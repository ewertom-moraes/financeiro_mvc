
$(document).ready(function(){
	listar();
});

function ordena(elem){
	var ordem = $(elem).attr('ordem'); 
	if(!valida(ordem) || ordem == "DESC")
		$(elem).attr('ordem', 'ASC');
	else if(ordem == "ASC")
		$(elem).attr('ordem', 'DESC');
	listar();
}


function listar(){
	
	$(document).find('[lista]').each(function(){
		
		var consulta = new Object();
		
		var entidade = $(this).attr('lista'); //ENTIDADE
		var id = $(this).attr('id'); // ID
		var filtros = {}; // FILTROS
		
		$(this).find('.filtro').each(function(){
			
			if(valida(this.value) && this.value.trim()!=""){
			
				if(!valida(filtros[$(this).attr('name')]))
					filtros[$(this).attr('name')] = {};
				
				var valor = $(this).val();
				if($(this).hasClass('data'))
					valor = "'"+valor+"'";
				
				// modo criteria/example	
//				if($(this).hasClass('like'))
//					filtros[$(this).attr('name')]["like"]  	= valor;
//				else if($(this).hasClass('like2'))
//					filtros[$(this).attr('name')]["like2"] 	= valor;
//				else if($(this).hasClass('de'))
//					filtros[$(this).attr('name')]["de"] 	= valor;
//				else if($(this).hasClass('ate'))
//					filtros[$(this).attr('name')]["ate"] 	= valor;
//				else
//					filtros[$(this).attr('name')]["igual"] 	= valor;
				
				// modo sql string 
				if($(this).hasClass('like'))
					filtros[$(this).attr('name')]["like"]  	= " like '%"+valor+"'";
				else if($(this).hasClass('like2'))
					filtros[$(this).attr('name')]["like2"] 	= " like '%"+valor+"%'";
				else if($(this).hasClass('de'))
					filtros[$(this).attr('name')]["de"] 	= " >="+valor;
				else if($(this).hasClass('ate'))
					filtros[$(this).attr('name')]["ate"] 	= " <="+valor;
				else
					filtros[$(this).attr('name')]["igual"] 	= " ="+valor;
				
			}
			
		});
		var ordenacao = {}; // // ORDENACAO
		$(this).find('.ordena').each(function(){
			var ordem = $(this).attr('ordem');
			if(!valida(ordem)){
				// nao manda filtro
			}else{
				ordenacao[$(this).attr('name')] = ordem;
			} 
		});
		
		
		// recolhe os elementos wt{} de cada consulta na pagina
		var htmlLoop = $(this).find('.wtLoop').html();
		if(!valida(htmlLoop))
			return;
		var wts = htmlLoop.match(/wt{\S+}/g); 
		for(var i=0; i<wts.length;i++){
			if(wts[i]==null)
				continue;
			wts[i] = wts[i].substring(3, wts[i].length-1);
		}
		
		// configura a consulta da vez com os seus valores pegos
		consulta.id = id;
		consulta.entidade = entidade;
		consulta.campos = wts;
		consulta.filtros = filtros;
		consulta.ordenacoes = ordenacao;
		
		
		$.ajax({
			  dataType: "json", 
			  url: CONTEXTO + '/' + app + "/"+consulta.entidade,
			  data: consulta,
			  //beforeSend: function(xhr){xhr.setRequestHeader("banda", "formEntidade");},
			  success: function(registros){
					
				var lista = $('#'+consulta.id);
				$(lista).find('.listagem').remove(); // remove registros de requisicao anterior
				var wtLoop = $(lista).find('.wtLoop');
				//$(wtLoop).eq(0).attr('selected','false'); // para <select>
				
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
								valor = eval("registro."+campo);
							} catch(err) { valor="";  }
							
							if(!valor)
								valor="";
							var re = new RegExp('wt{'+campo+'}', "g");
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


function testeMetodo(){
	$.get('/banda/reggae');
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
		success: sucessoCrud
	});
}

function consultar(elem){
	var id = $(elem).closest('[chave]').attr('chave');
	var entidade = $(elem).closest('[lista]').attr('lista');
	//$.get('api/' + entidade + '/'+id);
	$.ajax({
	  url: CONTEXTO + '/' + app +  '/' + entidade + '/'+id,
	  success: function(registro){
		  var form = $('form#'+entidade);
		  
		  console.log(registro);
		  
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
	
	var formCopia = $(form).clone(); 
	$(formCopia).find('input, select, textarea').each(function(){
		if(this.value=="")
			$(this).remove();
	});
	
	//alert($(formCopia).serializeJSON());
	
	$.ajax({
		method: "PUT",
		contentType: "application/json",
		url: CONTEXTO + '/' + app +  '/' + entidade + '/'+id,
		headers: header,
		data: $(formCopia).serializeJSON(),
		success: sucessoCrud 
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
	
	if( valida(data.erros) && data.erros.length > 0 ){
		Webtom.modal.exibeErro(data.erros);
		return;
	}
		
	
	if(valida(data.erros) && data.mensagens.length > 0 )
		Webtom.modal.exibeMensagem(data.mensagens);
	
//	var modal = $(document).find('.modal');
//	if(valida(modal))
//		 $(modal).eq(0).modal('toggle');
	listar();
}