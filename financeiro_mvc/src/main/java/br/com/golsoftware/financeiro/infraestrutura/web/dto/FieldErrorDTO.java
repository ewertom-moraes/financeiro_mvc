package br.com.golsoftware.financeiro.infraestrutura.web.dto;

public class FieldErrorDTO {

	private String field;

    private String message;
    
    private String codigo;

    public FieldErrorDTO(String field, String message, String codigo) {
        this.field = field;
        this.message = message;
        this.codigo = codigo;
    }

    public String getField() {
        return field;
    }

    public String getMessage() {
        return message;
    }

	public String getCodigo() {
		return codigo;
	}
    
    
	
}
