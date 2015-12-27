
<%@page import="java.net.URL"%>
<%
URL contextoURL = new URL(request.getScheme(), 
	        request.getServerName(), 
	        request.getServerPort(), 
	        request.getContextPath());
String contexto = contextoURL.toString();
String contextoSis = contextoURL.toString() + "/api/";
%>

<!-- TEMA APLICADO -->
<link href="<%=contexto%>/resources/bootstrap/css/flaty.bootstrap.css" type="text/css" rel="stylesheet" />

<link href="<%=contexto%>/resources/bootstrap/css/bootstrap-modal.css" type="text/css" rel="stylesheet" />
<link href="<%=contexto%>/resources/bootstrap/css/bootstrap-modal-path.css" type="text/css" rel="stylesheet" />
<link href="<%=contexto%>/resources/bootstrap/css/bootstrap-custom.css" type="text/css" rel="stylesheet" />
<link href="<%=contexto%>/resources/fontawesome/css/font-awesome.min.css" type="text/css" rel="stylesheet" />
<link href="<%=contexto%>/resources/css/jquery-ui.min.css" type="text/css" rel="stylesheet" />

<link href="<%=contexto%>/resources/css/webtom/webtom.css" type="text/css" rel="stylesheet" />

<!-- PLUGINS -->
<%-- <link href="<%=contexto%>/resources/plugins/jquery.countdown/jquery.countdown.css" type="text/css" rel="stylesheet" /> --%>

<script>
	var CONTEXTO = '<%=contexto%>/api/';
</script>





<nav class="navbar navbar-inverse">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#"></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
<!--         <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li> -->

		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Entidade <span class="caret"></span></a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="<%=contextoSis%>/entidade/planilha">Planilha</a></li>
			</ul>
		</li>
		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Titulo <span class="caret"></span></a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="<%=contextoSis%>/titulo/planilha">Planilha</a></li>
				<li><a href="<%=contextoSis%>/titulo/porEntidade">Por Entidade</a></li>
				<li><a href="<%=contextoSis%>/baixa/informarBaixa">Informar Baixa</a></li>
			</ul>
		</li>
		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Tabelas <span class="caret"></span></a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="<%=contextoSis%>/grupoDespesa/planilha">Grupo Despesa</a></li>
			</ul>
		</li>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Opções<span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="javascript:" >Trocar Senha</a></li>
            <li><a href="javascript:" onclick="logout()">Sair</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>