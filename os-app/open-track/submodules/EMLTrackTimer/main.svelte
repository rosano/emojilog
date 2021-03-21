<script>
export let EMLTrackTimerEventDate;
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

<OLSKSundial
	OLSKSundialBaseSize={ kBaseSize }
	OLSKSundialLineSize={ kLineSize }
	OLSKSundialLineCount={ EMLTrackTimerLogic.EMLTrackTimerLines()[mod._ValueCurrentFrame] }
	/>
<OLSKProgressRing
	OLSKProgressRingBaseSize={ kBaseSize + 1.75 }
	OLSKProgressRingValue={ (mod._ValueCurrentTime - EMLTrackTimerEventDate) / mod._ValueCurrentFrame }
	/>
<div class="EMLTrackTimerLabel">
	<span>{ EMLTrackTimerText }</span>
</div>

</div>

<style>
.EMLTrackTimer {
	position: relative;

	--OLSKSundialStrokeColor: #777;
}

.EMLTrackTimer :global(svg), .EMLTrackTimerLabel {
	position: absolute;
	top: 0;
	left: 0;
}

.EMLTrackTimerLabel {
	width: 100px;
	height: 100px;
	padding-top: 3px;

	font-size: 40px;

	/* EMLTrackTimerLabelFlexbox:Parent */
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
