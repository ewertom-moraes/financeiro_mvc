

$(document).ready(function(){
	Webtom.form.patterns();
	$('[title]').tooltip();

	$('input[type!=reset]').addClass('form-control');


	$("input[name*='data']").datepicker({
		dateFormat : 'dd/mm/yy'
	});

	$('input[name=cpf]').mask('000.000.000-00', {
		reverse : true
	});

	$('input[name=valor]').mask('#########0.00', {
		reverse : true
	})

	$('input[name*="data"], input.data').mask('00/00/0000');

	$('input[name*="inicio"], input[name*="duracao"]').mask('00:00');

	$('input[name*="cep"]').mask('00000-000');

});
 
//$.extend(FormSerializer.patterns, {
//	  validate: /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
//});


$('select[data-lista]').each(function(){
	$(this).append('<option value=""> </option>');
	var rotulo = $(this).attr('data-rotulo');
	if(valida(rotulo))
		$(this).append('<option class="wtLoop" value=" ">'+rotulo+'</option>'); 
});


//$('button.wt-crud').each(function(){
//	$(this).attr('type', 'button');
//	$(this).addClass('btn btn-xs');
//	$(this).append('<i class="fa fa-pencil"></i>');
//	$(this).attr('onclick','consultar(this);');
//});



(function($) {
	  // copy from jquery.js
	  var r20 = /%20/g,
	  rbracket = /\[\]$/;

	  $.extend({
	    customParam: function( a ) {
	      var s = [],
	        add = function( key, value ) {
	          // If value is a function, invoke it and return its value
	          value = jQuery.isFunction( value ) ? value() : value;
	          s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
	        };

	      // If an array was passed in, assume that it is an array of form elements.
	      if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	        // Serialize the form elements
	        jQuery.each( a, function() {
	          add( this.name, this.value );
	        });

	      } else {
	        for ( var prefix in a ) {
	          buildParams( prefix, a[ prefix ], add );
	        }
	      }

	      // Return the resulting serialization
	      return s.join( "&" ).replace( r20, "+" );
	    }
	  });

	/* private method*/
	function buildParams( prefix, obj, add ) {
	  if ( jQuery.isArray( obj ) ) {
	    // Serialize array item.
	    jQuery.each( obj, function( i, v ) {
	      if (rbracket.test( prefix ) ) {
	        // Treat each array item as a scalar.
	        add( prefix, v );

	      } else {
	        buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, add );
	      }
	    });

	  } else if (obj != null && typeof obj === "object" ) {
	    // Serialize object item.
		//console.log('sera impresso valor a serializar como !isArray');
		//console.log(obj);
		//console.log('obj :'+JSON.stringify(obj) );
	    for ( var name in obj ) {
			buildParams( prefix + "." + name, obj[ name ], add );
			//buildParams( prefix + "[" + name + "]", obj[ name ], add );
	    }

	  } else {
	    // Serialize scalar item.
	    add( prefix, obj );
	  }
	};
	})(jQuery);