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

import br.com.golsoftware.financeiro.dominio.modelo.titulo.Titulo;
import br.com.golsoftware.financeiro.dominio.modelo.titulo.TituloRepository;
import br.com.golsoftware.financeiro.dominio.modelo.titulo.TituloValidator;
import br.com.golsoftware.financeiro.infraestrutura.web.Requisicao;

@RestController
@RequestMapping(value = "/titulo")
public class TituloController {

	private TituloRepository titulos;
	
	@Autowired
	public TituloController(TituloRepository titulos) {
		this.titulos = titulos;
	}
	
	@InitBinder("titulo")
	protected void initBinder(WebDataBinder binder) {
	    binder.addValidators(new TituloValidator(titulos));
	} 
	
	@RequestMapping(value="/planilha")
	public ModelAndView formPlanilha(){
		return new ModelAndView("titulo/titulo_planilha");
	}
	
	@RequestMapping(value="/porEntidade")
	public ModelAndView formTitulosEntidade(){
		return new ModelAndView("titulo/titulos_entidade");
	}
	
	@RequestMapping( method = RequestMethod.GET)
	public List<Titulo> getTitulos(HttpServletRequest req, HttpServletResponse resp, Requisicao requisicao){
		return titulos.get(requisicao, Titulo.class);
	}
	
	@RequestMapping(value = "/titulosEntidade/{fornecedor}", method = RequestMethod.GET)
	public List<Titulo> titulosEntidade(@PathVariable Long fornecedor) {
//		if(fornecedor==null || fornecedor == 0)
//			return null;
		return titulos.titulosEntidade(fornecedor);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Titulo porId(@PathVariable Long id) {
		return titulos.findOne(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void salvar(@Valid @RequestBody Titulo titulo) {
			titulos.save(titulo);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void atualizar(@Valid @RequestBody Titulo titulo,
			@PathVariable Long id, @RequestHeader(value="campos") String campos) {
		titulos.save(titulos.merge(titulo, campos, id));
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void excluir(@PathVariable Long id) {
		titulos.delete(id);
	}

}
