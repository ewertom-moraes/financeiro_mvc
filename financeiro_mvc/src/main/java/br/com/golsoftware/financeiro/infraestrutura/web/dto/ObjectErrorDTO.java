package br.com.golsoftware.financeiro.infraestrutura.web.dto;

public class ObjectErrorDTO {
	
	private String object;

    private String message;

    public ObjectErrorDTO(String object, String message) {
        this.object = object;
        this.message = message;
    }

    public String getField() {
        return object;
    }

    public String getMessage() {
        return message;
    }
	
}
