package br.com.golsoftware.financeiro.dominio.modelo.grupodespesa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class GrupoDespesaValidator implements Validator{

	private GrupoDespesaRepository repository;
	
	@Autowired
	public GrupoDespesaValidator(GrupoDespesaRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return GrupoDespesa.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		
	}
}