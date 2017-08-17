
window.onresize = function(event) {
//	calcDimention();
	window.ondraw();
};
window.ondraw = function(){
//	var image = document.getElementById('source');
//	context.drawImage( image, drawingLeft, drawingTop, drawingRight - drawingLeft, drawingBottom - drawingTop);
}
calcDimention = function(){
	canvas = document.getElementById("comment_area");
	context = canvas.getContext("2d");
	canvasWidth  = window.innerWidth - 20;
	canvasHeight = window.innerHeight - 20;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvas.height = canvasHeight;
	centerX = canvasWidth / 2;
	drawingLeft = (100 < canvasWidth / 5) ? 100 : canvasWidth / 5;
	centerY = canvasHeight / 2;
	drawingTop = (200 > canvasHeight / 5) ? 200 : canvasHeight / 5;
	drawingRight = (canvasWidth - 100 > canvasWidth * 4 / 5) ? canvasWidth - 100 : canvasWidth * 4 / 5;
	drawingBottom = canvasHeight - 60;
};
$(document).ready(function(){
//	calcDimention();
	$('[data-toggle="tooltip"]').tooltip();

});
new Vue(
	{
		el: '#root',
		data: {
			account: "admin",
			project_title: "Hotel Vigan - View 1",
			current_page: 1,
			all_pages: 1,
			comments: "",
			ImgUrl: "",
			tag_number: 0,
			tag_context: "",
			tag_numbers: [],
			tag_contexts: []
		},
		computed: {
			// a computed getter
			date: function () {
				var curdate = new Date();
				return ((curdate.getMonth() + 1) + '-' + curdate.getDate() + '-' +  curdate.getFullYear());	
			},
			page_number: function(){
				return this.current_page + ' / ' + this.all_pages;
			}
		},
		watch: {
			current_page: function(newValue, oldValue){

			},
			all_pages: function(newValue, oldValue){

			},
		},
		methods: {
			initialise: function(){
			},
			add_file: function(){
				// creating input on-the-fly
				if( this.ImgUrl){
					SaveCurrentPage(this.current_page);
					this.all_pages++;
					this.current_page++;
				}
				var _self = this;
				var input = $(document.createElement("input"));
				input.attr("type", "file");
				input.attr("id", "add_fileBtn");
				// add onchange handler if you wish to get the file :)
				input.on("change",  function(e){
					var files = e.target.files || e.dataTransfer.files;
					if (!files.length)
						return;
					_self.createImage(files[0]);
				});
				input.trigger("click"); // opening dialog
				return false; // avoiding navigation
			},
			delete_file: function(){
				if(this.all_pages > 1) this.all_pages --;
				if(this.current_page > 1) this.current_page --;
				RestorePage(this.current_page);
			},
			prev: function(){
				if(this.current_page == 1)return;
				SaveCurrentPage( this.current_page);
				this.current_page--;
				RestorePage(this.current_page);
			},
			next: function(){
				if(this.current_page == this.all_pages)return;
				SaveCurrentPage( this.current_page);
				this.current_page++;
				RestorePage(this.current_page);
			},
			undo: function(){
				if( TagCount == 0) return;
				var aLine = document.getElementById('line'+TagCount);
				aLine.remove();
				var aCommentTag = document.getElementById( TagCount);
				aCommentTag.remove();
				TagCount--;
			},
			upload: function(){
//				SaveCurrentPage(this.current_page);
				var svgHtml = document.getElementById("tag_arrow").innerHTML;
				var svgEle = document.getElementById("tag_arrow");
//				var strHtml = svgEle.innerHtml;
				var children = document.getElementById("tag_arrow").children;
				console.log("svgHtml:"+svgHtml);
//				document.getElementById("tag_arrow").children = "";
				var childArray = [];
				var i = 1;
				while (svgEle.firstChild) {
					childArray[i++] = svgEle.outerHtml;
				    svgEle.removeChild(svgEle.firstChild);
				}
				console.log(childArray);
				html2canvas(document.getElementById("wholecontents"), {
					allowTaint:true
				});
				html2canvas(document.getElementById("wholecontents"), {
					onrendered: function(canvas) {
						var context = canvas.getContext("2d");
						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = 'red';
						console.log(lines);
						for( i = 1; i < lines.length; i++){
							aLine = lines[i];
							var x1 = aLine.getAttribute('x1');
							var y1 = aLine.getAttribute('y1');
							var x2 = aLine.getAttribute('x2');
							var y2 = aLine.getAttribute('y2');
							context.moveTo(x1,y1*1+32);
							context.lineTo(x2,y2*1+32);
							context.stroke();
						}
           				canvas.toBlob(function(blob){
 							saveAs(blob, "screenshot.jpg");
							console.log("OK");
						});
/*						$.ajax({
							type: "POST",
							url: "fileUpload.php",
							data: { filedata: canvas}
							}).done( function(msg){
								alert("Data Uploaded!:" + msg);
						});*/
					},
					width: window.innerWidth,
					height: window.innerHeight
				});
				console.log(svgHtml);
				document.getElementById("tag_arrow").innerHTML = svgHtml;
//				svgEle.innerHtml = strHtml;

/*
				$.ajax({
					type: "POST",
					url: "fileUpload.php",
					data: { name: "John"}
					}).done( function(msg){
						alert("Data Uploaded!:" + msg);
				});
				*/
			},
			createImage: function(file) {
				var ImgUrl = new Image();
				var reader = new FileReader();
				var vm = this;
				reader.onload = (e) => {
					vm.ImgUrl = e.target.result;
					var image = document.getElementById('source');
/*					context.drawImage( image, drawingLeft, drawingTop, drawingRight - drawingLeft, drawingBottom - drawingTop);
					setTimeout( function(){
						context.drawImage( image, drawingLeft, drawingTop, drawingRight - drawingLeft, drawingBottom - drawingTop);
					}, 1500);*/
				};
				reader.readAsDataURL(file);
			},
		}
	},
);
