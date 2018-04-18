<template>
	<div class="adBoot" v-if="adFlg">
		<i v-if="style=='rightTop'" class="ad_end_times">
			<span class="adImg"><img src="../images/login_wifi/loading.gif" /></span>
			<span class="adFont">加载中</span>
		</i>
		<div class="wrap_wx">
			<img id="adBootImg" @load="imageLoaded" :src="adInfo.bootAd" width="100%" alt="" />
		</div>
	</div>
</template>
<script>
	export default {
		props: ['adInfo'],
		data: function() {
			return {
				adFlg: true,
				style: "rightTop",
				time: this.adInfo.adTime,
				count: this.adInfo.adTime
			}
		},
		mounted: function() {
			
		},
		methods: {
			imageLoaded: function() {
				let that = this;
				if(that.count <= 0) {
					that.adFlg = false;
					that.$emit('bootMsg', {
						adFlg: that.adFlg
					})
				} else {
					if(that.count == that.time) {
						that.$emit('bootMsg', {
							imgLoaded: true
						})
					}
					that.count--;
					setTimeout(() => {
						that.imageLoaded();
					}, 1000);
				}
			}
		}
	}
</script>
<style>
	.adBoot {
		position: fixed;
		z-index: 10;
	}
	.wrap_wx {
		width: 10rem;
		background-color: #fff;
		margin: 0 auto;
	}
	i.ad_end_times{position: absolute;width:2.5rem;height:.8rem;line-height:.8rem;right:.3rem;top:.4rem;font-size:.375rem;text-align:center;color:#585757;border-radius: .4rem;background-color:#FFFFFF;}
	.ad_end_times img{width: .6rem;height: .6rem;}
	.ad_end_times .adImg{display: block;width: .6rem;height: .6rem;margin-top: .1rem;margin-left: .3rem;}
	.ad_end_times .adFont{float: right;display: block;margin-top: -.7rem;margin-right: .3rem;}
</style>