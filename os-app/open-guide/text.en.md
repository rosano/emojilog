<div class="OLSKDecorNotice">

This document is a work-in-progress. Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).

</div>

Emoji Log helps you measure your progress by making it simple to track when meaningful steps are taken.

It is inspired by a philosophy of taking the smallest step possible, also known as [Kaizen](https://rosano.hmm.garden/01em4bgta0g35sd74nt8p6wkkb).

# Sundials

Time is visually represented in a circle with divisions based on the duration:

<table class="EMLGuideSundialLegend">

<tr>
	<td>OLSKSundial:EMLTrackTimerLines:EMLTrackTimerFrameMinute</td>
	<td>OLSKSundial:EMLTrackTimerLines:EMLTrackTimerFrameHour</td>
	<td>OLSKSundial:EMLTrackTimerLines:EMLTrackTimerFrameDay</td>
	<td>OLSKSundial:EMLTrackTimerLines:EMLTrackTimerFrameWeek</td>
	<td>OLSKSundial:EMLTrackTimerLines:EMLTrackTimerFrameMonth</td>
	<td>OLSKSundial:EMLTrackTimerLines:EMLTrackTimerFrameYear</td>
	<td>OLSKSundial:EMLTrackTimerLines:EMLTrackTimerFrameInfinity</td>
</tr>
<tr>
	<td>EMLTrackTimerFrameMinuteText</td>
	<td>EMLTrackTimerFrameHourText</td>
	<td>EMLTrackTimerFrameDayText</td>
	<td>EMLTrackTimerFrameWeekText</td>
	<td>EMLTrackTimerFrameMonthText</td>
	<td>EMLTrackTimerFrameYearText</td>
	<td>EMLTrackTimerFrameInfinityText</td>
</tr>
</table>

# Shortcuts

<div class="OLSKDecorNotice">

*AccessKey* refers to a one or more shortcut keys followed by a single character. Usually it's `Alt` on Windows or `Control+Alt` on macOS, but it changes [based on your browser and operating system](https://www.w3schools.com/tags/att_global_accesskey.asp#table2).

*Launcher* refers to the app's command runner: press `Alt+Enter`, type the command, then press `Enter` to run.

</div>

| List of journals ||
:--- | ---
| EMLTrackMasterCreateButtonText | `AccessKey+n` |
| `EMLTrackLauncherItemImportJSONText` | Launcher |
| `EMLTrackLauncherItemExportJSONText` | Launcher |

| List of memos ||
:--- | ---
| Create new card | `AccessKey+n` |
| Select previous or next card, if filter field is focused | `Up` or `Down` |
| Clear filter text and selected card, focus filter field | `Escape` |
| Close, if filter field is focused | `Escape` |
| `EMLTrackLauncherItemExportSelectedJSONText` | Launcher |
| `EMLBrowseInfoLauncherItemDebugText` | Launcher |

| Global ||
:--- | ---
| `OLSKRemoteStorageLauncherItemOpenLoginLinkText` | Launcher |
| `OLSKServiceWorkerLauncherItemReloadText` | Launcher |
| `OLSKServiceWorkerLauncherItemDebugForceUpdateText` | Launcher |
| Launcher | `Alt+Enter` |

| Global (when cloud is connected) ||
:--- | ---
| `OLSKRemoteStorageLauncherItemCopyLoginLinkText` | Launcher |
| `OLSKFundLauncherItemEnterClueText` | Launcher |
| `OLSKFundLauncherItemClearClueText` | Launcher |
| `OLSKRemoteStorageLauncherItemDebugFlushDataText` | Launcher |

# Add to Home screen on mobile and tablet devices

This web app can be 'installed' and used as if it were a native mobile app (with an icon, working without internet access, running as a standalone app outside of the browser).

1. [Open the app](EMLTrackRoute) in your browser, then follow the steps based on your operating system:

## iOS + Safari
2. Tap the Share button <img height="22" valign="middle" alt="Share button icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharediOSShare.svg" />
3. Tap *Add to Home Screen* <img height="22" valign="middle" alt="Add to Home Screen icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharediOSA2HS.svg">

## Android + Chrome
2. Tap the More button <img height="22" valign="middle" alt="More button icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharedAndroidMore.svg" />
3. Tap *Add to home screen*

# What are remoteStorage and Fission?

[remoteStorage](https://remotestorage.io) and [Fission](https://fission.codes) are open protocols for synchronizing data between multiple devices. Both take the level of control and flexibility of something like email and bring it to your personal data. You could think of it as a USB key for your documents that you can plug into websites to work on your stuff.

You can get a remoteStorage account for free from [5apps](https://5apps.com/storage/) or [host your own](https://wiki.remotestorage.io/Servers).

You can get a Fission account for free from [Fission Auth](https://auth.fission.codes) or [setup your own server](https://github.com/fission-suite/fission-suite).
