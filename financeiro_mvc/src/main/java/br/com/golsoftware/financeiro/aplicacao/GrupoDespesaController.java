package br.com.golsoftware.financeiro.aplicacao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.golsoftware.financeiro.dominio.modelo.GrupoDespesa;
import br.com.golsoftware.financeiro.dominio.modelo.GrupoDespesaRepository;

@RestController
@RequestMapping(value = "/gruposDespesas")
public class GrupoDespesaController {
	
	private GrupoDespesaRepository gruposDeDespesas;

	@Autowired
	public GrupoDespesaController(GrupoDespesaRepository gruposDeDespesas) {
		this.gruposDeDespesas = gruposDeDespesas;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<GrupoDespesa> todos() {
		return gruposDeDespesas.findAll();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public void salvar(@RequestBody GrupoDespesa grupoDespesa) {
		gruposDeDespesas.save(grupoDespesa);
	}

}
