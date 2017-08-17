var isCanvasDown = false;
var pageContents = [];
var prevX;
var prevY;
/*
var commentTags = document.getElementsByClassName("comment_tag");
*/
var mousePosition;
var offset = [0,0];
var div;
var tag_id;
var isTagSelect = false;
var isTagOver = false;
var lines = [];
var TagCount = 0;
/*
var commentTags = document.getElementsByClassName("comment_tag");

commentTags[0].addEventListener('mousedown', function(e) {
    isTagSelect = true;
    offset = [
        commentTags[0].offsetLeft - e.clientX,
        commentTags[0].offsetTop - e.clientY
    ];
}, true);
*/
document.addEventListener('mousedown', function() {
	if(isTagOver)return;
	doMouseDown(event);
}, true);
document.addEventListener('mouseup', function() {
	doMouseUp(event);
    isTagSelect = false;
}, true);

document.addEventListener('mousemove', function(event) {
	doMouseMove(event);
    event.preventDefault();
    if (isTagSelect) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        var element = document.getElementById(tag_id);
        element.style.left = (mousePosition.x + offset[0]) + 'px';
        element.style.top  = (mousePosition.y + offset[1]) + 'px';
        var aLine = lines[tag_id*1];
		aLine.setAttribute('x2', (mousePosition.x + offset[0]));
		aLine.setAttribute('y2', (mousePosition.y + offset[1]));
   }
}, true);

function doMouseDown(event){
	downX = event.clientX;
	downY = event.clientY;
	if( downX < 30 || downY < 30)return;
	if( downY > window.innerHeight - 110)return;
	if(!document.getElementById("source").getAttribute("src"))return;
	prevX = downX;
	prevY = downY;
	var tag_arrow = document.getElementById('tag_arrow');
	var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	aLine.setAttribute('x1', prevX);
	aLine.setAttribute('y1', prevY-64);
	aLine.setAttribute('x2', prevX);
	aLine.setAttribute('y2', prevY-64);
	aLine.setAttribute('stroke', 'red');
	aLine.setAttribute('stroke-width', 2);
	aLine.setAttribute('class', 'arrowLine');
	aLine.setAttribute('id', 'line' + (TagCount+1));TagCount++;
	lines[TagCount] = aLine;
	tag_arrow.appendChild( aLine);
	setTimeout( function(){isCanvasDown = true;}, 100);
}

function doMouseMove(event){
	canvas_x = event.clientX;
	canvas_y = event.clientY;
	if(isCanvasDown == true){
		var aLine = lines[TagCount];
		aLine.setAttribute('x2', canvas_x);
		aLine.setAttribute('y2', canvas_y-64);
	}
}
function doMouseUp(event){
	canvas_x = event.clientX;
	canvas_y = event.clientY;
	if(isCanvasDown == true){
		commentTagFunc(event, TagCount,"This is a comment Tag.");
		isCanvasDown = false;
	}
}
function commentTagFunc(event, tag_number, tag_context){
	var strHtml = "";
	strHtml += '<div class="comment_tag"><div class="tag_number"><p>';
	strHtml += tag_number;
	strHtml += '</p></div><textarea class="tag_comment" placeholder="This is a comment Tag."></textarea>';
	var div = document.createElement('div');
	div.innerHTML = strHtml;
	var tagDiv = document.getElementById("comment_tags");
	var strStyle = "position: absolute;left:"+event.clientX + ";top:"+(event.clientY-64) + ";";
	div.setAttribute("id", tag_number);
	div.setAttribute("class", "comment_class");
	div.setAttribute("style",strStyle);
	tagDiv.appendChild(div);
	tagDiv.getElementsByClassName("comment_tag");
	addEventListeners(div)
}
function addEventListeners( element){
	element.addEventListener('mousedown', function(e) {
	    isTagSelect = true;
	    tag_id = this.getAttribute("id");
	    offset = [
	        element.offsetLeft - e.clientX,
	        element.offsetTop - e.clientY
	    ];
	}, true);
	element.addEventListener('mouseover', function(){
		isTagOver = true;
	}, true);
	element.addEventListener('mouseleave', function(){
		isTagOver = false;
	}, true);
}

function SaveCurrentPage(currentPage){
	TagCount = 0;
	var svgHtml = document.getElementById("tag_arrow").innerHTML;
	var cmtHtml = document.getElementById("comment_tags").innerHTML;
	var cmtStrings = [];
	var ele = document.getElementsByClassName("tag_comment");
	for( i = 0; i < ele.length; i++){
		cmtStrings[i] = ele[i].value;
	}
	var ImgHtml = document.getElementById("source").getAttribute("src");
	var pages = {pageNo: currentPage, svgHtml: svgHtml, cmtHtml: cmtHtml, source: ImgHtml, cmtStrings: cmtStrings};
	pageContents[currentPage] = pages;
	document.getElementById("tag_arrow").innerHTML = "";
	document.getElementById("comment_tags").innerHTML = "";
	document.getElementById("source").setAttribute("src","");
}
function RestorePage(pageNumber){
	TagCount = 0;
	lines = [];
	var svgHtml = pageContents[pageNumber].svgHtml;
	var cmtHtml = pageContents[pageNumber].cmtHtml;
	var source = pageContents[pageNumber].source;
	var cmtStrings = pageContents[pageNumber].cmtStrings;
	document.getElementById("tag_arrow").innerHTML = svgHtml;
	var arrows = document.getElementsByClassName('arrowLine');
	for (var i = 0; i < arrows.length; i++) {
		lines[i+1] = arrows[i];
		TagCount++;
	}
	document.getElementById("comment_tags").innerHTML = cmtHtml;
	var comments = document.getElementsByClassName("comment_class");
	var textEles = document.getElementsByClassName("tag_comment");
	for( i = 0; i < comments.length; i ++){
		addEventListeners(comments[i]);
		textEles[i].value = cmtStrings[i];
	}
	document.getElementById("source").setAttribute("src", source);
	var style = "position: absolute;left: 100px;top: 150px;text-align: center;max-height: calc(100% - 250px);max-width: calc(100% - 200px);margin: auto;display: block;margin-bottom: 10px;";
	document.getElementById("source").setAttribute("style", style);
}