package br.com.golsoftware.financeiro.dominio.modelo.baixa;

import java.math.BigDecimal;
import java.util.Calendar;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.golsoftware.financeiro.dominio.modelo.ModeloGol;
import br.com.golsoftware.financeiro.dominio.modelo.titulo.Titulo;

@Entity
public class Baixa extends ModeloGol{

	
	@NotNull
	@ManyToOne
	private Titulo titulo;
	
	@NotNull
	private BigDecimal valor;
	
	private String documento;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Calendar dataBaixa;

	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Calendar dataCredito;
	
	private String observacao;

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public Calendar getDataBaixa() {
		return dataBaixa;
	}

	public void setDataBaixa(Calendar dataBaixa) {
		this.dataBaixa = dataBaixa;
	}

	public Calendar getDataCredito() {
		return dataCredito;
	}

	public void setDataCredito(Calendar dataCredito) {
		this.dataCredito = dataCredito;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public Titulo getTitulo() {
		return titulo;
	}

	public void setTitulo(Titulo titulo) {
		this.titulo = titulo;
	}
	
	
	
}
