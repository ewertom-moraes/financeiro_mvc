//				novaLinha = defineValores(novaLinha, camposCopia, registro); // versao recursiva
				
				// se o atributo do registro foi pedido, sobreescreve sua definicao ( wt{campo})
			/*	if( consulta.campos.indexOf(col) != -1 ){
					var re = new RegExp('wt{'+col+'}', "g");
					$(novaLinha).html($(novaLinha).html().replace(re , registro[col]));
//				}*/
			//} // fim do registro
			
			// ver como achar e retirar as definicoes wt{} que sobraram na novaLinha
			//htmlLoop.match(/wt{[a-z]+}/g);


// ------------------------------------------------------------------------------------


// PROBLEMA... 
 
//function defineValores(novaLinha, campos, registro){
//	
//	for(var col in registro){
//		if(registro!=null &&  registro[col]!=null && typeof(registro[col])=="object"){
//			novaLinha = defineValores(novaLinha, campos, registro[col]);
//		}else{
//			if( campos.indexOf(col) != -1){
//				campos[campos.indexOf(col)] = "";
//				var re = new RegExp('wt{'+col+'}', "g");
//				novaLinha[0].innerHTML =  novaLinha[0].innerHTML.replace(re , registro[col]);
//				continue;
//			}else 
//			if(campos.indexOf("genero."+col) != -1 ){ // falta agora o prefixo "genero" para encontrar
//				//campos[campos.indexOf(col)] = "";
//				
//				var re = new RegExp('wt{[a-z]+\.'+col+'}', "g");
//				novaLinha[0].innerHTML =  novaLinha[0].innerHTML.replace(re , registro[col]);
//				continue;
//			}
//		}
//	}
//	return novaLinha;
//}





// ---------------------------------------------------------------------------------------------

var consultasPagina = [];
var valores = {};
//function listar(){
//	obj.tabela = "";
//	consultasPagina = [];
//	
//	valores = {};
//	valores.consultas = {};
//	
//	$(document).find('[lista]').each(function(){
//		var lista = $(this).attr('lista');
//		
//		obj.consultas[lista] = []; // inicializa nova consulta
//		consultasPagina.push(lista); // adiciona a nova consulta num array
//		
//		// recolhe os elementos wt{} de cada consulta na pagina
//		var htmlLoop = $(this).find('.wtLoop').html();
//		if(!valida(htmlLoop))
//			return;
//		var wts = htmlLoop.match(/wt{[a-z]+}/g);
//		for(var i=0; i<wts.length;i++){
//			wts[i] = wts[i].substring(3, wts[i].length-1);
//		}
//		
//		valores.consultas[lista] = wts;
//		
//	});
//	enviaAjax("JsonServlet", obj, sucessoConsulta);
//
//}
//
//
//var sucessoConsulta = function(data){
//	$(consultasPagina).each(function(i){
//		
//		// remove linhas de registros anteriores
//		$('[lista="'+consultasPagina[i]+'"]').each(function(){
//			$(this).find('tr.listagem').remove(); 
//		});
//		
//		var consulta = data.consultas[consultasPagina[i]];
//		
//		// para casa consulta realizada, gera os valores
//		$(consulta).each(function(j, linha){
//			var  wtLoop = $('[lista="'+consultasPagina[i]+'"]').find('.wtLoop');
//			//$(wtLoop).eq(0).removeAttr('selected');
//			$(wtLoop).eq(0).attr('selected','false');
//			
//			var novaLinha = wtLoop.clone();
//			$(novaLinha).css({'display' : ''});
//			$(novaLinha).removeClass('wtLoop');
//			$(novaLinha).addClass('listagem');
//			
//			
//			//substitui definicoes de campos por seus valores
//			$(valores.consultas[consultasPagina[i]]).each(function(){
//				if(valida(linha[this]) && typeof(linha[this])=="object"){
////					$(linha[this]).each(function(){
//					for(var prop in linha[this]){
//						console.log('prop:'+prop + ', linha[this][prop]:' + linha[this][prop] + ', e ' + 'wt{'+ linha[this]+ '.'+prop+'}');
//						$(novaLinha).html($(novaLinha).html().replace('wt{'+ linha[this]+ '.'+prop+'}' , linha[this][prop]));
//					}
//					//});
//				}else{
//					$(novaLinha).html($(novaLinha).html().replace('wt{'+this+'}' , linha[this])); 
//					//novaLinha[0].outerHTML = novaLinha[0].outerHTML.replace('wt{'+this+'}' , linha[this]); //tem que adicionar novaLinha antes
//				}
//				
//			});
//			
//			// inclui a chave do registo na sua linha
//			$(novaLinha).attr('value', linha.id);
//			
//			//adiciona a nova linha
//			$('[lista="'+consultasPagina[i]+'"]').append(novaLinha);
//			
//			//$(wtLoop).appendTo($('[lista="'+consultasPagina[i]+'"]'));
//			
//		});
//			
//	});
//}


// --------------------------------------------------------------
//Array.prototype.clone = function() {
//return this.slice(0);
//};





//

//function convertDate(d) {
//	  function pad(s) { return (s < 10) ? '0' + s : s; }
//	  return [pad(d.dayOfMonth), pad(d.monthValue), (d.year)].join('/');
//	}
//
//
//function executa(rotina){
//	
//	var retorno;
//	
//	
//}



//-----------------------------
/**
 * aqui trecho para tentativa de usar criteria pelos forms
 * na funcao de listar na hor de pegar os filtros
 * */

//var formEntidade = $('<form/>');
//var formEntidade = new Object();

//...

//$(formEntidade).append('<input name="'+$(this).attr('name')+'" value="'+$(this).val()+'" >');
//formEntidade[$(this).attr('name')] = $(this).val();

//if($(this).hasClass('like'))
//	filtros[$(this).attr('name')]["like"]  	= $(this).val();
//else if($(this).hasClass('like2'))
//	filtros[$(this).attr('name')]["like2"] 	= $(this).val();
//else if($(this).hasClass('de'))
//	filtros[$(this).attr('name')]["de"] 	= $(this).val();
//else if($(this).hasClass('ate'))
//	filtros[$(this).attr('name')]["ate"] 	= $(this).val();
//else
//	filtros[$(this).attr('name')]["igual"] 	= $(this).val();
