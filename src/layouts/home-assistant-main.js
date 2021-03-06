import Polymer from '../polymer';

import '../layouts/partial-cards';
import '../layouts/partial-logbook';
import '../layouts/partial-history';
import '../layouts/partial-map';
import '../layouts/partial-dev-call-service';
import '../layouts/partial-dev-fire-event';
import '../layouts/partial-dev-set-state';
import '../layouts/partial-dev-template';
import '../layouts/partial-dev-info';
import '../managers/notification-manager';
import '../dialogs/more-info-dialog';
import '../dialogs/ha-voice-command-dialog';

export default new Polymer({
  is: 'home-assistant-main',

  behaviors: [window.hassBehavior],

  properties: {
    hass: {
      type: Object,
    },

    narrow: {
      type: Boolean,
      value: true,
    },

    activePane: {
      type: String,
      bindNuclear: hass => hass.navigationGetters.activePane,
      observer: 'activePaneChanged',
    },

    isSelectedStates: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('states'),
    },

    isSelectedHistory: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('history'),
    },

    isSelectedMap: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('map'),
    },

    isSelectedLogbook: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('logbook'),
    },

    isSelectedDevEvent: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('devEvent'),
    },

    isSelectedDevState: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('devState'),
    },

    isSelectedDevTemplate: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('devTemplate'),
    },

    isSelectedDevService: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('devService'),
    },

    isSelectedDevInfo: {
      type: Boolean,
      bindNuclear: hass => hass.navigationGetters.isActivePane('devInfo'),
    },

    showSidebar: {
      type: Boolean,
      value: false,
      bindNuclear: hass => hass.navigationGetters.showSidebar,
    },
  },

  listeners: {
    'open-menu': 'openMenu',
    'close-menu': 'closeMenu',
  },

  openMenu() {
    if (this.narrow) {
      this.$.drawer.openDrawer();
    } else {
      this.hass.navigationActions.showSidebar(true);
    }
  },

  closeMenu() {
    this.$.drawer.closeDrawer();
    if (this.showSidebar) {
      this.hass.navigationActions.showSidebar(false);
    }
  },

  activePaneChanged() {
    if (this.narrow) {
      this.$.drawer.closeDrawer();
    }
  },

  attached() {
    window.removeInitMsg();
    this.hass.startUrlSync();
  },

  computeForceNarrow(narrow, showSidebar) {
    return narrow || !showSidebar;
  },

  detached() {
    this.hass.stopUrlSync();
  },
});
