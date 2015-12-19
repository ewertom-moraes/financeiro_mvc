package br.com.golsoftware.financeiro.infraestrutura.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

@Component
public class Resposta {

	public Resposta(){}
	
	private List<String> erros = new ArrayList<String>();
	private List<String> mensagens = new ArrayList<String>();
	
	
	public void setErros(BindingResult result){
		for(ObjectError erro :  result.getAllErrors()){
			this.getErros().add(erro.getDefaultMessage());
		}
	}
	
	
	public List<String> getMensagens() {
		return mensagens;
	}

	public void setMensagens(List<String> mensagens) {
		this.mensagens = mensagens;
	}

	public List<String> getErros() {
		return erros;
	}

	public void setErros(List<String> erros) {
		this.erros = erros;
	}
	
	
}
