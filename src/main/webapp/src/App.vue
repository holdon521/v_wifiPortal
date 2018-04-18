<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width: 10rem;
		margin: 0 auto;
	}
	
	.popDiv {
		z-index: 850;
		width: 10rem;
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		margin: 0 auto;
		margin-top: 0rem;
		margin-left: -5rem;
		background: rgba(0, 0, 0, .6);
		text-align: center;
		overflow: hidden;
	}
	
	.popLoading {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -35px;
		margin-left: -35px;
		display: block;
	}
</style>