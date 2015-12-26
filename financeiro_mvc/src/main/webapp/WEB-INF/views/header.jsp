
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
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Cadastros <span class="caret"></span></a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="banda.jsp">Bandas</a></li>
				<li><a href="musico.jsp">Musicos</a></li>
				<li><a href="genero.jsp">Generos</a></li>
				<li><a href="instrumento.jsp">Instrumentos</a></li>
				<li><a href="sala.jsp">Salas</a></li>
			</ul>
		</li>
		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Planilhas <span class="caret"></span></a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="<%=contextoSis%>/banda/planilha">Bandas</a></li>
				<li><a href="<%=contextoSis%>/musico/planilha">Musicos</a></li>
				<li><a href="<%=contextoSis%>/genero/planilha">Generos</a></li>
				<li><a href="<%=contextoSis%>/instrumento/planilha">Instrumentos</a></li>
				<li><a href="<%=contextoSis%>/sala/planilha">Salas</a></li>
				<li><a href="<%=contextoSis%>/ensaio/planilha">Ensaio</a></li>
			</ul>
		</li>
		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Consultas <span class="caret"></span></a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="musicos_banda.jsp">Musicos da Banda</a></li>
			</ul>
		</li>
        
        <li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Ensaios <span class="caret"></span></a>
        	<ul class="dropdown-menu" role="menu">
				 <li><a href="ensaio.jsp">Ensaios</a></li>
				 <li><a href="calendario_ensaios.jsp">Calendario de Ensaios</a></li>
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