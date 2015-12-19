package br.com.golsoftware.financeiro.infraestrutura.persistencia;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import br.com.golsoftware.financeiro.infraestrutura.web.Campo;
import br.com.golsoftware.financeiro.infraestrutura.web.Filtro;

public class SqlUtil {

	@PersistenceContext
	static EntityManager em;
	
//	/**
//	 * modo string sql
//	 * */
//	public static String getWhere(HashMap<String, HashMap<String,String>> filtros){
//		
//		StringBuilder where = new StringBuilder(" ");
//		Set<String> set  =  filtros.keySet();
//		Iterator<String> it = set.iterator();
//		boolean primeiro = true;
//		while(it.hasNext()){
//			String campo = it.next();
//			
//			Set<String> setValores  =  filtros.get(campo).keySet();
//			Iterator<String> itValores = setValores.iterator();
//			while(itValores.hasNext()){
//				String filtro = itValores.next();
//				String valor = filtros.get(campo).get(filtro);
//				if(primeiro){
//					where.append("where "+campo +" "+ valor);
//				}else{
//					where.append(" and "+campo +" "+ valor);
//				}
//				primeiro = false;
//			}
//		}
//		
//		return where.toString();
//	}
//	
//
//	/**
//	 * modo string sql
//	 * */
//	public static String getOrderBy(HashMap<String, String> ordernacoes){
//		
//		StringBuilder orderBy = new StringBuilder(" ");
//		Set<String> set  =  ordernacoes.keySet();
//		Iterator<String> it = set.iterator();
//		boolean primeiro = true;
//		while(it.hasNext()){
//			String campo = it.next();
//			String ordem = ordernacoes.get(campo);
//			if(primeiro){
//				orderBy.append(" order by "+campo +" "+ ordem);
//			}else{
//				orderBy.append(", "+campo +" "+ ordem);
//			}
//			primeiro = false;
//		}
//		
//		return orderBy.toString();
//	}
	
	
	public static String getWhere(List<Campo> campos){
		StringBuffer where = new StringBuffer(" ");
		boolean primeiro = true;
		for(Campo campo: campos){
			for(Filtro filtro: campo.getFiltros()){
				if(primeiro){
					where.append(" where ");
					primeiro = false;
				}else{
					where.append(" and ");
				}
				where.append(campo.getNome()+" ");
				String valorFiltro = filtro.getValor();
				String aspas = "";
				String tipo = campo.getTipo(); 
				if(filtro.getCondicao().startsWith("like") || 
						tipo.equals("texto") || tipo.equals("data") || tipo.equals("hora"))
					aspas = "'";
				
				switch (filtro.getCondicao()) {
				case "like":
					where.append("like "+aspas+"%"+valorFiltro+aspas);
					break;
				case "like2":
					where.append("like "+aspas+"%"+valorFiltro+"%"+aspas);
					break;
				case "de":
					where.append(">= "+aspas+valorFiltro+aspas);
					break;
				case "ate":
					where.append("<= "+aspas+valorFiltro+aspas);
					break;
				case "igual":
					where.append("= "+aspas+valorFiltro+aspas);
					break;

				default:
					break;
				}
			}
		}
		return where.toString();
	}

	public static String getOrderBy(List<Campo> campos){
		StringBuilder orderBy = new StringBuilder(" ");
		boolean primeiro = true;
		for(Campo campo: campos){
			if(campo.getOrdenacao().isEmpty())
				continue;
			if(primeiro){
				orderBy.append(" order by ");
				primeiro = false;
			}else{
				orderBy.append(", ");
			}
			orderBy.append(campo.getNome() +" "+ campo.getOrdenacao());
		}
		return orderBy.toString();
	}
	
	
	public static String get(List<Campo> campos){
		return getWhere(campos) +  getOrderBy(campos);
	}
	
//	public static String get(HashMap<String, HashMap<String,String>> filtros, HashMap<String, String> ordernacoes){
//		return getWhere(filtros) +  getOrderBy(ordernacoes);
//	}
	
	
	public static void merge(Object obj, Object update, String campos){
	    if(!obj.getClass().isAssignableFrom(update.getClass())){
	        return;
	    }
	    
	    campos = campos.toLowerCase();
	    
	    Method[] methods = obj.getClass().getMethods();
	    Method[] methodsSuperClass = obj.getClass().getSuperclass().getMethods();
	    
	    for(Method fromMethod: methods){
	        if(fromMethod.getDeclaringClass().equals(obj.getClass())
	                && fromMethod.getName().startsWith("get")){

	            String fromName = fromMethod.getName();
	            String toName = fromName.replace("get", "set");

	            try {
	                Method toMetod = obj.getClass().getMethod(toName, fromMethod.getReturnType());
	                Object value = fromMethod.invoke(update, (Object[])null);
	                if(campos.indexOf(toMetod.getName().toLowerCase().substring(3) )!=-1  ){ // && value != null  
	                    toMetod.invoke(obj, value);
	                }
	            } catch (Exception e) {
	                e.printStackTrace();
	            } 
	        }
	    }
	    
	    if(!obj.getClass().getSuperclass().getClass().getSimpleName().equals("Modelo"))
	    	return;
	    
	    methods = methodsSuperClass;
	    for(Method fromMethod: methods){
	        if(fromMethod.getDeclaringClass().equals(obj.getClass().getSuperclass())
	                && fromMethod.getName().startsWith("get")){

	            String fromName = fromMethod.getName();
	            String toName = fromName.replace("get", "set");

	            try {
	                Method toMetod = obj.getClass().getMethod(toName, fromMethod.getReturnType());
	                Object value = fromMethod.invoke(update, (Object[])null);
	                if(campos.indexOf(toMetod.getName().toLowerCase().substring(3) )!=-1  ){ // && value != null  
	                    toMetod.invoke(obj, value);
	                }
	            } catch (Exception e) {
	                e.printStackTrace();
	            } 
	        }
	    }

	}
	
	public static Criteria getRestricoes(Criteria ct, HashMap<String, HashMap<String,String>> filtros){
		
		Set<String> set  =  filtros.keySet();
		Iterator<String> it = set.iterator();
		while(it.hasNext()){
			String campo = it.next();
			
			Set<String> setValores  =  filtros.get(campo).keySet();
			Iterator<String> itValores = setValores.iterator();
			while(itValores.hasNext()){
				String filtro = itValores.next();
				String valor = filtros.get(campo).get(filtro);

				switch (filtro.toUpperCase()) {
				case "LIKE2":
					ct.add(Restrictions.ilike(campo, valor));
					break;
				case "IGUAL":
					ct.add(Restrictions.eq(campo, valor));
					break;

				default:
					break;
				}
			}
		}
		
		return ct;
	}
	
	
	/*UaiCriteria<Banda> criteria = UaiCriteriaFactory.createQueryCriteria(em, Banda.class);
		
		HashMap<String, HashMap<String, String>> filtros =  r.getFiltros();
		StringBuilder where = new StringBuilder(" ");
		Set<String> set  =  filtros.keySet();
		Iterator<String> it = set.iterator();
		boolean primeiro = true;
		while(it.hasNext()){
			String campo = it.next();
			
			Set<String> setValores  =  filtros.get(campo).keySet();
			Iterator<String> itValores = setValores.iterator();
			while(itValores.hasNext()){
				String filtro = itValores.next();
				String valor = filtros.get(campo).get(filtro);
				switch (filtro.trim().toUpperCase()) {
				case "LIKE":
					criteria.andStringLike(campo, "%"+valor);
					break;
				case "LIKE2":
					criteria.andStringLike(campo, "%"+valor+"%");
					break;
				case "DE":
					criteria.andGreaterOrEqualTo(campo, valor);
					break;
				case "ATE":
					criteria.andLessOrEqualTo(campo, valor);
					break;
				default:
					criteria.andEquals(campo, valor);
					break;
				}
			}
		}
		
		//criteria.andStringLike("nome", "%teste%");
		//criteria.andEquals("id", "1");
		return criteria.getResultList();
	 * 
	 * 
	 * */
	
}