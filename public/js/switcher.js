;(function( $ ) {
  "use strict";

  $( document ).on( 'ready', function() {

    var $switcher = $( '<section>' );

    $switcher.attr( 'id', 'demo-switcher' );
    $( 'body' ).append( $switcher );

    $switcher.load( 'index.php #demo-switcher > *', function() {

      $( 'body' ).on( 'click', '#demo-switcher-toggle', function( e ) {
        e.preventDefault();

        $switcher.toggleClass( 'active' );
      });

      var segments = window.location.pathname.split( '/' );
      $( '#demo-switcher-layout' ).val( segments[ segments.length - 1 ] );
      $( '#demo-switcher-layout' ).on( 'change', function() {
        var url = $( this ).val();
        window.location.href = url;
      });

      $( 'input[name="demo_color"]' ).on( 'click', function() {
        var url = $( this ).val();
        $( '#color-css' ).attr( 'href', url );
      });
      
    });


  });

})( jQuery );