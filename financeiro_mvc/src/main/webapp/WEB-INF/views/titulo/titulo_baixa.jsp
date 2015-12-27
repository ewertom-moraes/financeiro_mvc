<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Cadastro de Titulos</title>
</head>
<body>

	<%@include file="../header.jsp"%> 
	
	<div class="container">
	
	<div class="panel panel-default">
	<div class="panel-heading">
		<div class="panel-title">
			Entidade
		</div>
	</div>
	<div class="panel-body">
		<div class="row">
			<div class="col-md-2">
				<label>Entidade</label>
			</div>
			<div class="col-md-10">
				<select data-lista="entidade" data-rotulo="wt{nome}" 
				onchange="Webtom.crud.getRelacao($('#titulosEntid'), this.value)" ></select>
			</div>
		</div>
	</div>
	</div>	
	
		<div class="panel panel-default">
		<div class="panel-heading">
			<div class="panel-title">
				Titulo
			</div>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-2">
					<label>Titulos</label>
				</div>
				<div class="col-md-8">
					<select id="titulosEntid" data-lista="titulo/titulosEntidade" 
					data-args="/0/"  data-rotulo="wt{numeroDocumento} wt{valor}"
					onchange="Webtom.crud.getOne(this.value, 'titulo'); $('#id_titulo').val(this.value);"></select>
				</div>
			</div>
			<hr>
		
			<form id="titulo">
				<input type="hidden" name="id" >
				<div class="row">
					<div class="col-md-2">
						<label>Tipo</label>
					</div>
					<div class="col-md-4">
						<select name="tipo" >
							<option value="A_RECEBER">A Receber</option>
							<option value="A_PAGAR">A Pagar</option>
						</select>
					</div>
					<div class="col-md-2">
						<label>Situação</label>
					</div>
					<div class="col-md-4">
						<select name="situacao" >
							<option value="NORMAL">Normal</option>
							<option value="BAIXADO">Baixado</option>
							<option value="CANCELADO">Cancelado</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Numero Documento</label>
					</div>
					<div class="col-md-4">
						<input name="documento" >
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Valor</label>
					</div>
					<div class="col-md-4">
						<input name="valor" >
					</div>
					<div class="col-md-2">
						<label>Saldo</label>
					</div>
					<div class="col-md-4">
						<input name="saldo" >
					</div>
				</div> 
				<div class="row">
					<div class="col-md-2">
						<label>Emissão</label>
					</div>
					<div class="col-md-4">
						<input name="dataEmissao" >	
					</div>
					<div class="col-md-2">
						<label>Vencimento</label>
					</div>
					<div class="col-md-4">
						<input name="dataVencimento" >	
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Grupo</label>
					</div>
					<div class="col-md-4">
						<select name="grupoDespesa.id" data-lista="grupoDespesa" data-rotulo="wt{codigo} wt{descricao}" ></select>
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Descrição</label>
					</div>
					<div class="col-md-4">
						<input name="descricao" >	
					</div>
				</div>
			</form>
			</div>
		</div>
		
		<div class="panel panel-default">
		<div class="panel-heading">
			<div class="panel-title">
				Informar Baixa
			</div>
		</div>
		<div class="panel-body">
			<form id="baixa">
				<input type="hidden" name="id" >
				<input type="hidden" name="titulo.id" id="id_titulo">
				<div class="row">
					<div class="col-md-2">
						<label>Numero Documento</label>
					</div>
					<div class="col-md-4">
						<input name="documento" >
					</div>
					<div class="col-md-2">
						<label>Valor</label>
					</div>
					<div class="col-md-4">
						<input name="valor" >
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Data Baixa</label>
					</div>
					<div class="col-md-4">
						<input name="dataBaixa" >
					</div>
					<div class="col-md-2">
						<label>Data Credito</label>
					</div>
					<div class="col-md-4">
						<input name="dataCredito" >
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Observação</label>
					</div>
					<div class="col-md-4">
						<input name="observacao" >
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<button type="button" onclick="Webtom.crud.post(this.form)">Inserir Baixa</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<%@include file="../footer.jsp"%> 
	<script>
		$('form#titulo').find('input, select').attr('readonly','readonly');
	</script>
</body>
</html>