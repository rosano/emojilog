<script>
export let EMLTrackTimerEventDate = null;
export let EMLTrackTimerText;

import { OLSK_SPEC_UI } from 'OLSKSpec'

import EMLTrackTimerLogic from './ui-logic.js';

const kBaseSize = 30;
const kLineSize = 5;

const mod = {

	// VALUE

	_ValueCurrentTime: new Date(),
	_ValueCurrentFrame: EMLTrackTimerLogic.EMLTrackTimerFrameInfinity(),

	// REACT

	ReactUpdate () {
		if (!EMLTrackTimerEventDate) {
			return;
		}

		mod._ValueCurrentFrame = EMLTrackTimerLogic.EMLTrackTimerFrame(EMLTrackTimerEventDate, mod._ValueCurrentTime = new Date());
	},

	// SETUP

	SetupEverything() {
		mod.ReactUpdate();

		if (OLSK_SPEC_UI()) {
			return;
		}

		window.setInterval(mod.ReactUpdate, 100);
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleDidLoad();

import OLSKSundial from 'OLSKSundial';
import OLSKProgressRing from 'OLSKProgressRing';
</script>

<div class="EMLTrackTimer">

{#if EMLTrackTimerEventDate }
	<OLSKSundial
		OLSKSundialBaseSize={ kBaseSize }
		OLSKSundialLineSize={ kLineSize }
		OLSKSundialLineCount={ EMLTrackTimerLogic.EMLTrackTimerLines()[mod._ValueCurrentFrame] }
		/>
	<OLSKProgressRing
		OLSKProgressRingBaseSize={ kBaseSize + 1.75 }
		OLSKProgressRingValue={ (mod._ValueCurrentTime - EMLTrackTimerEventDate) / mod._ValueCurrentFrame }
		/>
{/if}
<div class="EMLTrackTimerLabel">
	<span>{ EMLTrackTimerText }</span>
</div>

</div>

<style>
.EMLTrackTimer {
	height: 100px;
	width: 100px;

	position: relative;

	--OLSKSundialStrokeColor: #777;

	/* EMLTrackTimerFlexbox:Parent */
	display: flex;
	align-items: center;
	justify-content: center;
}

.EMLTrackTimer :global(svg) {
	position: absolute;
	top: 0;
	left: 0;
}

.EMLTrackTimerLabel {
	max-width: 60px;
	padding-top: 5px;
	overflow: hidden;
	text-overflow: ellipsis;

	font-size: 40px;
	white-space: nowrap;
}
</style>
