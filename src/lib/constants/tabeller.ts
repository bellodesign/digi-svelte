export type KommandeAktivitet = {
	datum: string;
	aktivitet: string;
	ansvarig: 'Linda Karlsson' | 'Sofia Berg' | 'Marcus Nilsson';
	status: 'Planerad' | 'Pågår' | 'Klar';
};

export const KOMMANDE_AKTIVITETER: KommandeAktivitet[] = [
	{ datum: '2026-04-01', aktivitet: 'Teamdemo', ansvarig: 'Linda Karlsson', status: 'Planerad' },
	{ datum: '2026-04-02', aktivitet: 'Release', ansvarig: 'Marcus Nilsson', status: 'Pågår' },
	{
		datum: '2026-04-03',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Sofia Berg',
		status: 'Klar'
	},
	{ datum: '2026-04-04', aktivitet: 'Teamdemo', ansvarig: 'Marcus Nilsson', status: 'Planerad' },
	{ datum: '2026-04-05', aktivitet: 'Release', ansvarig: 'Sofia Berg', status: 'Klar' },
	{ datum: '2026-04-06', aktivitet: 'Teamdemo', ansvarig: 'Linda Karlsson', status: 'Pågår' },
	{
		datum: '2026-04-07',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Marcus Nilsson',
		status: 'Planerad'
	},
	{ datum: '2026-04-08', aktivitet: 'Release', ansvarig: 'Linda Karlsson', status: 'Klar' },
	{ datum: '2026-04-09', aktivitet: 'Teamdemo', ansvarig: 'Sofia Berg', status: 'Pågår' },
	{ datum: '2026-04-10', aktivitet: 'Release', ansvarig: 'Marcus Nilsson', status: 'Planerad' },
	{
		datum: '2026-04-11',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Linda Karlsson',
		status: 'Klar'
	},
	{ datum: '2026-04-12', aktivitet: 'Teamdemo', ansvarig: 'Sofia Berg', status: 'Planerad' },
	{ datum: '2026-04-13', aktivitet: 'Release', ansvarig: 'Linda Karlsson', status: 'Pågår' },
	{
		datum: '2026-04-14',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Sofia Berg',
		status: 'Pågår'
	},
	{ datum: '2026-04-15', aktivitet: 'Teamdemo', ansvarig: 'Marcus Nilsson', status: 'Klar' },
	{ datum: '2026-04-16', aktivitet: 'Release', ansvarig: 'Sofia Berg', status: 'Planerad' },
	{
		datum: '2026-04-17',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Linda Karlsson',
		status: 'Planerad'
	},
	{ datum: '2026-04-18', aktivitet: 'Teamdemo', ansvarig: 'Sofia Berg', status: 'Klar' },
	{ datum: '2026-04-19', aktivitet: 'Release', ansvarig: 'Marcus Nilsson', status: 'Klar' },
	{
		datum: '2026-04-20',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Marcus Nilsson',
		status: 'Pågår'
	},
	{ datum: '2026-04-21', aktivitet: 'Teamdemo', ansvarig: 'Linda Karlsson', status: 'Planerad' },
	{ datum: '2026-04-22', aktivitet: 'Release', ansvarig: 'Marcus Nilsson', status: 'Klar' },
	{
		datum: '2026-04-23',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Sofia Berg',
		status: 'Planerad'
	},
	{ datum: '2026-04-24', aktivitet: 'Teamdemo', ansvarig: 'Marcus Nilsson', status: 'Pågår' },
	{ datum: '2026-04-25', aktivitet: 'Release', ansvarig: 'Linda Karlsson', status: 'Klar' },
	{
		datum: '2026-04-26',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Sofia Berg',
		status: 'Klar'
	},
	{ datum: '2026-04-27', aktivitet: 'Teamdemo', ansvarig: 'Sofia Berg', status: 'Planerad' },
	{ datum: '2026-04-28', aktivitet: 'Release', ansvarig: 'Marcus Nilsson', status: 'Pågår' },
	{
		datum: '2026-04-29',
		aktivitet: 'Tillgänglighetsgranskning',
		ansvarig: 'Linda Karlsson',
		status: 'Pågår'
	},
	{ datum: '2026-04-30', aktivitet: 'Teamdemo', ansvarig: 'Linda Karlsson', status: 'Klar' }
];
