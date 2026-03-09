import type { PageServerLoad } from './$types';
import af25Data from '@designsystem-se/af/dist/digi-arbetsformedlingen/styles/src/tokens-documentation/web-AF25.json';
import webData from '@designsystem-se/af/dist/digi-arbetsformedlingen/styles/src/tokens-documentation/web.json';

type ExportRec = 'Exportera' | 'Valfri' | 'Ej nödvändig';

export type ColorToken = {
	key: string;
	cssVar: string;
	tailwindVar: string;
	value: string;
	description: string;
	alias: string;
	export: ExportRec;
};

export type PrimitiveToken = {
	key: string;
	cssVar: string;
	tailwindVar: string;
	value: string;
	exampleClass: string;
};

export type ColorGroup = {
	category: string;
	label: string;
	tokens: ColorToken[];
};

const ALIAS_MAP: Record<string, string> = {
	// Text
	'text--primary': 'text-default',
	'text--secondary': 'text-inverse',
	'text--description': 'text-muted',
	'text--interactive--brand-primary': 'text-brand',
	'text--interactive--primary': 'text-cta',
	// Background
	'background--primary': 'bg-default',
	'background--secondary': 'bg-subtle',
	'background--brand-primary': 'bg-brand',
	'background--interactive--default--primary': 'bg-interactive',
	'background--interactive--hover--primary': 'bg-interactive-hover',
	'background--interactive--selected--primary': 'bg-interactive-selected',
	'background--interactive--default--input-elements': 'bg-input',
	'background--sentiment--error--primary': 'bg-error',
	'background--sentiment--success--primary': 'bg-success',
	'background--sentiment--warning--primary': 'bg-warning',
	'background--sentiment--info--primary': 'bg-info',
	'background--notification': 'bg-notification',
	// Border
	'border--interactive--default--primary': 'border-interactive',
	'border--interactive--default--on-input': 'border-input',
	'border--accent--primary': 'border-accent',
	'border--interactive--validation--success': 'border-success',
	'border--interactive--validation--error': 'border-error',
	'border--interactive--validation--warning': 'border-warning',
	// Icon
	'icon--primary': 'icon-default',
	'icon--secondary': 'icon-inverse',
	'icon--brand-primary': 'icon-brand',
	'icon--validation--success': 'icon-success',
	'icon--validation--error': 'icon-error',
	'icon--validation--warning': 'icon-warning',
	// Sentiment
	'sentiment--informative--500': 'color-info',
	'sentiment--error--500': 'color-error',
	'sentiment--success--500': 'color-success',
	'sentiment--warning--500': 'color-warning',
};

const CATEGORY_LABELS: Record<string, string> = {
	text: 'Text',
	background: 'Bakgrund',
	border: 'Ramlinje',
	icon: 'Ikon',
	sentiment: 'Sentiment',
	marking: 'Markering',
	divider: 'Avdelare',
	misc: 'Övrigt',
	infographic: 'Infografik',
	grayscale: 'Gråskala'
};

const CATEGORY_ORDER = [
	'text',
	'background',
	'border',
	'icon',
	'sentiment',
	'marking',
	'divider',
	'misc',
	'infographic',
	'grayscale'
];

function getExportRec(key: string): ExportRec {
	if (key.startsWith('grayscale--')) return 'Ej nödvändig';
	if (key.startsWith('misc--')) return 'Ej nödvändig';
	if (key.includes('--transparent')) return 'Ej nödvändig';
	if (key.startsWith('infographic--')) return 'Ej nödvändig';
	if (key.startsWith('marking--')) return 'Valfri';
	if (key.startsWith('divider--')) return 'Valfri';
	if (key.startsWith('sentiment--') && !key.endsWith('--500')) return 'Valfri';
	if (key.includes('--notification')) return 'Valfri';
	if (key.includes('--inverted')) return 'Valfri';
	if (key.includes('--quarternary') || key.includes('--quaternary')) return 'Valfri';
	if (/--tertiary/.test(key)) return 'Valfri';
	if (key.includes('--on-brand-') || key.includes('--on-menu-')) return 'Valfri';
	if (key.includes('--secondary-accent') || key.includes('--secondary-muted')) return 'Valfri';
	if (key.includes('--pop-out')) return 'Valfri';
	return 'Exportera';
}

type AF25Entry = {
	digiCSSVariable: string;
	digiRecursiveValue: string;
	description?: string;
};

type WebToken = {
	value: string;
	name: string;
	attributes: { category: string; type: string; item?: string; subitem?: string };
};

export const load: PageServerLoad = () => {
	const af25 = af25Data as Record<string, AF25Entry>;

	const colorsByCategory: Record<string, ColorToken[]> = {};

	for (const [key, entry] of Object.entries(af25)) {
		const category = key.split('--')[0];
		if (!colorsByCategory[category]) colorsByCategory[category] = [];
		colorsByCategory[category].push({
			key,
			cssVar: entry.digiCSSVariable,
			tailwindVar: '--color-' + key.replace(/--/g, '-'),
			value: entry.digiRecursiveValue,
			description: entry.description ?? '',
			alias: ALIAS_MAP[key] ?? '',
			export: getExportRec(key)
		});
	}

	const colorGroups: ColorGroup[] = CATEGORY_ORDER.map((cat) => ({
		category: cat,
		label: CATEGORY_LABELS[cat] ?? cat,
		tokens: colorsByCategory[cat] ?? []
	})).filter((g) => g.tokens.length > 0);

	const web = webData as WebToken[];
	const globalTokens = web.filter((t) => t.attributes?.category === 'global');

	const spacing: PrimitiveToken[] = globalTokens
		.filter((t) => t.attributes.type === 'spacing')
		.sort((a, b) => (a.attributes.item ?? '').localeCompare(b.attributes.item ?? ''))
		.map((t) => ({
			key: t.attributes.item ?? '',
			cssVar: `--${t.name}`,
			tailwindVar: `--spacing-${t.attributes.item}`,
			value: t.value,
			exampleClass: `p-${t.attributes.item}, m-${t.attributes.item}, gap-${t.attributes.item}`
		}));

	const radius: PrimitiveToken[] = web
		.filter((t) => t.attributes?.category === 'border-radius')
		.sort((a, b) => (a.attributes.type ?? '').localeCompare(b.attributes.type ?? ''))
		.map((t) => ({
			key: t.attributes.type ?? '',
			cssVar: `--${t.name}`,
			tailwindVar: `--radius-${t.attributes.type}`,
			value: t.value,
			exampleClass: `rounded-${t.attributes.type}`
		}));

	const fontSizes: PrimitiveToken[] = globalTokens
		.filter((t) => t.attributes.type === 'typography' && t.attributes.item === 'font-size')
		.sort((a, b) => (a.attributes.subitem ?? '').localeCompare(b.attributes.subitem ?? ''))
		.map((t) => ({
			key: t.attributes.subitem ?? '',
			cssVar: `--${t.name}`,
			tailwindVar: `--text-${t.attributes.subitem}`,
			value: t.value,
			exampleClass: `text-${t.attributes.subitem}`
		}));

	return { colorGroups, spacing, radius, fontSizes };
};
