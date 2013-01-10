(function($){
  widescreen = function(){
    var widescreen = localStorage['verticalSplit'] !== "false";

    $('.body-wrap').css('width', widescreen? '98%' : '');
    $('.editor-wrapper').css('width', widescreen? '49%' : '');
    $('.editor').css('width', widescreen? '48%' : '');

    $('#src, #specs').each(function(index, editor){
      if(editor = $(this).data('editor')) editor.resize();
    });

  };

  widescreen();
  $(document).delegate('.flip-editors', 'click', widescreen);
})(jQuery);
