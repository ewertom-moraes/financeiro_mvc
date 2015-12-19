package br.com.golsoftware.financeiro.dominio.modelo.titulo;

import javax.persistence.Embeddable;

@Embeddable
public class Parcela {

	private Long numero;
	private Long total;

	public Long getNumero() {
		return numero;
	}

	public void setNumero(Long numero) {
		this.numero = numero;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

}
