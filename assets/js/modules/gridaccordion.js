$(document).ready(function(){
  $("ul.themen li").click(function () {
    $("ul.themen li.act").removeClass("act");
    $(this).addClass("act")
  });
});
