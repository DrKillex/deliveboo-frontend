<!-- pagina about -->
<script>
export default {
    name: "AppCarousel"

}
</script>


<template>

<div class="slider mb-5">
	<div class="slide-track gap-2">
		<div class="slide">
			<img src="../assets/img/rist1.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist2.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist3.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist4.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist5.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist6.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist7.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist8.jpg" height="100" width="250" alt="" />
		</div>
        <div class="slide">
			<img src="../assets/img/rist9.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist10.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist11.jpg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist12.jpeg" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="../assets/img/rist13.jpg" height="100" width="250" alt="" />
		</div>
        <div class="slide">
			<img src="../assets/img/rist14.jpg" height="100" width="250" alt="" />
		</div>
        <div class="slide">
			<img src="../assets/img/rist15.jpg" height="100" width="250" alt="" />
		</div>
	</div>
</div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

@mixin white-gradient {
	background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
}

$animationSpeed: 40s;

// Animation
@keyframes scroll {
	0% { transform: translateX(0); }
	100% { transform: translateX(calc(-250px * 7))}
}


// Styling
.slider {
	background: white;
	// box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .125);
	height: 100px;
	margin: auto;
	overflow:hidden;
	position: relative;
	width: 100%;
	
	&::before,
	&::after {
		@include white-gradient;
		content: "";
		height: 100px;
		position: absolute;
		width: 200px;
		z-index: 2;
	}
	
	&::after {
		right: 0;
		top: 0;
		transform: rotateZ(180deg);
	}

	&::before {
		left: 0;
		top: 0;
	}
	
	.slide-track {
		animation: scroll $animationSpeed linear infinite;
		display: flex;
		width: calc(250px * 14);
        border-radius: 20px;
	}
	
	.slide {
		height: 100px;
		width: 250px;
        img{
            border-radius: 5px;
        }
	}
}
</style>