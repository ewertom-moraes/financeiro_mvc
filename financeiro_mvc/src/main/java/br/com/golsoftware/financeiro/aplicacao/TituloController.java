package br.com.golsoftware.financeiro.aplicacao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.golsoftware.financeiro.dominio.modelo.titulo.Titulo;
import br.com.golsoftware.financeiro.dominio.modelo.titulo.TituloRepository;

@RestController
@RequestMapping(value = "/titulos")
public class TituloController {

	private TituloRepository titulos;

	@Autowired
	public TituloController(TituloRepository titulos) {
		this.titulos = titulos;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Titulo> todos() {
		return titulos.findAll();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public void salvar(@RequestBody Titulo titulo) {
		titulos.save(titulo);
	}

}
