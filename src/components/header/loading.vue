<template>
  <div class="container">
    <div class="loader1">
	    <i></i><i></i>
	  </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  background: #fff;
}
.loader1 {
  margin: 0 auto;
	height: 20px;
	width: 20px;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  animation: spin 1.5s linear infinite;
	-webkit-animation:spin 1.5s linear infinite;
	-moz-animation:spin 1.5s linear infinite;
}
.loader1 i {
	height: 20px;
	width: 20px;
	border-radius: 25px;
	display: block;
	position:absolute;
}
.loader1 i:before, .loader1 i:after {
	content:'';
	display:block;
	position:absolute;
	height:inherit;
	width:inherit;
	border-radius: inherit;
}
.loader1 i:first-child:before {
  background:rgba(52, 149, 221, 0.9);
  animation:rotate-top-left 1.5s linear infinite;
	-webkit-animation:rotate-top-left 1.5s linear infinite;
	-moz-animation:rotate-top-left 1.5s linear infinite;
}
.loader1 i:first-child:after {
  background:rgba(225, 73, 44, 0.9);
  animation:rotate-top-right 1.5s linear infinite;
	-webkit-animation:rotate-top-right 1.5s linear infinite;
	-moz-animation:rotate-top-right 1.5s linear infinite;
}
.loader1 i:last-child:before {
  background:rgba(249, 206, 43, 0.9);
  animation:rotate-bottom-left 1.5s linear infinite;
	-webkit-animation:rotate-bottom-left 1.5s linear infinite;
	-moz-animation:rotate-bottom-left 1.5s linear infinite;
}
.loader1 i:last-child:after {
  background:rgba(0, 153, 117, 0.9);
  animation:rotate-bottom-right 1.5s linear infinite;
	-webkit-animation:rotate-bottom-right 1.5s linear infinite;
	-moz-animation:rotate-bottom-right 1.5s linear infinite;
}
 @keyframes spin {
 0% {
 transform:rotate(0deg);
}
 50% {
 transform:rotate(-180deg);
}
 100% {
 transform:rotate(-360deg);
}
}
 @keyframes rotate-top-right {
 0% {
 transform:rotate(0deg);
}
 50% {
 transform:rotate(-180deg);
 transform-origin: 20% 20%;
}
 100% {
 transform:rotate(-360deg);
}
}
 @keyframes rotate-top-left {
 0% {
 transform:rotate(0deg);
}
 50% {
 transform:rotate(180deg);
 transform-origin: 80% 20%;
}
 100% {
 transform:rotate(360deg);
}
}
 @keyframes rotate-bottom-right {
 0% {
 transform:rotate(0deg);
}
 50% {
 transform:rotate(-180deg);
 transform-origin: 80% 80%;
}
 100% {
 transform:rotate(-360deg);
}
}
 @keyframes rotate-bottom-left {
 0% {
 transform:rotate(0deg);
}
 50% {
 transform:rotate(180deg);
 transform-origin: 20% 80%;
}
 100% {
 transform:rotate(360deg);
}
}
@-webkit-keyframes spin {
 0% {
 -webkit-transform:rotate(0deg);
}
 50% {
 -webkit-transform:rotate(-180deg);
}
 100% {
 -webkit-transform:rotate(-360deg);
}
}
 @-webkit-keyframes rotate-top-right {
 0% {
 -webkit-transform:rotate(0deg);
}
 50% {
 -webkit-transform:rotate(-180deg);
 -webkit-transform-origin: 20% 20%;
}
 100% {
 -webkit-transform:rotate(-360deg);
}
}
 @-webkit-keyframes rotate-top-left {
 0% {
 -webkit-transform:rotate(0deg);
}
 50% {
 -webkit-transform:rotate(180deg);
 -webkit-transform-origin: 80% 20%;
}
 100% {
 -webkit-transform:rotate(360deg);
}
}
 @-webkit-keyframes rotate-bottom-right {
 0% {
 -webkit-transform:rotate(0deg);
}
 50% {
 -webkit-transform:rotate(-180deg);
 -webkit-transform-origin: 80% 80%;
}
 100% {
 -webkit-transform:rotate(-360deg);
}
}
 @-webkit-keyframes rotate-bottom-left {
 0% {
 -webkit-transform:rotate(0deg);
}
 50% {
 -webkit-transform:rotate(180deg);
 -webkit-transform-origin: 20% 80%;
}
 100% {
 -webkit-transform:rotate(360deg);
}
}
 @-moz-keyframes spin {
 0% {
 -moz-transform:rotate(0deg);
}
 50% {
 -moz-transform:rotate(-180deg);
}
 100% {
 -moz-transform:rotate(-360deg);
}
}
 @-moz-keyframes rotate-top-right {
 0% {
 -moz-transform:rotate(0deg);
}
 50% {
 -moz-transform:rotate(-180deg);
 -moz-transform-origin: 20% 20%;
}
 100% {
 -moz-transform:rotate(-360deg);
}
}
 @-moz-keyframes rotate-top-left {
 0% {
 -moz-transform:rotate(0deg);
}
 50% {
 -moz-transform:rotate(180deg);
 -moz-transform-origin: 80% 20%;
}
 100% {
 -moz-transform:rotate(360deg);
}
}
 @-moz-keyframes rotate-bottom-right {
 0% {
 -moz-transform:rotate(0deg);
}
 50% {
 -moz-transform:rotate(-180deg);
 -moz-transform-origin: 80% 80%;
}
 100% {
 -moz-transform:rotate(-360deg);
}
}
 @-moz-keyframes rotate-bottom-left {
 0% {
 -moz-transform:rotate(0deg);
}
 50% {
 -moz-transform:rotate(180deg);
 -moz-transform-origin: 20% 80%;
}
 100% {
 -moz-transform:rotate(360deg);
}
}
</style>