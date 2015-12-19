package br.com.golsoftware.financeiro.infraestrutura.web;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.sitemesh.config.ConfigurableSiteMeshFilter;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class InicializadorWeb implements WebApplicationInitializer {

	public void onStartup(ServletContext servletContext)
			throws ServletException {

		AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
		ctx.register(ConfiguracaoWeb.class);

		ctx.setServletContext(servletContext);

		Dynamic servlet = servletContext.addServlet("dispatcher",
				new DispatcherServlet(ctx));
		servlet.addMapping("/api/*");
//		servlet.addMapping("/");
		servlet.setLoadOnStartup(1);

		
//		servletContext.addFilter("sitemesh", new ConfigurableSiteMeshFilter())
//				.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class),
//						true, "/*");
	}

}