package br.com.golsoftware.financeiro.dominio.modelo.baixa;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import br.com.golsoftware.financeiro.dominio.modelo.titulo.SituacaoTitulo;
import br.com.golsoftware.financeiro.dominio.modelo.titulo.TituloRepository;

public class BaixaValidator implements Validator{

	private BaixaRepository repository;
	private TituloRepository tituloRepository;
	
	@Autowired
	public BaixaValidator(BaixaRepository repository, TituloRepository tituloRepository) {
		this.repository = repository;
		this.tituloRepository = tituloRepository;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return Baixa.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		Baixa baixa = (Baixa) target;
		
		// instancia o titulo
		baixa.setTitulo(tituloRepository.findOne(baixa.getTitulo().getId()));
		
		BigDecimal novoSaldo = baixa.getTitulo().getSaldo().subtract(baixa.getValor()); 
		if (novoSaldo.doubleValue() < 0){
			errors.reject("baixa.saldoNegativo");
		} else {
			baixa.getTitulo().setSaldo(novoSaldo);
			if(baixa.getTitulo().getSaldo().intValue() == 0){
				baixa.getTitulo().setSituacao(SituacaoTitulo.BAIXADO);
			}
			tituloRepository.save(baixa.getTitulo());
		}
	}
}