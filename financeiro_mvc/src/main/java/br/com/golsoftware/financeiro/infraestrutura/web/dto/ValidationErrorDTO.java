package br.com.golsoftware.financeiro.infraestrutura.web.dto;

import java.util.ArrayList;
import java.util.List;

public class ValidationErrorDTO {

	private List<FieldErrorDTO> fieldErrors = new ArrayList<>();
	private List<ObjectErrorDTO> objectErrors = new ArrayList<>();
	
    public ValidationErrorDTO() {

    }

    public void addFieldError(String path, String message) {
        FieldErrorDTO error = new FieldErrorDTO(path, message);
        fieldErrors.add(error);
    }

    public List<FieldErrorDTO> getFieldErrors() {
        return fieldErrors;
    }
    
    public void addObjectError(String path, String message) {
        ObjectErrorDTO error = new ObjectErrorDTO(path, message);
        objectErrors.add(error);
    }

    public List<ObjectErrorDTO> getObjectErrors() {
        return objectErrors;
    }

}
