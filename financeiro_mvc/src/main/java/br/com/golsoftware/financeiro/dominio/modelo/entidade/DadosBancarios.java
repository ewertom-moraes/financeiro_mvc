package br.com.golsoftware.financeiro.dominio.modelo.entidade;

import javax.persistence.Embeddable;

@Embeddable
public class DadosBancarios {

	private String nomeBanco;
	private String agencia;
	private String contaCorrente;

	public String getNomeBanco() {
		return nomeBanco;
	}

	public void setNomeBanco(String nomeBanco) {
		this.nomeBanco = nomeBanco;
	}

	public String getAgencia() {
		return agencia;
	}

	public void setAgencia(String agencia) {
		this.agencia = agencia;
	}

	public String getContaCorrente() {
		return contaCorrente;
	}

	public void setContaCorrente(String contaCorrente) {
		this.contaCorrente = contaCorrente;
	}

}
