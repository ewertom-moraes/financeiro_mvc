var funcaoCallBack = null;

function valida(elem){
	if(elem==null || typeof(elem)=="undefined")
		return false;
	return true;
}	


var Webtom = function(){
	
	var app = new Object();
	
	app.crud = function(){
		return{
			post : function(form){
				if(!valida(form))
					return;
				var entidade = $(form).attr('id');
				$(form).find('[name="id"]').val('');
				
				var formCopia = $(form).clone(); 
				$(formCopia).find('input, select, textarea').each(function(){
					if(this.value==""){
						$(this).remove();
					}
				});
				
				$.ajax({
					method: "POST",
					type: "POST",
					contentType: "application/json",
					url: CONTEXTO + APLICACAO +  "/"+entidade,
					data: $(formCopia).serializeJSON(),
					success: Webtom.crud.sucessoCrud,
					error : Webtom.crud.errorCrud,
				});
				
			},
			put : function(form){
				if(!valida(form))
					return;
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
				
				console.log($(formCopia).serializeJSON());
				//return;
				
				$.ajax({
					method: "PUT",
					contentType: "application/json",
					url: CONTEXTO + '/' + APLICACAO +  '/' + entidade + '/'+id,
					headers: header,
					//data: '{"id":"1","nome":"ALTERANDO CLIENTE SEM ALTERAR APLICACAO","razaoSocial":"Ewertom MMM","dataValidade":"01/01/2017","tipoPessoa":"FISICA","cpf":"015.685.442-27","cnpj":"96.583.315/0001-88","telefone":"91983263526","email":"ewertom.moraes@gmail.com", "aplicacoes":[{"id":"1","codigo":"KKK","nome":"FUNCIONOU KKKKK"}]}',
					data: $(formCopia).serializeJSON(),
					success: Webtom.crud.sucessoCrud,
					error: Webtom.crud.errorCrud
				});
			},
			
			geraLista : function(consulta, registros){
				
				var lista =  $('[data-ilista="'+consulta.id+'"]');
				
				if($(lista).hasClass('lista-refresh')){
					
				}
				$(lista).find('.listagem').remove(); // remove registros de requisicao anterior
				var wtLoop = $(lista).find('.wtLoop');
				
				// loop de registros/ rows da cosulta
				$(registros).each(function(iregistro, registro){
					var novaLinha = wtLoop.clone();
					var dataSubListas = $(novaLinha).find('[data-sub-lista]');
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
					
					//loop de data-sub-lista
					$(dataSubListas).each(function(isub, subLista){
						var nomeArray = $(subLista).attr('data-sub-lista');
						var array = null
						try {
							array = eval("registro."+nomeArray);
						} catch (e) { }
						
						
						
						$(array).each(function(icp, cp){
							var novaSubLinha = $(subLista).clone();
							$(novaSubLinha).removeClass('hidden');
							$(novaSubLinha).removeAttr('data-sub-lista');
							var wts = $(novaSubLinha).html().match(/wtsub{\S+}/g);
							$(wts).each(function(){
								var campo = this.substring(6, this.length-1);
								var valor = ""
								try {
									valor = eval("cp."+campo);
								} catch (e) {}
								if(valor){
									var re = new RegExp(this, "g");
									$(novaSubLinha).html($(novaSubLinha).html().replace(re ,valor));
								}
							});
							$(novaLinha).find('[data-sub-lista]').eq(isub).parent().append(novaSubLinha);
						});
					});
						
					// inclui a chave do registo na sua linha
					$(novaLinha).attr('chave', registro.id);
					$(novaLinha).attr('value', registro.id);
					$(wtLoop).parent().append(novaLinha);
				}); // fim da linha
				if(valida(funcaoCallBack)){
					funcaoCallBack.call();
				}
			},
			
			get : function(listas, elem){
				var ilista = 0;
				
				$(listas).each(function(){
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
						
						$('[data-filtro~="'+campo.nome+'"]').each(function(){
							
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
						
						
						if(valida(elem) && $(elem).attr('data-ordena') == campo.nome){
							var ordem = $(elem).attr('ordem');
							campo.ordenacao = ordem;
						}
						
						campos.push(campo);
					} 
					//campos.filtros = filtros;
					
					// configura a consulta da vez com os seus valores pegos
					consulta.id = id;
					consulta.entidade = entidade;
					consulta.campos = campos;
					
					var uri = consulta.entidade;
					
					if(valida($(this).attr('data-args'))){
						consulta.entidade += $(this).attr('data-args');
						console.log('uri = '+consulta.entidade);
						$.ajax({
							  dataType: "json", 
							  contentType: "application/json",
							  url: CONTEXTO + '/' + APLICACAO + "/"+consulta.entidade,
							  async: true,
							  success: function(registros){
								  Webtom.crud.geraLista(consulta, registros);
							  },error :function(data, textStatus, errorT){
								  console.log('erro na funcao get()');
							  }
						});
					} else {
					
						$.ajax({
							  dataType: "json", 
							  contentType: "application/json",
							  url: CONTEXTO + '/' + APLICACAO + "/"+consulta.entidade,
							  data: $.customParam(consulta),
							  async: true,
							  success: function(registros){
								  Webtom.crud.geraLista(consulta, registros);
							  },error :function(data, textStatus, errorT){
								console.log('erro na funcao get()');
							}
						});
					}
				});
			},
			
			getOne : function(id, entidade){
				$.ajax({
				  url: CONTEXTO + '/' + APLICACAO +  '/' + entidade + '/'+id,
				  success: function(registro){
					  var form = $('form#'+entidade);
					  
					  $(form).find('input, select, textarea').each(function(){
						 var name = $(this).attr('name');
						 var valor = "";
							try {
								if(name.indexOf('[]')!= -1){
									aux = name;
									name = aux.substring(0,aux.indexOf('['));
									campo = aux.substring(aux.lastIndexOf('[')+1, aux.lastIndexOf(']'));
									var valorMulti = [];
									$(eval(eval("registro."+name))).each(function(){
										console.log('valor multiple='+this[campo]);
										valorMulti.push(this[campo]);
										valor = valorMulti;
									});
								}else{
									valor = eval("registro."+name);
								}
							} catch(err) {  
								valor = "";
							}
							$(this).val(valor);
					  });
				  }
				});
			},
			
			getRelacao : function(lista, args){
				var uri = "";
				if(typeof(args)=="string"){
					uri += "/"+args;
				}else{
					$(args).each(function(){
						uri += "/"+this;
					});
				}
				$(lista).attr('data-args', uri);
				Webtom.crud.get(lista);
			},
			
			getOneFromList : function(elem){
				if(!valida(elem))
					return;
				var id = $(elem).closest('[chave]').attr('chave');
				var entidade = $(elem).closest('[data-lista]').attr('data-lista');
				this.getOne(id, entidade);
			},
			
			deleteOne : function(form){
				if (!confirm('Tem certeza que deseja excluir este Registro?'))
					return;
				
				var entidade = $(form).attr('id');
				var id = $(form).find('[name="id"]')[0].value;
				
				$.ajax({
					method: "DELETE",
					contentType: "application/json",
					url: CONTEXTO + '/' + APLICACAO +  '/' + entidade + '/'+id,
					data: $(form).serializeJSON(),
					success: Webtom.crud.sucessoCrud
				});
			},
			
			getFieldErro : function(context, name){
				
				var field = $(context).find('[name*="'+name+'."]');
				if(field.length==0)
					field = $(context).find('[name="'+name+'"]');
				return field;
				
			},
			
			errorCrud : function(data, textStatus, errorT){
				if(valida(data.responseJSON)){
					
					var form = $('form#'+data.responseJSON.objectName);
					if(!valida(form)){
						alert('erros de validação. nao foi possivel encontrar formulario correspondente');
						return;
					}
					
					var validator = $(form).validate({
						errorElement: 'span', //default input error message container
				            errorClass: 'help-block help-block-error', // default input error message class
				            ignoreTitle: true, // adicionado!
				            focusInvalid: false, // do not focus the last invalid input
				            invalidHandler: function (event, validator) { },
				            ignore : '.hidden,[type="hidden"]',
				            highlight: function (element) { // hightlight error inputs
				                $(element).parent().addClass('has-error'); // set error class to the control group
				            },
				            unhighlight: function (element) { // revert the change done by hightlight
				                $(element).parent().removeClass('has-error'); // set error class to the control group
				            },
				            success: function (label) {
				                label.parent().removeClass('has-error'); // set success class to the control group
				            },
				            submitHandler: function (formulario) {
				            }
					});
					
					if(valida(data.responseJSON.fieldErrors)){
						$(data.responseJSON.fieldErrors).each(function(ierro, erro){
							
							var codigo = "";
							var valCodigo = "";
							
							switch (erro.codigo.toLowerCase()) {
							case "notnull":
								$(Webtom.crud.getFieldErro(form, erro.field)).rules("add", {
									required : true
								});
								break;
							case "email":
								$(Webtom.crud.getFieldErro(form, erro.field)).rules("add", {
									email : true
								});
								break;
							case "cpf":
								$(Webtom.crud.getFieldErro(form, erro.field)).rules("add", {
									cpf : 'valid'
								});
								break;
							case "cnpj":
								$(Webtom.crud.getFieldErro(form, erro.field)).rules("add", {
									cnpj : 'valid'
								});
								break;
							default:
								break;
							}							
						});
						form.valid();  
					}
					
					if(valida(data.responseJSON.objectErrors)){
						$('.alert-danger', form).removeClass('hidden');
						var ul = $('<ul/>');
						$(data.responseJSON.objectErrors).each(function(ierro, erro){
							$(ul).append('<li>'+erro.message + '</li>');
						});
						$('.alert-danger #erros', form).html(ul);
					}else {
						$('.alert-danger', form).addClass('hidden');
					}
				}
			},
			sucessoCrud : function(data){
				$(document).find('.modal').modal('hide');
				Webtom.crud.get($(document).find('[data-lista]'));
			},
//			postAvatar : function(form){
//				var data = $(form).find('img').attr('src');
//				
//				$.ajax({
//					processData: false,
//					
//				});
//			}
		}
	}();
	
	app.modal = function(){
		return{
			
			cadastrar : function(elem){
				var entidade  = $(elem).closest('[data-lista]').attr('data-lista');
				var modal = $('.modal[id="'+entidade+'"]');
				Webtom.form.limpaForm($("form", modal));
				$(modal).find('.modal-footer').html(
						"<button type=\"button\" class=\"btn btn-sm btn-primary\" onclick=\"Webtom.modal.actionModal(this, Webtom.crud.post)\" >Salvar</button>"
						+ "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-sm btn-default\">Cancelar</button>");
				$(modal).find('input, select, textarea').val('');
				$(modal).modal('show');
			},
			editar : function(elem){
				
				$(modal).find('input, select, textarea').val('');
				Webtom.crud.getOneFromList(elem);
				
				var entidade  = $(elem).closest('[data-lista]').attr('data-lista');
				var modal = $('.modal[id="'+entidade+'"]');
				Webtom.form.limpaForm($("form", modal));
				$(modal).find('.modal-footer').html(
						"<button type=\"submit\"  class=\"btn btn-sm btn-primary\" onclick=\"Webtom.modal.actionModal(this, Webtom.crud.put)\" >Salvar</button>"
						+ "<button type=\"button\" class=\"btn btn-sm btn-primary\" onclick=\"Webtom.modal.actionModal(this, Webtom.crud.deleteOne)\"  >Excluir</button>"
						+ "<button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-sm btn-default\">Cancelar</button>");
				$(modal).modal('show');
			},
			
			/**executa uma funcao passando o form do modal pra esta
			 * @param funcao - function a ser executada
			 * 
			 * */
			actionModal : function(botao, funcao){
				var form = $(botao).closest('.modal').find('form')[0];
				funcao(form);
			},
			exibeErro : function(erros){
				
				var ul = $('<ul/>')
				$(erros).each(function(){
					var erro = this;
					if(typeof(erro)!='string')
						erro = erro.toString();
					$(ul).append('<li>'+erro+'</li>');
				});
				$('#modalErro').find('.modal-body').html(ul);
				$('#modalErro').modal('show');
			},
			exibeMensagem : function(mensagens){
							
				var ul = $('<ul/>')
				$(mensagens).each(function(){
					var msg = this;
					if(typeof(msg)!='string')
						msg = msg.toString();
					$(ul).append('<li>'+msg+'</li>');
				});
				$('#modalMensagem').find('.modal-body').html(ul);
				$('#modalMensagem').modal('show');
			}
			
		}
	}();
	
	app.studioplay = function(){
		
		return {
			dashboard: function(){
				console.log('iniciou dashboard');
				
				var primeiroTerminar = new Date(Date.now());
				primeiroTerminar.setFullYear(primeiroTerminar.getFullYear() + 1);
				console.log(primeiroTerminar);
				
				$('.painel-sala').each(function(){
					if(!$(this).hasClass("wtLoop")){
					
						var ensaio_hora = $(this).find('div[data-name="ensaio_inicio"]');
						var ensaio_duracao = $(this).find('div[data-name="ensaio_duracao"]');
						var ensaio_termino = $(this).find('div[data-name="ensaio_termino"]');
						
						if(valida($(ensaio_hora).html()) && $(ensaio_hora).html().trim()!=""){
							
							var inicio = $(ensaio_hora).html();
							//inicio  = inicio.substring(0,inicio.indexOf(";"));
							var horaEnsaio = inicio.substring(0, inicio.indexOf(":"));
							var minutosEnsaio = inicio.substring(inicio.indexOf(":")+1); 
							var totalEnsaio = (parseInt(horaEnsaio) * 60 * 60 ) + (parseInt(minutosEnsaio) * 60 );
							
							var duracao = $(ensaio_duracao).html();
							var horaDuracao = duracao.substring(0, duracao.indexOf(":"));
							var minutosDuracao = duracao.substring(duracao.indexOf(":")+1);
							
							var horaTermino =  new Date(Date.now());
							var arrayTermino = $(ensaio_termino).html().trim().split(":");
							horaTermino.setHours( parseInt(arrayTermino[0]));
							horaTermino.setMinutes(parseInt(arrayTermino[1]));
							horaTermino.setSeconds(parseInt(arrayTermino[2]));
							
							if(horaTermino.getTime() < primeiroTerminar.getTime()){
								primeiroTerminar = new Date(horaTermino.getTime());
							}
							
							var horaAtual = new Date(Date.now());
							
							$(ensaio_duracao).countdown({until: horaTermino, format: 'HMS', compact: true, description: ''});
							
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
						
						//var x = $(this).find(".progress-bar").width() / $(progress).parent().width() * 100;
						console.log("cor do painel de inicio="+inicio + " x="+x);
						if(x==0){
							$(this).attr('class', 'panel panel-default painel-sala');
						}else if(x>0 && x<90){
							$(this).attr('class', 'panel panel-info painel-sala');
						}else{
							$(this).attr('class', 'panel panel-warning painel-sala');
						}
					
					}
				});
							
				console.log("primeiro a terminar="+primeiroTerminar);
				setTimeout(
						function(){
							//bug no countdown se chamar o get
//							funcaoCallBack = function (){
//								Webtom.studioplay.dashboard();			
//							}
//							Webtom.crud.get();
							window.reload();
						}, primeiroTerminar.getTime() - Date.now());
				
			}
		
		}
	}();
	
	
	app.form = function(){
		
		numeroWebtomAbas = 0;
		
		return{
			
			limpaForm : function(form){
				
				// limpa mensagens de validação e reseta jquery validate
				try {
					$(form).find(".has-error").removeClass("has-error");
					$(form).validate().resetForm();
					//$(form).validate().reset();
					$('.alert-danger', form).addClass('hidden');
				} catch (e) {
					// TODO: handle exception
				} 
			},
			
			ordena : function(lista, elem){
				var ordem = $(elem).attr('ordem'); 
				if(!valida(ordem) || ordem == "DESC")
					$(elem).attr('ordem', 'ASC');
				else if(ordem == "ASC")
					$(elem).attr('ordem', 'DESC');
				Webtom.crud.get(lista, elem);
			},
			
			patterns : function(local){
				
				var divPai = $(document);
				if(valida(local))
					divPai = local;
				
				/*<div class="webtom-opcoes">
				*<input value="executa(this, 'nome.do.metodo()')" class="salvar" />
				*<input value="executa(this, 'nome.do.metodo()')" class="lixeira"/>
				*<input value="executa(this, 'nome.do.metodo()')" class="editar"/>
				*	</div>
				 * 
				 * */
				
				$('span[vwebtom]').each(function(){
					var vwebtom = $(this).attr('vwebtom');
					if(vwebtom.indexOf('ativo:') == -1)
						$(this).attr('vwebtom',vwebtom+'ativo: nao;');
				});
				 
				//aplica icones
				$(divPai).find('i.historico').addClass("fa fa-history");
				$(divPai).find('i.informa').addClass("fa fa-pencil");
				$(divPai).find('i.edita').addClass("fa fa-edit");
				$(divPai).find('i.lista').addClass("fa fa-table");
				$(divPai).find('i.posiciona').addClass("fa fa-user");
				
				//configuracao de webtom-painel
				$(divPai).find('[class*="webtom-painel"]').each(function(){
					
					$(this).addClass('portlet');
					if($(this).hasClass('webtom-painel1')){
						$(this).addClass('box');
					}
					
					var head = $(this).find('.painel-head').eq(0);
					var body = $(this).find('.painel-body').eq(0);
					
					$(head).addClass('portlet-title');
					$(body).addClass('portlet-body');
					
					if($(head).find('.painel-acoes').length == 0){
						$(head).append('<div class="painel-acoes"></div>');
					}
					$(head).find('.painel-acoes').addClass('actions');
					
					$(head).find('.painel-acoes').addClass('actions');
					$(head).find('.painel-nome').addClass('caption');
					
					if($(head).hasClass('tools')){
							$(head).find('.painel-acoes').before('<div class="tools"><a href="javascript:;" class="collapse"> </a>' );
					}
					
				});
				
				//configura webtom-abas
				$(divPai).find('ul.webtom-abas').each(function(){
					
					var content = $('<div class="tab-content"></div>')
					
					$(this).addClass('nav nav-tabs');
					$(this).find('li').each(function(){
						numeroWebtomAbas++;
						
						var aba = $('<div/>');
						$(aba).html($(this).clone().html());
						$(this).html('<a href="#aba'+numeroWebtomAbas+'" data-toggle="tab"> '+$(this).attr('name')+' </a>');
						
						$(aba).addClass('tab-pane fade');
						
						if($(this).hasClass('ativa')){
							$(this).addClass('active');
							$(aba).addClass('active in');
						}
						
						$(aba).attr('id','aba'+numeroWebtomAbas);
						
						$(content).append(aba);
						
					});
					
					$(this).after(content); 
					
				});
				
				
				//webtom-menu-hover
				$(divPai).find('ul.webtom-menu-hover').each(function(){
					
					var ul = $(this).clone();
					//$(this).remove();
					var div = $('<div class="btn-group">'
							+'<a class="btn default yellow-stripe" href="#" data-toggle="dropdown" data-hover="dropdown" >' 
							+'<i class="icon-control-play"></i> Operações <i class="fa fa-angle-down"></i>'
							+'</a>');
					$(ul).addClass('dropdown-menu pull-right');
					$(div).append(ul);
					$(ul).find('li[onclick]').each(function(){
						
						var onclick = $(this).attr('onclick');
						$(this).attr('onclick', '');
						var html = $(this).html();
						$(this).html('<a href="javascript:;" onclick="'+onclick+'">'+html+'</a>');
						
					});
					$(this).after(div);
					$(this).remove();
				});
				
				
				//templates para form
				$(divPai).find('.webtom-form1').addClass('form-horizontal');
				$(divPai).find('.webtom-form2').each(function(){
					$(this).addClass('formLeitura');
					$(this).find('span').addClass('form-control-static');
					$(this).find('label').addClass('control-label');
				});
				$(divPai).find('form > .form-acoes').addClass('form-actions'); 
					
				$("form").prepend(
		        	'<div class="alert alert-danger hidden"> '
						+'<button class="close" data-close="alert"></button>'
						+'Erros detectados, por favor verifique:'
						+'<div id="erros"></div>'
					+'</div>');
					
				
				
				//div para responvidade em tables
				$(divPai).find('table').each(function(){
					var parent = $(this).parent();
					var tab = $(this).clone(true);
					$(this).remove();
					$(parent).append('<div class="table-scrollable"></div>');
					$(parent).find('.table-scrollable').append(tab);
				});
				
				//padroes para modal/popup
				$(divPai).find('.modal').each(function(){
					$(this).attr("tabindex","-1");
					$(this).addClass("modal fade");
					var name = $(this).attr('data-header');
					if(!valida(name))
						name = "Webtom Modal";
					var content = $(this).html();
					$(this).html('<div class="modal-body"></div>');

					
					
					var header = $("<div/>");
					$(header).addClass("modal-header");
					$(header).html('<button type="button" class="close" data-dismiss="modal" >&times;</button>'
							+'<h4 class="modal-title">'
								+name
							+'</h4>');
					$(this).prepend(header);
					
					$(this).find(".modal-body").append(content);
					
					$(this).append('<div class="modal-footer"></div>');
					
				});
				
				//define estrtura para checkboxs e radio personalizados
				$(divPai).find('input[type="checkbox"], input[type="radio"]').each(function(){
					$(this).replaceWith(' <label class="w3-checkbox" > '
							+this.outerHTML+'<div class="w3-checkmark"></div>' 
						  +'</label>');
				});
				
				//icone de ordenacao em th que chama ordenar
				// sincroniza alinhamento definido no cabecalho para 
				// os conteúdos corrrespondentes na tr tipo D
				var index = 0;
				$(divPai).find('tr.heading > th').each(function(){
					
					if(valida($(this).attr('data-ordena'))){
						var html = $(this).html();
						$(this).append('&nbsp;<i class="fa fa-sort"></i>');
						$(this).css({'cursor' : 'pointer'});
					}
					
					var trHead = $(this).parent('tr');
					var trDetalhe = $(this).closest('table').find('.wtLoop').eq(0);
					
					var alignDetalhe = "";
					if($(this).hasClass('center')){
						alignDetalhe = "center"
					}else if ($(this).hasClass('right')){
						alignDetalhe = "right"
					}
					
					var colspan = 1;
					if(valida($(this).attr('colspan'))){
						colspan = $(this).attr('colspan');
					}
					
					for(var i=0; i < colspan; i++){
						var td = $(trDetalhe).children().eq(index);
						if(!$(td).hasClass('center') && !$(td).hasClass('right') && !$(td).hasClass('left') &&
								$(td).find('.w3-checkbox').length==0)
							$(td).addClass(alignDetalhe);
						index += 1;
					}
					
				});
				
				
				// inclusao automatica de filtros [2] usando class "filter2" no filtro [1]
				$(divPai).find('tr.filter > td > input[vwebtom*="[1]"], select[vwebtom*="[1]"]').each(function(){
					
					$(this).attr('onchange', 'executa(this)');
					if($(this).hasClass('filter2')){
						var elemento = $(this).clone(true);
						var vg = elemento.attr('vwebtom');
						vg = vg.replace("[1]", "[2]");
						elemento.attr('vwebtom', vg);
						$(this).parent().append(elemento);
					}
						
				});
				
				
				//aplica class form-control para inputs, selects, textarea
				// exceto para elementos que tiverem classe "!padrao"
				$(divPai).find('input[type!="checkbox"][type!="radio"], select, textarea').each(function(){
					if(!$(this).hasClass("form-control") )
						$(this).addClass("form-control");
				});
				
				
				$(divPai).find('table').each(function(){
					var classes = " ";
					
					//modelo default aplicado para table sem classe ou usando classe tabwebtomA
					if(!valida($(this).attr('class')) || $(this).hasClass("webtom-tab1")){
						classes += "table table-bordered table-hover";
					}
					//criar aqui condicoes para outros modelos
					
					$(this).attr('class', $(this).attr('class') + classes);
					
				});
				
				classeCor = "green" // para cor dos compoenentes de acordo com a aplicacao
				
				// aplica a cor dos componentes de acordo com a aplicacao
				// exceto para os que tiverem classe "!padrao"
				$(divPai).find('.webtom-color').addClass(classeCor);
				
				
				//classe default botoes - btn, exceto em fechar modal
				// classe default tamanho de botao - btn-sm
				// para botao em table tamanho default - btn-xs
				$(divPai).find('button').each(function(){
					if(!$(this).hasClass('close')){
						$(this).addClass('btn');
						if(!$(this).hasClass('btn-xs') && !$(this).hasClass('btn-sm') 
								&& !$(this).hasClass('btn-md') && !$(this).hasClass('btn-lg')){
							
							//tamanho default dos botoes
							if($(this).closest('table').length > 0){
								$(this).addClass('btn-xs'); // em listagem
							} else if($(this).closest('div.form-actions').length > 0){
								$(this).addClass('btn-md'); // botoes de formularios 
							}else{
								$(this).addClass('btn-sm'); // outros
							}
						}
							
					}
						
					if(!valida($(this).attr('type')))
						$(this).attr('type','button');
				});
				
				// classe default para label
				$(divPai).find('label:not([class])').addClass('control-label');
				
				//icones padrao para botoes
				$(divPai).find('button.webtom-print').append('<i class="icon-printer"></i>');
				$(divPai).find('button.webtom-pesquisa').append('<i class="fa fa-search"></i>');
				$(divPai).find('button.webtom-rotina').append('<i class="icon-control-play"></i>');
				$(divPai).find('button.webtom-detalhe').append('<i class="icon-info"></i>');
				$(divPai).find('button.webtom-add').append('<i class="fa fa-plus"></i>');
				$(divPai).find('button.webtom-salva').append('<i class="fa fa-save"></i>');
				$(divPai).find('button.webtom-lixeira').append('<i class="fa fa-trash-o"></i>');
				$(divPai).find('button.webtom-informa').append('<i class="fa fa-pencil"></i>');
				
				$(divPai).find('i.webtom-print').addClass('icon-printer');
				$(divPai).find('i.webtom-pesquisa').addClass('fa fa-search');
				$(divPai).find('i.webtom-rotina').addClass('icon-control-play');
				$(divPai).find('i.webtom-detalhe').addClass('icon-info');
				$(divPai).find('i.webtom-add').addClass('fa fa-plus');
				$(divPai).find('i.webtom-salva').addClass('fa fa-save');
				$(divPai).find('i.webtom-lixeira').addClass('fa fa-trash-o');
				$(divPai).find('i.webtom-informa').addClass('fa fa-pencil');

				//classes para botoes de chamada de modal
				$(divPai).find('.webtom-modal-novo').each(function(){
					$(this).addClass('btn-xs');
					$(this).attr('data-toggle','modal');
					$(this).attr('onclick', 'Webtom.modal.cadastrar(this)');
					$(this).append('<i class="fa fa-plus"></i>');
				});
				
				$(divPai).find('.webtom-modal-edita').each(function(){
					$(this).addClass('btn-xs');
					$(this).attr('data-toggle','modal');
					$(this).attr('onclick', 'Webtom.modal.editar(this)');
					$(this).append('<i class="fa fa-edit"></i>');
				});
				
				$(divPai).find('.webtom-modal-altera').each(function(){
					$(this).addClass('btn-xs');
					$(this).attr('data-toggle','modal');
					$(this).attr('onclick', 'alterarRegistroTabela(this)');
					$(this).append('<i class="fa fa-edit"></i>');
				});
				
				$(divPai).find('.webtom-modal-consulta').each(function(){
					$(this).addClass('btn-xs');
					$(this).attr('data-toggle','modal');
					$(this).attr('onclick', 'consultarRegistro(this)');
					$(this).append('<i class="fa fa-search"></i>');
				});
				
				
				
				//efeito esconde mostra linha filtro
				if( valida($('tr.filter'))){
					
					$(divPai).find('tr.filter').each(function(){
						
						$(this).closest('div.portlet').find('.portlet-title > .actions')
							.prepend('<a class="btn green-haze" title="Mostrar/Esconder Filtros" onClick="Webtom.table.filter(this);">'
									+'<i class="fa fa-filter" ></i>'
									+'</a>');
						
					var paddOriginal = $(this).children('td').css("padding").match(/\d+/);
					$(this).attr('padding-original',paddOriginal);
					
					 $(this).addClass("oculta");
					         $('tr.filter')
					         .children('td')
					         .animate({ padding: 0 })
					         .children()
					         .slideUp(200);
					         
					});
				}
			} 
			
		}
		
		
	}();
	
	app.table = function(){
		
		return{

			filter : function(elem){
				
				var table = $(elem).closest('div.portlet').find('table');
				
				var linhaFiltro = $(table).find('tr.filter');
				paddingOriginal = $(linhaFiltro).attr('padding-original');
				console.log(paddingOriginal);
				
				 if ($(linhaFiltro).hasClass("oculta")) {
			         $(linhaFiltro).removeClass("oculta").addClass("mostra");
			         $(linhaFiltro).children('td').animate({ padding: paddingOriginal })
			         	.children().slideDown(200);
			     } else {
			         $(linhaFiltro).removeClass("mostra").addClass("oculta");
			         $(linhaFiltro).children('td').animate({ padding: 0 })
			         	.children().slideUp(200);
			     }
			}
			
		}
		
		
	}();
	
	return {
		
		crud		: app.crud,
		modal		: app.modal,
		form		: app.form,
		table		: app.table,
		studioplay	: app.studioplay
	
	}
}();

$(document).ready(function(){
	
	Webtom.form.patterns();
	
	$("[data-filtro]").on( "change", function() {
		Webtom.crud.get($(this).closest('[data-lista]'));          
	});
	$( "[data-ordena]" ).on( "click", function() {
		Webtom.form.ordena($(this).closest('[data-lista]'), this);
	});
	
//	$.extend(FormSerializer.patterns, {
//		  validate: /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
//	});
	

	//example: allow hyphen in keys
	$.extend(FormSerializer.patterns, {
	  validate: /^[a-z][a-z0-9_.]*(?:\[(?:\d*|[a-z0-9_.]+)?:\])*$/i,
	  key:      /[a-z0-9_]+|(?=\[\])/gi,
	  named:    /^[a-z0-9_]+$/i
	});
	
	$('[title]').tooltip();

	$('input[type!=reset]').addClass('form-control');


	$("input[name*='data']").datepicker({
		dateFormat : 'dd/mm/yy'
	});

	$('input[name=cpf]').mask('000.000.000-00', {
		reverse : true
	});

	$('input[name=valor]').mask('#########0.00', {
		reverse : true
	});

	$('input[name*="data"], input.data').mask('00/00/0000');

	$('.hora, input[name*="inicio"], input[name*="duracao"], input[name*="termino"]').mask('00:00');

	$('input[name*="cep"]').mask('00000-000');
	
	$('select[data-lista]').each(function(){
		$(this).append('<option value=""> </option>');
		var rotulo = $(this).attr('data-rotulo');
		if(valida(rotulo))
			$(this).append('<option class="wtLoop" value=" ">'+rotulo+'</option>'); 
	});
	Webtom.crud.get($(document).find('[data-lista]'));
});