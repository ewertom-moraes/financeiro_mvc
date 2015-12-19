package br.com.golsoftware.financeiro.dominio.modelo.titulo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TituloRepository extends JpaRepository<Titulo, Long> {
	
	@Query("select t from Titulo t where t.tipo = br.com.golsoftware.financeiro.dominio.modelo.titulo.TipoTitulo.A_PAGAR")
	public List<Titulo> aPagar();
	
	@Query("select t from Titulo t where t.tipo = br.com.golsoftware.financeiro.dominio.modelo.titulo.TipoTitulo.A_RECEBER")
	public List<Titulo> aReceber();
	
	@Query("select t from Titulo t where t.dataVencimento < CURRENT_DATE")
	public List<Titulo> vencidos();
	
	@Query("select t from Titulo t where t.dataVencimento = CURRENT_DATE")
	public List<Titulo> vencendoHoje();

}
