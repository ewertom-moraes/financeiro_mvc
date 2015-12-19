package br.com.golsoftware.financeiro.infraestrutura.persistencia;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import br.com.golsoftware.financeiro.infraestrutura.web.Requisicao;

@NoRepositoryBean
public interface MyRepository<T, ID extends Serializable> extends JpaRepository<T, ID>{

	<S extends T> S merge(S novo, String campos, ID id);
	
	<T> List<T> get(Requisicao r, Class<T> obj); 
	
}
