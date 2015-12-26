
var tabelaAtual = "";
var campoOrdenar = "";

var obj = new Object();
obj.tabela = null;
obj.campos = null;
obj.params = null;
obj.filtroCampos = null;

var operacaoGeral = "refresh";
var listagemAtual = null;

var corpoVez = null;

/**
 * Exibe uma mensagem em um modal para o usuario.
 * @param msgs - mensagem a ser exibida.
 * 
 * */
function mensagem(msgs){
	var divModal = $('#modalErro');
	var divContent = $(divModal).find('#content');
	$(divContent).html("");
	$(msgs).each(function(i){
		
		$(divContent).append(msgs[i]+'<br> ');
	});
	$('#ancoraErro').click();
}


/**
 * Carrega os dados em elementos select
 * 
 * */
function iniciaForm(){
	var objetoJson = new Object();
	objetoJson.idMultiValores = [];
	objetoJson.acao = 'iniciaForm';
	operacaoGeral = "refresh";
	objetoJson.parametros = {};
	operacao = operacaoGeral;
	objetoJson.parametros['operacao'] = operacao;
		
	$("select").each(function(index, element){
		console.log($(this).attr('id'));
		$(this).addClass($(this).attr('id'));
		objetoJson.idMultiValores.push($(this).attr('id'));
	});
	
	var sucesso =  function(data){
		
		$.each(data.multiValores, function (idSelect, valores) {
			
			var elements =  document.getElementsByClassName(idSelect.toString());
			
			for(var i=0; i<elements.length; i++) {
			
    			var opcaoBranco = $("<option>");
				opcaoBranco.html(' ');
    			
				var idSelect = $(elements[i]).attr('id');
				
				$(elements[i]).append(opcaoBranco);
    			
    			
    			$.each(valores, function (index, linha) {
    			
        			var novaOption = $("<option>");
        			$.each(linha, function (i, col){
        				if(col.chavePrimaria==true){
        					novaOption.attr('value', col.valor);
        				}else{
        					if(idSelect.indexOf(col.nomeEnum)>0)
        						novaOption.html(novaOption.html() + "  "+ col.valor);
        				}
            		});
        			$(elements[i]).append(novaOption);
    			});
    			
			}
		});
		
		operacaoGeral = "refresh";
		if(listagemAtual==null || listagemAtual=='undefined')
			return;
	}
	
	enviaAjax("JsonServlet", objetoJson, sucesso);
	
}

/**
 * funcao utilizada nos formularios para listar registros. 
 * @param tabela - tabela a ser lida
 * @param campos - campos da tabela ou tabelas relacionadas a serem listados
 * @param - json de parametros da execucao. 
 * */
function listar(tabela, campos, parametros, isWt){
	tabelaAtual = tabela;
	parametros.operacao = operacaoGeral;
	listagemAtual = function(){
		listar(tabela, campos, parametros,isWt);
	}
	executalistar(tabela, campos, parametros,isWt);
}


/**
 * Lista Elementos Relacionados na tabela B, onde o id de B for igual a chave fornecida.
 * @param tabela - tabela relacionada dos registros a serem listados
 * @param colunaRelacao - coluna da tabela ponto de partida (chave extrangeira).
 * @param colChavePrincipal - coluna chave primaria...
 * @param campos - campos a serem listados
 * @param parametros - parametros da listagem
 * */
function listaRelacionada(tabela, colunaRelacao,colChavePrincipal, campos, parametros){
	
	var colChavePrincipal = document.getElementById(colChavePrincipal).value;
	colChavePrincipal = colChavePrincipal.substring(0,5);
	
	console.log("entrou no listar");
	tabelaAtual = tabela;
	parametros.operacao = operacaoGeral;
	parametros.colunaRelacao = colunaRelacao;
	parametros.colChavePrincipal = colChavePrincipal;
	parametros.semModal = true;
	listagemAtual = function(){
		listar(tabela, campos, parametros);
	}
	executalistar(tabela, campos, parametros);
}


/**
 * Execucao interna de listagens
 *
 * */

function executalistar(tabela, campos, parametros, isWt) {
	 
	var objetoJson = new Object();
	objetoJson.tabela = tabela;
	objetoJson.acao = 'R';
	objetoJson.campos = campos;
	objetoJson.parametros = parametros;
	objetoJson.filtroCampos = obj.filtroCampos;
		
	sucesso = function(data){ 
		sucessoAjax(data);
	}
	
	enviaAjax("JsonServlet", objetoJson, sucesso);
}


function validaSessao(){
	if(data.parametros.sessao=="invalida"){
		alert('Sessao de Usuario experida ou invalida. Por favor faca o login.');
		logout();
		return false;
	}
	return true;
}

function valida(elem){
	
	if(elem==null || typeof(elem)=="undefined")
		return false;
	
	return true;
	
}

function sucessoAjax(data){
	
	if(!validaSessao)
		return;
	
	//var table = $(corpoVez).parent();
	var wt = $(corpoVez).closest('wt[tabela]');
	
	var modo = ""
	if(valida($(wt).attr('mode')))
		modo = $(wt).attr('mode');
	
	if(modo!="refresh"){
		$(wt).find(".wtList").remove();
	}
	
	$("#spanTotal").remove();
	
	var trDefinicao = $(corpoVez);
	var numeroRegistros= 0;
	var corpo = trDefinicao.parent;
	var colunaChave = data.colunaChave;
		
	$.each(data.colunas, function (index, linha) {
		
		var novaLinha = null;
		if(modo!="refresh"){
			novaLinha = $(trDefinicao).clone();
			$(novaLinha).addClass('wtList');
			$(novaLinha).removeClass('wtLoop');
		}else{
			
		}
		
		if(modo=="refresh"){
			$(data.colunas[index]).each(function(){
				if(this.chavePrimaria==true && this.nomeEnum.indexOf(colunaChave)==0){
					novaLinha = $(wt).find('.wtList[id="'+this.valor+'"]');
				}
			});
		}
		
		$.each(linha, function (i, col){
			
			if(col.chavePrimaria==true && col.nomeEnum.indexOf(colunaChave)==0){
					$(novaLinha).attr('id',col.valor);
					//$(novaLinha).find('wt[print="'+col.nomeEnum+'"]').parent().remove();
			} else{
				$(novaLinha).find('wt[print="'+col.nomeEnum+'"]').each(function(){
					if(col.valor!=null && col.valor.trim()!=""){
						var htmlWt = $(this).html();
//						$(this).replaceWith(htmlWt + col.valor.trim());
						if(modo!="refresh"){
							$(this).append(col.valor.trim());
						}else{
							$(this).html(col.valor.trim());
						}
						
					}else{
						$(this).html('');
					}
					
				});
			}
			
			//if($(novaLinha).html!=null && typeof($(novaLinha).html())!="undefined")
					$(novaLinha).html($(novaLinha).html().replace('wt{'+col.nomeEnum+'}' , col.valor.trim()));
		});
		if(!data.parametros.semModal){
			//$(novaLinha).append("<td><a data-toggle=\"modal\" href=\"#modal\"  onclick=\"alterar(this)\"><i class=\"fa fa-pencil\"></i></a></td>");
		}
		
		
		if(modo=="literal"){
			$(novaLinha).find('td').each(function(){
				$(wt).append($(this).html());
			});
		}else{
			
			if(modo!="refresh"){
				$(trDefinicao).parent().append(novaLinha);
			}else{
				
			}
		}
		if(valida($(wt).attr('callback'))){
			eval($(wt).attr('callback'));
		}
		$(novaLinha).removeClass('hidden');
		numeroRegistros++;
    }); 
	if(modo=="literal"){
		$(table).remove();
	}else{
		//$(table).append(corpo);
	}
	
	$(wt).html($(wt).html().replace('wt{count}' , numeroRegistros));
	
	for(i in data.filtroCampos){
	    var key = i;
	    var campo = data.filtroCampos[i];
	    for(j in campo){
	        var filtro = j;
	        var valorFiltro = campo[j];
	        $(wt).find('input[onchange*="'+filtro+'"][onchange*="'+key+'"],select[onchange*="'+key+'"]').each(function(){
	        	$(this).val(valorFiltro);
	        });
	    }

	}
	
}


/**
 * limpa os valores dos elementos contidos no elemento
 * @param elemento html
 * */
function limpaForm(elem){
	$(elem).each(function(i){
		$($(this).find('input, select, textarea')).each(function(i){
			$(this).val('');
		});
	});
}


/**
 * funcao a ser chamada nos formularios 
 * para abrir modal de novo registro
 * */
function inserir(){
	var divModal = $('#modal');
	limpaForm(divModal);
	criaBotoesModal('C');
}

/**
 * funcao a ser chamada nos formularios
 * para abrir modal de edicao de registro.
 * @param elem elemento <td>
 * */
function alterar(elem){
	var divModal = $('#modal');
	limpaForm(divModal);
	pesquisaRegistro(elem);
	criaBotoesModal('U');
}

/**
 * cria os botoes no footer do modal adequado
 * de acordo com a acao crud informada.
 * @param acao acao C.R.U.D. 
 * */
function criaBotoesModal(acao){
	var divModal = $('#modal');
	var divBotoes = $(divModal).find('.modal-footer');
	$(divModal).find('.modal-footer').html("");
	if(acao=='C'){
		$(divBotoes).append("<button type=\"button\" class=\"btn btn-primary\" onclick=\"salvar(this,'C')\" >Salvar</button>");
	}
	if(acao=='U'){
		$(divBotoes).append("<button type=\"button\" class=\"btn btn-primary\" onclick=\"salvar(this,'U')\" >Salvar</button>");
		$(divBotoes).append("<button type=\"button\" class=\"btn btn-primary\" onclick=\"excluir(this)\"  >Excluir</button>");
	}
	$(divBotoes).append("<button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-default\">Cancelar</button>");
}

/**
 * Salva o registro do modal. Insere ou Atualiza de
 * acordo com a acao CRUD informada.
 * 
 * @param elem elemento botao que aciona a funcao
 * @param acao acao C.R.U.D. (C ou U)
 * */
function salvar(elem, acao){
	
	var objetoJson = new Object();
	objetoJson.acao = acao;
	objetoJson.tabela = tabelaAtual;
	objetoJson.campos = [];
	objetoJson.valoresCampos = [];
	objetoJson.operacao = "salvar";
	if(acao=='U'){
		objetoJson.parametros= {};
		objetoJson.chaveSelecionada = $(elem).parents().find("#modal").attr('chave');
		objetoJson.parametros['operacao'] = 'edita';
	}
	
	
	var divModal = $('#modal');
	$(divModal).each(function(i){
		$($(this).find('input, select')).each(function(i){
			
			
			var id = $(this).attr('id');
			if(id.indexOf('|')!=-1)
				id = id.substring(0, id.indexOf('|'));
			objetoJson.campos.push(id);
			var valor = $(this).val();
			objetoJson.valoresCampos.push(valor); //$(this).val()
		});
	});
	
	var sucesso = function (data) {
		if(data.mensagens.length > 0){
			mensagem(data.mensagens);
			return;
		}
		divModal.modal('hide');	
		operacaoGeral = "refresh";
		listagemAtual.call();
	}
	enviaAjax("JsonServlet", objetoJson, sucesso);
	
}

/**
 * exclui o registro ativo no modal
 * @param elem elemento botao que aciona a funcao
 * */
function excluir(elem){
	
	var objetoJson = new Object();
	objetoJson.acao = 'D';
	objetoJson.tabela = tabelaAtual;
	objetoJson.campos = [];
	objetoJson.valoresCampos = [];
	objetoJson.chaveSelecionada = $(elem).parents().find("#modal").attr('chave');
	
	var sucesso = function (data) {
		var divModal = $('#modal');
		divModal.modal('hide');
		operacaoGeral = "refresh";
		listagemAtual.call();
	}
	enviaAjax("JsonServlet", objetoJson, sucesso);
}


/**
 * pesquisa um registro especifico.
 * funcao usado ao acionar modal de alteracao
 * @param linha elemento que acionou o botao.
 * */
function pesquisaRegistro(linha){
	
	var objetoJson = new Object();
	objetoJson.acao = 'R';
	objetoJson.tabela = tabelaAtual;
	objetoJson.chaveSelecionada = $(linha).parent().parent().attr("id");
	objetoJson.campos = [];
	objetoJson.parametros= {};
	objetoJson.parametros['operacao'] = 'edita';
	
	var divModal = $('#modal');
	$(divModal).each(function(i){
		$($(this).find('input, select')).each(function(i){
			var id = $(this).attr('id');
			if(id.indexOf('|')!=-1)
				id = id.substring(0, id.indexOf('|'));
			objetoJson.campos.push(id);
		});
	});
	
	var sucesso = function (data) {
		
		$(divModal).attr('chave', $(linha).parent().parent().attr("id")); 
		
		var colunas = data.colunas[0];
		$(colunas).each(function(i){
			
			if(this.valor!=null && this.valor.trim()!="" && this.valor.trim()!="null")
				$(divModal).find('input[id^="'+this.nomeEnum+'"], select[id^="'+this.nomeEnum+'"]').val(this.valor.trim());
		});
	}
	enviaAjax("JsonServlet", objetoJson, sucesso);
}

/**
 * lista registros ordenados pelo campo informado.
 * @param campo nome do campo a ser usado para ordenacao.
 * */
function ordenar(elem, campo){
	var ntr = document.getElementsByClassName('trListagem');
	operacaoGeral = "ordena";
	campoOrdenar = campo;
	obj.params.ordena = campoOrdenar;
	obj.params['registrosListados'] = ntr+'';
	getListagem($(elem).closest('wt[tabela]'));
}

/**
 * lista registros filtrando o campo pelo valor do elemento, 
 * usando o comparador informado.
 * 
 * @param elem elemento html que aciona funcao e que possui o valor a filtrar
 * @param comp comparador a ser usado para filtrar o campo
 * @param campo campo para filtrar
 * */
function filtrar(elem, comp, campo){
	var ntr = document.getElementsByClassName('trListagem');
	operacaoGeral = "filtrar";
	
	obj.filtroCampos = {};
	var vcomp = {};
	vcomp[comp] = elem.value;
	obj.filtroCampos[campo] = vcomp;
	
	obj.params['registrosListados'] = ntr+'';
	getListagem($(elem).closest('wt[tabela]'));
	elem.focus();
}

function addFilter(elem){
	
	var value = $(elem).attr('value');
	
	if(!valida(value))
		value = $(elem).html();
	
	var comp = $(elem).attr('comp'); 
	
	var vcomp = {};
	vcomp[comp] = value;
	return vcomp;
}


function imprimeSimples(elem){
	var wt = $(elem).closest('wt[tabela]').html();
	obj = new Object();
	obj.parametros = {};
	obj.parametros['wtList'] = wt;
	obj.acao = "imprimeSimples";
	var sucessoImprime = function(data){
		window.open(data.parametros['url']);
	} 
	enviaAjax("JsonServlet", obj, sucessoImprime);
}

/**
 * funcao para finalizar a sessao do ususario 
 * e direcionar para a pagina de login
 * */
function logout(){
	$.ajax({
		url: "../ServletLogout",
		async: false,
		type: 'POST',
		success: function (data) {
			window.location.href ="index.html";
        },
		error:function(data,status,er) {
			alert("error: "+data+" status: "+status+" er:"+er);
		}
	});
}

$(document).ready(function(){
	  $('.date').mask('00/00/0000');
	  $('.time').mask('00:00:00');
	  $('.hora').mask('00:00');
	  $('.date_time').mask('00/00/0000 00:00:00');
	  $('.cep').mask('00000-000');
	  $('.phone').mask('0000-0000');
	  $('.phone_with_ddd').mask('(00) 0000-0000');
	  $('.phone_us').mask('(000) 000-0000');
	  $('.mixed').mask('AAA 000-S0S');
	  $('.cpf').mask('000.000.000-00', {reverse: true});
	  $('.money').mask('000.000.000.000.000,00', {reverse: true});
	  $('.money2').mask("#.##0,00", {reverse: true});
	  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
	    translation: {
	      'Z': {
	        pattern: /[0-9]/, optional: true
	      }
	    }
	  });
	  $('.ip_address').mask('099.099.099.099');
	  $('.percent').mask('##0,00%', {reverse: true});
	  $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
	  $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
	  $('.fallback').mask("00r00r0000", {
	      translation: {
	        'r': {
	          pattern: /[\/]/, 
	          fallback: '/'
	        }, 
	        placeholder: "__/__/____"
	      }
	    });
	  $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
	  
	  // coloca os icones de ordenacao nas ths da trOrdena
	  $('.trOrdena').children("th").children("a[onclick*='inserir']").append('<i class="fa fa-plus"></i>');
	  $('.trOrdena').children("th[onclick*='ordenar']").each(function(){
	  		var html = $(this).html();
	  		$(this).html('<span class="nowrap">'+html+'<i class="fa pull-right fa-sort"></i></span>');
	  	});
	  
	  
	  //append('&nbsp;<i class="fa fa-sort"></i>');
	  
});


// 1 - pegar os atributos print no form para preparar a listagem 
// 2 - enviar o json para o servidor
// 3 - ao receber json do servidor, depois ("after") da tr webtom, fazer loop que imprima os valores solicitados

function getValoresPrint(tr, tabela){
	
	var campos = [];
	
	var trDefinicao = tr;
	$(trDefinicao).find("wt").each(function(i){
		
		
		if($(this).closest('wt[tabela]').attr('tabela')==tabela){
		
			if($(this).attr("read")!= "" && $(this).attr("read")!=null){
				if(campos.indexOf($(this).attr("read"))==-1)
					campos.push($(this).attr("read"));
			}else{
				if(campos.indexOf($(this).attr("print"))==-1)
					campos.push($(this).attr("print"));
			}
		}
		
	});
	
	return campos;
	
}

function getParametros(wt){
	var params = $(wt).attributes();
	return params;
}

function getAtributos(elem){
	
	var attrs = {};
	
	$(elem).each(function() {
	  $.each(this.attributes, function() {
	    if(this.specified) {
	      attrs[this.name] = this.value;
	    }
	  });
	});
	return attrs;
}

function getListagens(){
	
	//var wt = $('wt:has(table)');
	var wt = $('wt[tabela]');
	
	if(wt==null || typeof(wt)=="undefined")
		return;
	
	$(wt).each(function(){
		
		corpoVez =  $(this).find(".wtLoop");
		
		obj = new Object();
		obj.tabela = $(this).attr("tabela");
		obj.campos = getValoresPrint(this, obj.tabela);
		obj.params = getAtributos(this);
		obj.filtroCampos = {};
		$(this).children('wt-filter').each(function(){
			obj.filtroCampos[$(this).attr('col')] = addFilter(this);
		});
		
		listar(obj.tabela, obj.campos, obj.params, true);
	});
	
}



function getListagem(wt){
	
	if(wt==null || typeof(wt)=="undefined")
		return;
	
	corpoVez =  $(wt).find(".wtLoop");
	
	$(wt).children('wt-filter').each(function(){
		obj.filtroCampos[$(this).attr('col')] = addFilter(this);
	});
	
	obj.tabela = $(wt).attr("tabela");
	obj.campos = getValoresPrint(wt, obj.tabela);
	obj.params = getAtributos(wt);
	
	listar(obj.tabela, obj.campos, obj.params, true);
	
}


function rotina(){
	
	var args = {};
	$('wt[key][value]').each(function(){
		
		var val = $(this).attr('value');
		if($(this).attr('value').substr(0,1)=='#'){
			val = $($(this).attr('value')).val();
		}
		
		args[$(this).attr('key')] = val;
	});
	
	var obj = new Object();
	obj.rotina = $('wt[function]').attr('function');
	obj.args = args;
	obj.acao = "executa";
	
	enviaAjax("JsonServlet", obj, function(){});
}

