import type { SponsorConfig } from "../types/sponsorConfig";

export const sponsorConfig: SponsorConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 打赏用途说明
	usage: "您的打赏将全部用于博客的维护和更新。",

	// 是否显示打赏者列表
	showSponsorsList: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否在文章详情页底部显示打赏按钮
	showButtonInPost: true,

	// 打赏方式列表
	methods: [
		{
			name: "支付宝",
			icon: "fa7-brands:alipay",
			qrCode:
				"https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/alipay.webp",
			description: "使用 支付宝 扫码打赏",
			enabled: true,
		},
		{
			name: "微信",
			icon: "fa7-brands:weixin",
			qrCode:
				"https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/wechatpay.webp",
			description: "使用 微信 扫码打赏",
			enabled: true,
		},
	],

	// 打赏者列表（来自旧站赞赏名单）
	sponsors: [
		{
			name: "沚轩",
			amount: "¥0.01",
			date: "2026-03-20",
		},
		{
			name: "demei",
			amount: "¥6.66",
			date: "2026-03-20",
		},
		{
			name: "加加七",
			amount: "¥1",
			date: "2025-09-01",
		},
	],
};
