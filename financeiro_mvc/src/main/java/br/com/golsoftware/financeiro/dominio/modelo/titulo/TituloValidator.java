package br.com.golsoftware.financeiro.dominio.modelo.titulo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import br.com.golsoftware.financeiro.dominio.modelo.entidade.Entidade;

public class TituloValidator implements Validator{

	private TituloRepository repository;
	
	@Autowired
	public TituloValidator(TituloRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return Titulo.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		
		Titulo titulo = (Titulo) target;
		if(titulo.getId()==null){
			titulo.setSaldo(titulo.getValor());
		}
		
	}
}