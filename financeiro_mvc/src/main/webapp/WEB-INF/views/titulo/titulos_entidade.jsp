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
				onchange="Webtom.crud.getRelacao($('#titrelacao'), this.value)" ></select>
			</div>
		</div>
	</div>
	</div>	
	
		<div class="panel panel-default">
			<div class="panel-heading">
				<div class="panel-title">
					Títulos da Entidade
				</div>
			</div>
			<div class="panel-body">
		
			<table data-lista="titulo/titulosEntidade" id="titrelacao" data-args="/0/">
				<thead>
				<tr class="heading">
<!-- 					<th><button class="webtom-modal-novo" ></button></th> -->
					<th data-ordena="fornecedor.nome" class="right">Entidade</th>
					<th data-ordena="tipo" >Tipo</th>
					<th data-ordena="situacao">Situação</th>
					<th data-ordena="numeroDocumento">N Documento</th>
					<th data-ordena="valor">Valor</th>
				 	<th data-ordena="dataEmissao">emissao</th>
					<th data-ordena="dataVencimento">vencimento</th>
					<th data-ordena="grupoDespesa.codigo">grupo</th>
				</tr>
				<tr>
<!-- 					<td></td> -->
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
<!-- 					<td><button class="webtom-modal-edita" ></button></td> -->
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