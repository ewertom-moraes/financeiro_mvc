package br.com.golsoftware.financeiro.infraestrutura.persistencia;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import br.com.golsoftware.financeiro.infraestrutura.web.Requisicao;

@NoRepositoryBean
public class MyRepositoryImpl<T, ID extends Serializable>
extends SimpleJpaRepository<T, ID> implements MyRepository<T, ID> {

	@PersistenceContext
	private EntityManager entityManager;

	  // There are two constructors to choose from, either can be used.
	  public MyRepositoryImpl(Class<T> domainClass, EntityManager entityManager) {
	    super(domainClass, entityManager);

	    // This is the recommended method for accessing inherited class dependencies.
	    this.entityManager = entityManager;
	  }
	
	
	
	@SuppressWarnings("unchecked")
	public <S extends T> S  merge(S novo, String campos, ID id) {
		return (S) SqlUtil.merge(findOne(id), novo, campos);
	}

	
	public <T> List<T> get(Requisicao r, Class<T> obj) {
		
		String model = obj.getSimpleName();
		String m = model.substring(0, 1).toLowerCase();
		TypedQuery<T> query  = entityManager.createQuery("SELECT "+ m +" FROM " + model + " "+m+" "+ SqlUtil.get(r.getCampos()), obj);
		return query.getResultList();
	}

	
	
}
