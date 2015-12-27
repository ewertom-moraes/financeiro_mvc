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

import br.com.golsoftware.financeiro.dominio.modelo.baixa.Baixa;
import br.com.golsoftware.financeiro.dominio.modelo.baixa.BaixaRepository;
import br.com.golsoftware.financeiro.dominio.modelo.baixa.BaixaValidator;
import br.com.golsoftware.financeiro.dominio.modelo.titulo.TituloRepository;
import br.com.golsoftware.financeiro.infraestrutura.web.Requisicao;

@RestController
@RequestMapping(value = "/baixa")
public class BaixaController {

	private BaixaRepository baixas;
	private TituloRepository TituloRepository;
	
	@Autowired
	public BaixaController(BaixaRepository baixas, TituloRepository tituloRepository) {
		this.baixas = baixas;
		this.TituloRepository = tituloRepository;
	}
	
	@InitBinder("baixa")
	protected void initBinder(WebDataBinder binder) {
	    binder.addValidators(new BaixaValidator(baixas, TituloRepository));
	} 
	
	@RequestMapping(value="/informarBaixa")
	public ModelAndView formPlanilha(){
		return new ModelAndView("titulo/titulo_baixa");
	}
	
	@RequestMapping( method = RequestMethod.GET)
	public List<Baixa> getBaixas(HttpServletRequest req, HttpServletResponse resp, Requisicao requisicao){
		return baixas.get(requisicao, Baixa.class);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Baixa porId(@PathVariable Long id) {
		return baixas.findOne(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void salvar(@Valid @RequestBody Baixa baixa) {
		baixas.save(baixa);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void atualizar(@Valid @RequestBody Baixa baixa,
			@PathVariable Long id, @RequestHeader(value="campos") String campos) {
		baixas.save(baixas.merge(baixa, campos, id));
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void excluir(@PathVariable Long id) {
		baixas.delete(id);
	}

}
