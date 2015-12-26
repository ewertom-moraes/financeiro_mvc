

/**Envia uma Requisicao ao Servidor tipo Json
 * 
 * @param url - caminho a ser enviado
 * @param dados - pacote de dados Json a enviar
 * @param sucess - funcao a ser executada com sucesso na requisição
 * */
function enviaAjax(url, dados, sucess){
	
	//dados.formulario = window.location.href;
//	$.blockUI({ message: '<img style=\"width: 20px;\" src="../js/loading.gif" />' });
	$.ajax({
		url: url,
		async: false,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(dados),
		contentType: 'application/json;charset=utf-8;',
		mimeType: 'application/json',
		
		success: function (data) {
			sucess(data);
//			$.unblockUI();
		}, 
		error:function(data,status,er) {
			alert("Erro na Requisicao ao Servidor = erro: "+data+" " +
					"status: "+status+" er:"+er);
		}
	});
	
}

var Webtom = function(){
	
	var	list  = function(){
		getListagens();
	}
	
	var selects = function(){
		iniciaForm();
	}

	var app = new Object();
	app.seb = function(){
		var dashBoard = function(){
			console.log('iniciou dashboard');
			
			$('.painel-sala').each(function(){
				
				var ensaio_hora = $(this).find('wt[hora="ensaio_hora"]');
				var ensaio_duracao = $(this).find('wt[hora="ensaio_duracao"]');
				
				if(valida($(ensaio_hora).html()) && $(ensaio_hora).html().trim()!=""){
					
					var inicio = $(ensaio_hora).html();
					//inicio  = inicio.substring(0,inicio.indexOf(";"));
					var horaEnsaio = inicio.substring(0, inicio.indexOf(":"));
					var minutosEnsaio = inicio.substring(inicio.indexOf(":")+1); 
					var totalEnsaio = (horaEnsaio * 60 * 60 ) + (minutosEnsaio * 60 );
					
					var duracao = $(ensaio_duracao).html();
					//duracao  = duracao.substring(duracao.indexOf(";")+1);
					var horaDuracao = duracao.substring(0, duracao.indexOf(":"));
					var minutosDuracao = duracao.substring(duracao.indexOf(":")+1);
					
					var totalDuracao = (parseInt(horaDuracao) * 60 * 60) + (parseInt(minutosDuracao) * 60);
					
					var d = new Date();
					var hora = d.getHours();
					var minutos = d.getMinutes();
					var segundos = d.getSeconds();
					var totalHora = (hora * 60 * 60 ) + (minutos * 60 ) + segundos;
					
					var totalDif = totalHora - totalEnsaio;
					
					var x = (parseInt(totalDif) * 100 ) / parseInt(totalDuracao);
					
					var progress = $(this).find(".progress-bar");
					var percent = $(progress).width() / $(progress).parent().width() * 100;
					percent = x;
					$(progress).width(percent+'%');
				}else{
					var progress = $(this).find(".progress-bar");
					$(progress).width('0%');
				}	
				
				var x = $(this).find(".progress-bar").width() / $(progress).parent().width() * 100;
				if(x==0){
					$(this).attr('class', 'panel panel-default painel-sala');
				}else if(x>0 && x<90){
					$(this).attr('class', 'panel panel-info painel-sala');
				}else{
					$(this).attr('class', 'panel panel-warning painel-sala');
				}
				
				
			});
		}
		return {
			dash : function(){dashBoard();}
		}
	}();
	
	return {
		list : function(){list()},
		selects : function(){selects()},
		seb : app.seb
	}
	
}();


$(document).ready(function(){
	
	$('input').addClass('form-control');
	
	$('body').css({'display' : 'block'});
	
});

//$(window).ajaxStart($.blockUI({ message: '<img style=\"width: 20px;\" src="../js/loading.gif" />' })).ajaxStop($.unblockUI);