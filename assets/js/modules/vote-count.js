let like_flag = false;
let dislike_flag = false;
function liked(event) {
  let counter = parseFloat(document.getElementById('counter').innerHTML);
  var button = event.target.innerText;
  switch(button){
  	case 'like':
    	if (like_flag==false && dislike_flag==false) {
        counter++;
        like_flag=true;
      } else if (like_flag==false && dislike_flag==true) {
        counter = counter + 2;
        like_flag=true;
        dislike_flag=false;
      } else {
      	counter--;
        like_flag=false;
      }
    break;
    case 'dislike':
    	if (dislike_flag==false && like_flag==false) {
        counter--;
        dislike_flag=true;
      } else if (dislike_flag==false && like_flag==true) {
        counter = counter - 2;
        dislike_flag=true;
        like_flag=false;
      } else {
      	counter++;
        dislike_flag=false;
      }
    break;
  }
  console.log('the button '+button+' was pressed');
  
  document.getElementById('counter').innerHTML = counter;
}
