import { defineType, defineField } from "sanity";

export const siteSettingType = defineType({
	name: "siteSetting",
	title: "Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "homePageIntroSectionText",
			title: "Home Page Intro Text",
			type: "text",
			description: "Intro paragraph shown on the home page",
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "aboutCompanyText",
			title: "About Company Text",
			type: "text",
			description: "Long-form about copy used on the About page",
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "missionText",
			title: "Mission Text",
			type: "text",
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "visionText",
			title: "Vision Text",
			type: "text",
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "values",
			title: "Values",
			type: "array",
			of: [
				{
					type: "object",
					name: "valueItem",
					title: "Value",
					fields: [
						{
							name: "icon",
							title: "Icon Name",
							type: "string",
							options: {
								list: [
									{ title: "Target", value: "Target" },
									{ title: "Eye", value: "Eye" },
									{ title: "Shield Check", value: "ShieldCheck" },
									{ title: "Shield", value: "Shield" },
								],
							},
							validation: (Rule: any) => Rule.required(),
						},
						{
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule: any) => Rule.required(),
						},
						{
							name: "description",
							title: "Description",
							type: "text",
							validation: (Rule: any) => Rule.required(),
						},
					],
				},
			],
		}),
	],
})

