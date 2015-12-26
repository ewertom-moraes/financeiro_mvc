package br.com.golsoftware.financeiro.infraestrutura.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AutorizadorInterceptor  extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest request, 
			HttpServletResponse response, Object controller) throws Exception {
		
		String uri = request.getRequestURI();
		if(uri.equals("/financeiro_mvc/api/login/") || uri.contains("resources")
				|| uri.contains("efetuaLogin")) {
			return true;
		}
		
		if(request.getSession().getAttribute("usuarioGol")!=null) {
			return true;
		} else {
			//response.sendRedirect("loginForm");
			//response.sendError(403, "Sua sessão expirou! Por favor efetue login novamente.");
			//return false;
			return true;
		}
		
	}
	
	@Override
	public void postHandle(	HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
		HandlerMethod metodo = (HandlerMethod) handler;
		System.out.println("---Request Execute---");
		}
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
			Object handler, Exception ex) throws Exception {
		System.out.println("---Request Completed---");
	}
	
}
