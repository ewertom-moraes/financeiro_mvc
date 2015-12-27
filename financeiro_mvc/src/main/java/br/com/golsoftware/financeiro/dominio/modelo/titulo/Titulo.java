package br.com.golsoftware.financeiro.dominio.modelo.titulo;

import java.math.BigDecimal;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.golsoftware.financeiro.dominio.modelo.ModeloGol;
import br.com.golsoftware.financeiro.dominio.modelo.entidade.Entidade;
import br.com.golsoftware.financeiro.dominio.modelo.grupodespesa.GrupoDespesa;

@Entity
@Table(indexes = { @Index(columnList = "fornecedor_id"),
		@Index(columnList = "dataVencimento"), @Index(columnList = "tipo") })
public class Titulo extends ModeloGol{

	@NotNull
	private TipoTitulo tipo;

	@NotNull
	private String numeroDocumento;
	
	private SituacaoTitulo situacao;

	private String descricao;

	private Documento documento;

	@NotNull
	@ManyToOne
	private Entidade fornecedor;

	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Calendar dataEmissao;

	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Calendar dataVencimento;

	private Boolean recorrente;

	private Parcela parcelado;

	@NotNull
	private BigDecimal valor;
	
	private BigDecimal saldo;

	@NotNull
	@ManyToOne
	private GrupoDespesa grupoDespesa;

	public TipoTitulo getTipo() {
		return tipo;
	}

	public void setTipo(TipoTitulo tipo) {
		this.tipo = tipo;
	}

	public SituacaoTitulo getSituacao() {
		return situacao;
	}

	public void setSituacao(SituacaoTitulo situacao) {
		this.situacao = situacao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Documento getDocumento() {
		return documento;
	}

	public void setDocumento(Documento documento) {
		this.documento = documento;
	}

	public Entidade getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Entidade fornecedor) {
		this.fornecedor = fornecedor;
	}

	public Calendar getDataEmissao() {
		return dataEmissao;
	}

	public void setDataEmissao(Calendar dataEmissao) {
		this.dataEmissao = dataEmissao;
	}

	public Calendar getDataVencimento() {
		return dataVencimento;
	}

	public void setDataVencimento(Calendar dataVencimento) {
		this.dataVencimento = dataVencimento;
	}

	public Boolean getRecorrente() {
		return recorrente;
	}

	public void setRecorrente(Boolean recorrente) {
		this.recorrente = recorrente;
	}

	public Parcela getParcelado() {
		return parcelado;
	}

	public void setParcelado(Parcela parcelado) {
		this.parcelado = parcelado;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public GrupoDespesa getGrupoDespesa() {
		return grupoDespesa;
	}

	public void setGrupoDespesa(GrupoDespesa grupoDespesa) {
		this.grupoDespesa = grupoDespesa;
	}

	public String getNumeroDocumento() {
		return numeroDocumento;
	}

	public void setNumeroDocumento(String numeroDocumento) {
		this.numeroDocumento = numeroDocumento;
	}

	public BigDecimal getSaldo() {
		return saldo;
	}

	public void setSaldo(BigDecimal saldo) {
		this.saldo = saldo;
	}

	
	
	
}
