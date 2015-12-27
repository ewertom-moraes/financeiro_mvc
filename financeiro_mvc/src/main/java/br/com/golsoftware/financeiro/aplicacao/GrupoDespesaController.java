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

import br.com.golsoftware.financeiro.dominio.modelo.grupodespesa.GrupoDespesa;
import br.com.golsoftware.financeiro.dominio.modelo.grupodespesa.GrupoDespesaRepository;
import br.com.golsoftware.financeiro.dominio.modelo.grupodespesa.GrupoDespesaValidator;
import br.com.golsoftware.financeiro.infraestrutura.web.Requisicao;

@RestController
@RequestMapping(value = "/grupoDespesa")
public class GrupoDespesaController {

	private GrupoDespesaRepository grupoDespesas;
	
	@Autowired
	public GrupoDespesaController(GrupoDespesaRepository grupoDespesas) {
		this.grupoDespesas = grupoDespesas;
	}
	
	@InitBinder("grupoDespesa")
	protected void initBinder(WebDataBinder binder) {
	    binder.addValidators(new GrupoDespesaValidator(grupoDespesas));
	} 
	
	@RequestMapping(value="/planilha")
	public ModelAndView formPlanilha(){
		return new ModelAndView("grupoDespesa/grupoDespesa_planilha");
	}
	
	@RequestMapping( method = RequestMethod.GET)
	public List<GrupoDespesa> getGrupoDespesas(HttpServletRequest req, HttpServletResponse resp, Requisicao requisicao){
		return grupoDespesas.get(requisicao, GrupoDespesa.class);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public GrupoDespesa porId(@PathVariable Long id) {
		return grupoDespesas.findOne(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void salvar(@Valid @RequestBody GrupoDespesa grupoDespesa) {
			grupoDespesas.save(grupoDespesa);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void atualizar(@Valid @RequestBody GrupoDespesa grupoDespesa,
			@PathVariable Long id, @RequestHeader(value="campos") String campos) {
		grupoDespesas.save(grupoDespesas.merge(grupoDespesa, campos, id));
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void excluir(@PathVariable Long id) {
		grupoDespesas.delete(id);
	}

}
