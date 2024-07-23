//-- enable javascript engine for the search control
const { jsPDF } = window.jspdf;
// Create Content List
function contentList() {
  $('#documentationArea').find('h1').each(function () {
    var $item = $(this);
    var $id = $(this).attr('id');
    var li = $('<li/>');
    var a = $('<a/>', { text: $item.text(), href: '#' + $id, title: $item.text() });
    a.appendTo(li);
    $('#nav ul').append(li);
  });
}

// SmoothScroll
function smoothScroll() {
  $('a[href^="#"]').click(function () {
    var target = $(this.hash);
    var hash = this.hash;
    if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
    if (target.length == 0) target = $('html');
    console.log(target);
    // If the Target element is collapsed; expand it...
    if ($(target).hasClass('collapsed')) {
      $(target).nextUntil('h1').slideDown();
      $(target).removeClass('collapsed');
    }
    // Scroll to the element
    $('html, body').animate({ scrollTop: target.offset().top }, 500, function () {
      location.hash = hash;
    });
    return false;
  });
}

//-- Scroll to Active link
function ScrollToActive() {
  if ($('.active').offset() !== undefined) {
    $('.sg_sidebar').animate({
      scrollTop: $('.active').offset().top
    }, 1000);
  }
}
// Collapse H1
function collapseH() {
  $('#documentationArea h1').click(function () {
    $(this).toggleClass('collapsed');
    $(this).nextUntil('h1').slideToggle();
  });
}

// Target External Links
function TargetExt() {
  $(".sg_doc a[href^='http']").attr("target", "_blank").addClass("ext");
}
// Copy Code

function handleCopyClick(evt) {
  // get the children of the parent element
  const { children } = evt.target.parentElement
  // grab the first element (we append the copy button on afterwards, so the first will be the code element)
  // destructure the innerText from the code block
  const { innerText } = Array.from(children)[0]
  // copy all of the code to the clipboard
  copyToClipboard(innerText)
  // alert to show it worked, but you can put any kind of tooltip/popup to notify it worked
  alert(innerText)
}


// Sidebar Button
function sidebarButton() {
  var $button = $('.sg_sidebar_button');

  $button.click(function (e) {
    e.preventDefault();
    $(this).parents('.sg-pusher').toggleClass('show_sidebar');
  });
}

function outsideClickSidebar() {
    $(document).mouseup(function (e) {
        var container = $("#sgSidebar");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".sg-pusher").removeClass("show_sidebar");
        }
    });
}

function hideSidebar() {
    var $button = $("#hideSidebarButton");

    $button.click(function (e) {
        e.preventDefault();
        $(this).parents(".sg-pusher").toggleClass("show_sidebar");
    });
}

// Maturity Count
function maturityCount() {
  var p = $('.sg_label.planned').length
  var d = $('.sg_label.draft').length
  var r = $('.sg_label.ready').length
  var rt = $('.sg_label.retired').length
  var total = parseInt(p) + parseInt(d) + parseInt(r) + parseInt(rt);
  var pp = 100 / total * p;
  var pd = 100 / total * d;
  var pr = 100 / total * r;
  var prt = 100 / total * rt;
  if (total > 0) {
    $('.title').append('<div class="count" title="Current Maturity"><span class="planned" style="width:' + pp + '%"></span><span class="draft" style="width:' + pd + '%"></span><span class="ready" style="width:' + pr + '%"></span><span class="retired" style="width:' + prt + '%"></span></div>');
  }
}

//-- Scroll to result once per search
let scrollTimes = 0;

//-- Render results inside html container
let prev = document.getElementById("article-content").innerHTML.toString();
let keyWordResult = [];
//-- Set other article results in the result box

//-- Highlight words find in the current document and engage the result box

const ifHighlightedWord = () => {
  const yellowHighlighter = document.querySelector('mark');
  if (yellowHighlighter && scrollTimes == 0) {
    $('html').animate({
      scrollTop: $('mark').offset().top
    }, 1000);
    scrollTimes = 1;
  }
}

setInterval(ifHighlightedWord, 1000);

//-- Activating download tooltip
const tooltip = document.querySelector('#tooltip');
const searchButton = document.querySelector('#pdf-ic');


//-- Show Tooltip
const showTooltip = (evt) => {
  $('#tooltip').removeClass('hide_tooltip');
  $('#tooltip').addClass('show_tooltip');
}
//-- Hide Tooltip
const hideTooltip = (evt) => {
  $('#tooltip').addClass('hide_tooltip');
  $('#tooltip').removeClass('show_tooltip');
}


//-- Binding events
searchButton.onmouseover = showTooltip;
searchButton.onmouseout = hideTooltip;

//-- Adding listener and triggering  render function when key is up.

//Functions that run when all HTML is loaded
$(document).ready(function () {
  contentList();
  smoothScroll();
  ScrollToActive();
  maturityCount();
  collapseH();
  TargetExt();
  sidebarButton();
  outsideClickSidebar();
  hideSidebar();
});

//-- Accordion (CSS Grid Version)

$(function() {

  // Set up variables
  var $el, $parentWrap, $otherWrap, 
      $allTitles = $("dt").css({
          padding: 5, // setting the padding here prevents a weird situation, where it would start animating at 0 padding instead of 5
          "cursor": "pointer" // make it seem clickable
      }),
      $allCells = $("dd").css({
          position: "relative",
          top: -1,
          left: 0,
          display: "none" // info cells are just kicked off the page with CSS (for accessibility)
      });
  
  // clicking image of inactive column just opens column, doesn't go to link   
  $("#page-wrap").delegate(".image","click", function(e) { 
      
      if ( !$(this).parent().hasClass("curCol") ) {         
          e.preventDefault(); 
          $(this).next().find('dt:first').click(); 
      } 
      
  });
  
  // clicking on titles does stuff
  $("#page-wrap").delegate("dt", "click", function() {
      
      // cache this, as always, is good form
      $el = $(this);
      
      // if this is already the active cell, don't do anything
      if (!$el.hasClass("current")) {
      
          $parentWrap = $el.parent().parent();
          $otherWraps = $(".info-col").not($parentWrap);
          
          // remove current cell from selection of all cells
          $allTitles = $("dt").not(this);
          
          // close all info cells
          $allCells.slideUp();
          
          // return all titles (except current one) to normal size
          $allTitles.animate({
              fontSize: "14px",
              paddingTop: 5,
              paddingRight: 5,
              paddingBottom: 5,
              paddingLeft: 5
          });
          
          // animate current title to larger size            
          $el.animate({
              "font-size": "20px",
              paddingTop: 10,
              paddingRight: 5,
              paddingBottom: 0,
              paddingLeft: 10
          }).next().slideDown();
          
          // make the current column the large size
          $parentWrap.animate({
              width: 320
          }).addClass("curCol");
          
          // make other columns the small size
          $otherWraps.animate({
              width: 140
          }).removeClass("curCol");
          
          // make sure the correct column is current
          $allTitles.removeClass("current");
          $el.addClass("current");  
      
      }
      
  });
  
  $("#starter").trigger("click");
  
});