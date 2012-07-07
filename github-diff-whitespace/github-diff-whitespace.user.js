// ==UserScript==
// @name        GitHub-diff-whitespace
// @namespace   http://jason.karns.name
// @match       https://github.com/*/commit/*
// @match       https://github.com/*/pull/*
// @version     1
// ==/UserScript==


( function( querystring ){
  var querystringToObject = function( querystring ){
    var params = {};
    querystring.replace(
        new RegExp( '([^?=&]+)(=([^&]*))?', 'g' ),
        function( $0, $1, $2, $3 ) { params[ $1 ] = $3; }
    );
    return params;
  };

  var objectToQueryString = function( params ){
    var values = [];
    for( param in params ){
      var value = ( params[ param ] == null ? '' : params[ param ] );
      values.push( encodeURIComponent( param ) + '=' + encodeURIComponent( value ) )
    }
    return values.join( '&' ).replace( /%20/g, '+' );
  };

  var toggleW = function( params, whitespace ){
    if( whitespace ){
      delete params.w;
    }
    else {
      params.w = true;
    }
    return params;
  };

  var addWhitespaceToggleButton = function( button_group, querystring ){
    var a = document.createElement( 'a' )
    a.className = button_group.querySelector( 'a' ).className;
    a.href = '?' + querystring;
    a.title = 'Toggle Whitespace';
    a.textContent = ' \u2423 ';

    var li = document.createElement( 'li' )
    li.appendChild( a );

    button_group.insertBefore( li, button_group.firstChild );
  }

  var addWhitespaceToggleButtons = function( querystring ){
    Array.prototype.forEach.call(
      document.querySelectorAll( '.diff-view .actions .button-group' ),
      function( button_group, index, button_groups ){
        addWhitespaceToggleButton( button_group, querystring );
      }
    );
  };



  var params = querystringToObject( querystring );
  var whitespace = Boolean(params.w);
  querystring = objectToQueryString( toggleW( params, whitespace ) );
  addWhitespaceToggleButtons( querystring );

})( location.search );
