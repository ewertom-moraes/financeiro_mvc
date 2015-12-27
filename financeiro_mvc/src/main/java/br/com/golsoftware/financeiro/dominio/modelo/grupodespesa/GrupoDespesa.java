package br.com.golsoftware.financeiro.dominio.modelo.grupodespesa;

import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;

import br.com.golsoftware.financeiro.dominio.modelo.ModeloGol;

@Entity
public class GrupoDespesa extends ModeloGol{

	private String codigo;
	private String descricao;

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

}
