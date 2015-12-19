package br.com.golsoftware.financeiro.dominio.modelo.entidade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class EntidadeValidator implements Validator{

	private EntidadeRepository repository;
	
	@Autowired
	public EntidadeValidator(EntidadeRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return Entidade.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		
	}
	
}