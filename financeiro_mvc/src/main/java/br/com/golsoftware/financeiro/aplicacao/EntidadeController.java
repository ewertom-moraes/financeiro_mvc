package br.com.golsoftware.financeiro.aplicacao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import br.com.golsoftware.financeiro.dominio.modelo.entidade.Entidade;
import br.com.golsoftware.financeiro.dominio.modelo.entidade.EntidadeRepository;
import br.com.golsoftware.financeiro.dominio.modelo.entidade.EntidadeValidator;
import br.com.golsoftware.financeiro.infraestrutura.web.Requisicao;

@RestController
@RequestMapping(value = "/entidades")
public class EntidadeController {

	private EntidadeRepository entidades;
	
	@Autowired
	public EntidadeController(EntidadeRepository entidades) {
		this.entidades = entidades;
	}
	
	@InitBinder("entidade")
	protected void initBinder(WebDataBinder binder) {
	    binder.addValidators(new EntidadeValidator(entidades));
	}
	
	@RequestMapping(value="/planilha")
	public ModelAndView formPlanilha(){
		return new ModelAndView("entidades/entidade_planilha");
	}
	
	@RequestMapping( method = RequestMethod.GET)
	public List<Entidade> getEntidades(HttpServletRequest req, HttpServletResponse resp, Requisicao requisicao){
		return entidades.get(requisicao, Entidade.class);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Entidade porId(@PathVariable Long id) {
		return entidades.findOne(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void salvar(@Valid @RequestBody Entidade entidade) {
			entidades.save(entidade);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void atualizar(@Valid @RequestBody Entidade entidade,
			@PathVariable Long id, @RequestHeader(value="campos") String campos) {
		entidades.save(entidades.merge(entidade, campos, id));
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void excluir(@PathVariable Long id) {
		entidades.delete(id);
	}

}
