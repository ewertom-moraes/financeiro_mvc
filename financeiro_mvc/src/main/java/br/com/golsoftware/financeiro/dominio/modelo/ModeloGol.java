package br.com.golsoftware.financeiro.dominio.modelo;

import java.util.Calendar;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

@MappedSuperclass
public class ModeloGol {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
	
	//@ManyToOne
	//private Cliente cliente;
	
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
	private Calendar dataCadastro;
	
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
	private Calendar dataUltimaAtualizacao;
	
	
}
