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
	
		<div class="modal" data-header="Entidade" id="titulo"  data-width="800">
			<form id="titulo" >
				<input type="hidden" name="id" >
				<div class="row">
					<div class="col-md-2">
						<label>Entidade</label>
					</div>
					<div class="col-md-8">
						<select name="fornecedor.id" data-lista="entidade" data-rotulo="wt{nome}" ></select>
					</div>
				</div>
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
						<label>Nº Documento</label>
					</div>
					<div class="col-md-4">
						<input name="numeroDocumento" >
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
		
		<div class="panel panel-default">
			<div class="panel-heading">
				<div class="panel-title">
					Títulos
				</div>
			</div>
			<div class="panel-body">
		
			<table data-lista="titulo">
				<thead>
				<tr class="heading">
					<th><button class="webtom-modal-novo" ></button></th>
					<th data-ordena="fornecedor.nome">Entidade</th>
					<th data-ordena="tipo" >Tipo</th>
					<th data-ordena="situacao">Situação</th>
					<th data-ordena="numeroDocumento">N Documento</th>
					<th data-ordena="valor">Valor</th>
				 	<th data-ordena="dataEmissao">emissao</th>
					<th data-ordena="dataVencimento">vencimento</th>
					<th data-ordena="grupoDespesa.codigo">grupo</th>
				</tr>
				<tr>
					<td></td>
					<td><input data-filtro="fornecedor like2" ></td>
					<td><input data-filtro="tipo like2" ></td>
					<td><input data-filtro="situacao like2"  ></td>
					<td><input data-filtro="numeroDocumento like2"  ></td>
					<td><input data-filtro="valor de"  ></td>
					<td><input data-filtro="dataEmissao de" ></td>
					<td><input data-filtro="dataVencimento de" ></td>
					<td><input data-filtro="grupoDespesa.descricao like2" ></td>
				</tr>
				<tr>
					<td colspan="5"></td>
					<td><input data-filtro="valor ate"  ></td>
					<td><input data-filtro="dataEmissao ate" ></td>
					<td><input data-filtro="dataVencimento ate" ></td>
					<td></td>
				</tr>
				</thead>
				<tbody>
				<tr class="wtLoop" >
					<td><button class="webtom-modal-edita" ></button></td>
					<td>wt{fornecedor.nome}</td>
					<td>wt{tipo}</td>
					<td>wt{situacao}</td>
					<td>wt{numeroDocumento}</td>
					<td>wt{valor}</td>
					<td>wt{dataEmissao}</td>
					<td>wt{dataVencimento}</td>
					<td>wt{grupoDespesa.codigo} wt{grupoDespesa.descricao} </td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
	</div>
	<%@include file="../footer.jsp"%> 
	
</body>
</html>