<script lang="ts">
	import { resolve } from '$app/paths';
	import { SITE_NAME } from '$lib/constants';
</script>

<digi-footer af-variation="small">
	<div slot="content-top">
		<div>
			<digi-footer-card af-type="icon">
				<ul>
					<li>
						<a href={resolve('/')}>
							<digi-icon-accessibility-universal></digi-icon-accessibility-universal>
							Tillgänglighetsredogörelse
						</a>
					</li>
					<li>
						<a href={resolve('/')}>
							<digi-icon-sign></digi-icon-sign>
							Teckenspråk
						</a>
					</li>
					<li>
						<a href={resolve('/')}>
							<digi-icon-globe></digi-icon-globe>
							Other languages
						</a>
					</li>
					<li>
						<a href={resolve('/')}>
							<digi-icon-envelope></digi-icon-envelope>
							Mejla vår funktionbrevlåda
						</a>
					</li>
				</ul>
			</digi-footer-card>
		</div>
		<div>
			<digi-footer-card af-type="border">
				<a href={resolve('/')}>Om tjänsten {SITE_NAME}</a>
				<p>
					Systemversion: 1.4.0 <br />
					 Ansvarig: Jenny Svensson
				</p>
			</digi-footer-card>
		</div>
		<div>
			<digi-footer-card af-type="border">
				<a href={resolve('/')}>Kontakta servicedesk</a>
				<p>
					Telefon: 0771-60 0001 <br />
					 Öppettider: Vardagar 08:00-16:30
				</p>
			</digi-footer-card>
		</div>
	</div>
	<div slot="content-bottom-left">
		<digi-link af-href={resolve('/')} hideVisitedColor>
			<digi-logo af-variation="large" af-color="secondary"></digi-logo>
		</digi-link>
	</div>
</digi-footer>
