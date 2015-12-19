package br.com.golsoftware.financeiro.aplicacao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.golsoftware.financeiro.dominio.modelo.entidade.Entidade;
import br.com.golsoftware.financeiro.dominio.modelo.entidade.EntidadeRepository;

@RestController
@RequestMapping(value = "/entidades")
public class EntidadeController {

	private EntidadeRepository entidades;

	@Autowired
	public EntidadeController(EntidadeRepository entidades) {
		this.entidades = entidades;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Entidade> todas() {
		return entidades.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Entidade porId(@PathVariable Long id) {
		return entidades.findOne(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void salvar(@RequestBody Entidade entidade) {
		entidades.save(entidade);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void atualizar(@PathVariable Long id, @RequestBody Entidade entidade) {
		entidades.save(entidade);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void excluir(@PathVariable Long id) {
		entidades.delete(id);
	}

}
