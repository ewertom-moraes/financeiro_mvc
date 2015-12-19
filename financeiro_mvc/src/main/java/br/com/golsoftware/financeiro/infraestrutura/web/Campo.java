package br.com.golsoftware.financeiro.infraestrutura.web;

import java.util.ArrayList;
import java.util.List;

public class Campo {

	private String nome;
	private String valor;
	private String tipo = "";
	private List<Filtro> filtros = new ArrayList<Filtro>();
	private String ordenacao = "";
	
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public List<Filtro> getFiltros() {
		return filtros;
	}
	public void setFiltros(List<Filtro> filtros) {
		this.filtros = filtros;
	}
	public String getOrdenacao() {
		return ordenacao;
	}
	public void setOrdenacao(String ordenacao) {
		this.ordenacao = ordenacao;
	}
	
}