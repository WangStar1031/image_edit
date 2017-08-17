<html>
<head>
<link href="../css/bootstrap.min.css" rel="stylesheet">
<link href="./image-edit.css?<?php echo(date("YmdHis"));?>" rel="stylesheet">

<script src="../js/jquery.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/html2canvas.min.js"></script>
<script src="../js/canvas2image.js"></script>
<script src="../js/FileSaver.min.js"></script>
<script src="../js/canvg.js"></script>
<script type="text/javascript" src="../js/vue.min.js"></script>
<title>Image Edit</title>
</head>
<body style="background-color: rgb(254,254,254);">
<!--
	<canvas id="comment_area">
	</canvas>
-->
	<div id="root" onload="initialise()">

		<div id="header_area">
			<button @click="add_file" id="add_btn" class="header_btn" data-toggle="tooltip" title="Add Image File" data-placement="bottom">&#x02A25;</button>
			<button @click="prev" id="prev_btn" class="header_btn inactive" data-toggle="tooltip" title="Prev" data-placement="bottom">&#x029CF;</button>
			<button @click="next" id="next_btn" class="header_btn inactive" data-toggle="tooltip" title="Next" data-placement="bottom">&#x029D0;</button>
			<button @click="undo" id="undo_btn" class="header_btn inactive" data-toggle="tooltip" title="Undo" data-placement="bottom">&#x021B6;</button>
			<button @click="upload" id="upload_btn" class="header_btn inactive" data-toggle="tooltip" title="Upload" data-placement="bottom">&#x00021;</button>
		</div>
		<div id="wholecontents" style="position:absolute;background-color: rgb(254,254,254);width: calc(100% - 5px); top: 32px; height: calc(100% - 32px);">
			<div class="ImageGallery" id="ImageGallery">
				<img id="source" :src=ImgUrl>
			</div>

			<svg class="tag_arrow" id="tag_arrow" style="position: absolute;left: 0;top: 32px;width: 100%;height: calc(100% - 110px);">
			</svg>

			<div id="comment_tags">
			</div>


			<div id="footer_area">
				<div id="date_area">
					<p>DATE</p>
					<p class="date_time">{{date}}</p>
				</div>
				<div id="project_title">
					<p>Project Title</p>
					<div v-if= "account == 'user'" >
						<p class="project_title inactive"> {{project_title}} </p>
					</div>
					<div v-else>
						<input class="project_title" v-model="project_title">
					</div>
				</div>
				<div id="overall_comments">
					<textarea v-model="comments" class="overall_comments" placeholder="Overall Comments"></textarea>
				</div>
				<div id="page_number">
					<p>PAGE</p>
					<p class="page_number">{{page_number}}</p>
				</div>
			</div>
		</div>
	</div>

</body>
<script type="text/javascript" src="./image-edit.js?<?php echo(date("YmdHis"));?>"></script>
<script type="text/javascript" src="./main.js?<?php echo(date("YmdHis"));?>"></script>
<script type="text/javascript" src="./HTML5Utils.js"></script>
</html>
