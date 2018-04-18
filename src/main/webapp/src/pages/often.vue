<template>
	<div class="tips_area">
		<span class="relink_tips">系统检测到您的设备联网过于频繁，<br />为了保证其它用户上网体验，我们将暂停为您提供服务，请在2小时后重试</span>
		<p class="tips_p">如何避免此问题：</p>
		<p class="tips_p">(1)联网时请勿使用WIFI助手等工具，或者关闭<br /><span class="em_1_5"></span>浏览器WIFI助手功能；</p>
		<p class="tips_p">(2)进入微信后关注公众号并点击右上角“完成”<br /><span class="em_1_5"></span>按钮完成认证，认证完成后我们将为您提供持<br /><span class="em_1_5"></span>续上网服务。</p>
	</div>
</template>
<style scoped>
	.tips_area{display: block;width:9rem;height: 8.5rem;position:absolute;z-index:101;left:50%;margin-left:-4.4rem;top:1.5rem;}
	.relink_tips{display:block;text-align:center;font-size: .4375rem;line-height: 1.5em;color: #f89160;padding-top: 5rem;padding-bottom:.5em;background: url(../images/login_wifi/tips/relink_tips.png) no-repeat; background-size: 9rem 5rem; background-position: top center; }
	.error_ways{display:block;text-align:center;font-size: .4375rem;line-height: 1.5em;margin-bottom: 1em;color: #f89160;}
	.tips_p{text-align: left;font-size:.40625rem;line-height: 1.5em;margin-bottom: .5em;display: block;}
	.tips_p span.em_1_5{display: inline-block;width: 1.5em;}
</style>