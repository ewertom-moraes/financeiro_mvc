package br.com.golsoftware.financeiro.dominio.modelo.entidade;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.br.CNPJ;
import org.hibernate.validator.constraints.br.CPF;

@Entity
@SequenceGenerator(name = "entidade_sequence", sequenceName = "sq_entidade")
public class Entidade {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entidade_sequence")
	private Long id;

	private String nome;
	
	@Email
	private String email;
	
	private Endereco endereco;
	private TipoEntidade tipo;
	
	@CPF
	private String cpf;
	
	@CNPJ
	private String cnpj;
	private DadosBancarios dadosBancarios;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public TipoEntidade getTipo() {
		return tipo;
	}

	public void setTipo(TipoEntidade tipo) {
		this.tipo = tipo;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public DadosBancarios getDadosBancarios() {
		return dadosBancarios;
	}

	public void setDadosBancarios(DadosBancarios dadosBancarios) {
		this.dadosBancarios = dadosBancarios;
	}

}
