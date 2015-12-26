<!-- <script src="/resources/js/jquery.1.9.1.min.js"></script> -->


<%@page import="java.net.URL"%>
<%
URL contextoFooterURL = new URL(request.getScheme(), 
	        request.getServerName(), 
	        request.getServerPort(), 
	        request.getContextPath());
String contextoFooter = contextoFooterURL.toString();
%>

<div class="modal" id="modalErro" name="Mensagens de Erro" data-width="700"></div>
<div class="modal" id="modalMensagem" name="Mensagens de Erro"></div>

<script>
	var APLICACAO = "";
</script>

<script src="<%=contextoFooter%>/resources/js/jquery-2.1.4.min.js"></script>
<script src="<%=contextoFooter%>/resources/js/jquery.fix.clone.js"></script>
<script src="<%=contextoFooter%>/resources/js/jquery_util.js"></script>
<script src="<%=contextoFooter%>/resources/js/jquery-ui.min.js"></script>
<script src="<%=contextoFooter%>/resources/js/jquery.mask.min.js"></script>
<script src="<%=contextoFooter%>/resources/js/jquery.serialize-object.js"></script>
<script src="<%=contextoFooter%>/resources/bootstrap/js/bootstrap.js"></script>
<script src="<%=contextoFooter%>/resources/bootstrap/js/bootstrap-modal.js"></script>
<script src="<%=contextoFooter%>/resources/bootstrap/js/bootstrap-modalmanager.js"></script>

<script src="<%=contextoFooter%>/resources/js/jquery.validate.min.js"></script>
<script src="<%=contextoFooter%>/resources/js/additional-methods.min.js"></script>
<script src="<%=contextoFooter%>/resources/js/messages_pt_BR.min.js"></script>
<script src="<%=contextoFooter%>/resources/js/jquery.validate.br.js"></script>

<script src="<%=contextoFooter%>/resources/js/webtom/webtom.js"></script>

<script src="<%=contextoFooter%>/resources/plugins/jquery.countdown/jquery.plugin.min.js"></script>
<script src="<%=contextoFooter%>/resources/plugins/jquery.countdown/jquery.countdown.min.js"></script>


<script>
var validator = $("form").validate({
	errorElement: 'span', //default input error message container
    errorClass: 'help-block help-block-error', // default input error message class
    ignoreTitle: true, // adicionado!
    focusInvalid: false, // do not focus the last invalid input
    invalidHandler: function (event, validator) { //display error alert on form submit              
       console("invalido");},
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
    submitHandler: function (form) {
    	console("submiteu");
    }
});
</script>
