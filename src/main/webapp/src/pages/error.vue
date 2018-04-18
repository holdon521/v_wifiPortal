<template>
		<div class="tips_area">
			<span class="error_tit">糟糕遇到问题啦～</span>
			<span class="error_ways">错误代码(ERR-{{errorCode}})</span>
			<p class="tips_p">请尝试以下解决方法：</p>
			<p class="tips_p">1.请尝试断开wifi后重新连接</p>
			<p class="tips_p">2.若重新连接后无效，请更换下列浏览器尝试访问新浪、腾讯等网站</p>
			<span class="error_tips_imgs"></span>
			<span class="tips_footer">如需帮助，请拨打客服热线
				<a href="tel:400-690-5668">
					<span class="phone_b">400-690-5668</span>
				</a>
			</span>
		</div>
</template>
<script>
	export default {
		data() {
			return {
				errorCode:this.$route.params.code
			}
		},
		mounted: function() {
			
		},
		components: {
			
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>
<style scoped>
	.fixed_bg_100{display: block;width:10rem;position:fixed;z-index:100;left:50%;margin-left:-5rem;background-color: #fff;background-attachment:fixed;background-repeat: no-repeat;background-position: bottom;background-size: 10rem .875rem;}
			.tips_area{font-size: .6rem;display: block;width:8.8rem;height: 8.5rem;position:absolute;z-index:101;left:50%;margin-left:-4.4rem;top:1.5rem;}
			.error_tit{display:block;text-align:center;font-size: .66666rem;line-height: 1.5em;color: #f89160;padding-top: 3.5rem;background: url(../images/login_wifi/tips/error_tit.png) no-repeat; background-size: 8.5rem 3.5rem; background-position: top center; }
			.error_ways{display:block;text-align:center;font-size: .4375rem;line-height: 1.5em;margin-bottom: 1em;color: #f89160;}
			.tips_p{font-size: .4rem;text-align:left;line-height: 1.5em;margin-bottom: .5em;font-size: .5rem;}
			.error_tips_imgs{display: block;width:8.8rem;height: 1.8125rem;background: url(../images/login_wifi/tips/error_tips_imgs.png) no-repeat; background-size: contain;}
			.tips_footer{display: block;text-align: center;font-size: .43rem;line-height: 1.5em;margin-top: .5rem;}
			.phone_b{color:#3ab7f5;}
</style>