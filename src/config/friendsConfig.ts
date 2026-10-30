import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置（对齐旧站 links.yml + 新站 Astro/Firefly 栈）
export const friendsConfig: FriendLink[] = [
	{
		title: "❖星港◎Star☆",
		imgurl: "https://bu.dusays.com/2025/04/11/67f92f6fcfb26.webp",
		desc: "以博客记录生活与热爱！",
		siteurl: "https://blog.starsharbor.com",
		tags: ["Friend"],
		weight: 12,
		enabled: true,
	},
	{
		title: "张洪Heo",
		imgurl: "https://img.zhheo.com/i/67d8fa75943e4.webp",
		desc: "分享设计与科技生活",
		siteurl: "https://blog.zhheo.com/",
		tags: ["Blog"],
		weight: 11,
		enabled: true,
	},
	{
		title: "Solitude",
		imgurl: "https://s2.loli.net/2024/10/10/hOTRIKV4vy6EMf2.webp",
		desc: "一个卡片UI主题，适用于 Hexo",
		siteurl: "https://solitude.js.org/",
		tags: ["Theme"],
		weight: 10,
		enabled: true,
	},
	{
		title: "Hexo",
		imgurl:
			"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg",
		desc: "快速、简单且强大的网站框架",
		siteurl: "https://hexo.io/zh-cn/",
		tags: ["Framework"],
		weight: 9,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites",
		siteurl: "https://astro.build",
		tags: ["Framework"],
		weight: 8,
		enabled: true,
	},
	{
		title: "Firefly",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "基于 Astro 的清新现代化个人博客主题",
		siteurl: "https://github.com/CuteLeaf/Firefly",
		tags: ["Theme"],
		weight: 7,
		enabled: true,
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
