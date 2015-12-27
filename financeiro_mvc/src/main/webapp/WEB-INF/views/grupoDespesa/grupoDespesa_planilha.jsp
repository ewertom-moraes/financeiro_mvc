<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Cadastro de Grupo de Despesas</title>
</head>
<body>

	<%@include file="../header.jsp"%> 
	
	<div class="container">
	
		<div class="modal" data-header="Grupo de Despesa" id="grupoDespesa"  data-width="800">
			<form id="grupoDespesa" >
				<input type="hidden" name="id" >
				<div class="row">
					<div class="col-md-2">
						<label>Código</label>
					</div>
					<div class="col-md-4">
						<input name="codigo" >
					</div>
					<div class="col-md-2">
						<label>Descrição</label>
					</div>
					<div class="col-md-4">
						<input name="descricao" >
					</div>
				</div>
			</form>
		</div>
		
		<table data-lista="grupoDespesa">
			<thead>
			<tr class="heading">
				<th><button class="webtom-modal-novo" ></button></th>
				<th data-ordena="codigo" >Código</th>
				<th data-ordena="descricao" >Descrição</th>
			</tr>
			<tr>
				<td></td>
				<td><input data-filtro="codigo like2"></td>
				<td><input data-filtro="descricao like2" ></td>
			</tr>
			</thead>
			<tbody>
			<tr class="wtLoop" >
				<td><button class="webtom-modal-edita" ></button></td>
				<td>wt{codigo}</td>
				<td>wt{descricao}</td>
			</tr>
			</tbody>
		</table>
	</div>
	
	<%@include file="../footer.jsp"%> 
	
</body>
</html>