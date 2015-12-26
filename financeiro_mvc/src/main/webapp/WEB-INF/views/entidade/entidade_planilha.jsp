<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Cadastro de Entidades</title>
</head>
<body>

	<%@include file="../header.jsp"%> 
	
	<div class="container">
	
		<div class="modal" data-header="Entidade" id="entidade"  data-width="800">
			<form id="entidade" >
				<input type="hidden" name="id" >
				<div class="row">
					<div class="col-md-2">
						<label>Nome</label>
					</div>
					<div class="col-md-6">
						<input name="nome" >
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Email</label>
					</div>
					<div class="col-md-4">
						<input name="email" >
					</div>
					<div class="col-md-2">
						<label>Tipo de Pessoa</label>
					</div>
					<div class="col-md-4">
						<select name="tipo" >
							<option value="FISICA">Física</option>
							<option value="JURIDICA">Jurídica</option>
						</select>	
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>CPF</label>
					</div>
					<div class="col-md-4">
						<input name="cpf" >	
					</div>
					<div class="col-md-2">
						<label>CNPJ</label>
					</div>
					<div class="col-md-4">
						<input name="cnpj" >	
					</div>
				</div>
			</form>
		</div>
		
		<table data-lista="entidade">
			<thead>
			<tr class="heading">
				<th><button class="webtom-modal-novo" ></button></th>
				<th data-ordena="id" class="right">Id</th>
				<th data-ordena="nome" >Nome</th>
				<th data-ordena="email">Email</th>
				<th data-ordena="banda.nome">Tipo</th>
				<th data-ordena="telefone">CPF</th>
				<th data-ordena="email">CNPJ</th>
			</tr>
			<tr>
				<td></td>
				<td><input data-filtro="id de"></td>
				<td><input data-filtro="nome like2" ></td>
				<td><input data-filtro="email like2" ></td>
				<td><input data-filtro="tipo like2"  ></td>
				<td><input data-filtro="cpf like2"  ></td>
				<td><input data-filtro="cnpj like2" ></td>
			</tr>
			</thead>
			<tbody>
			<tr class="wtLoop" >
				<td><button class="webtom-modal-edita" ></button></td>
				<td>wt{id}</td>
				<td>wt{nome}</td>
				<td><a href="mailto:wt{email}"> wt{email} </a></td>
				<td>wt{tipo}</td>
				<td>wt{cpf}</td>
				<td>wt{cnpj}</td>
			</tr>
			</tbody>
		</table>
	</div>
	
	<%@include file="../footer.jsp"%> 
	
</body>
</html>