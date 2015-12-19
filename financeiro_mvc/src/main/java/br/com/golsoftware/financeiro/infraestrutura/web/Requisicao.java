package br.com.golsoftware.financeiro.infraestrutura.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Requisicao {
	
	private String id;
	private String entidade;
	private List<Campo> campos = new ArrayList<Campo>();
	private Object objeto;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEntidade() {
		return entidade;
	}
	public void setEntidade(String entidade) {
		this.entidade = entidade;
	}
	public List<Campo> getCampos() {
		return campos;
	}
	public void setCampos(List<Campo> campos) {
		this.campos = campos;
	}
	public Object getObjeto() {
		return objeto;
	}
	public void setObjeto(Object objeto) {
		this.objeto = objeto;
	}

	
	
}