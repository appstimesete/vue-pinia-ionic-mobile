<template>
  <ion-footer class="ion-no-border">
    <ion-toolbar>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="search" href="/explore">
            <ion-icon :icon="searchOutline" />
            <ion-label>{{ $t("Explore") }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="logoWechat" href="/chat">
            <ion-icon :icon="logoWechat" />
            <ion-label>{{ $t("Chat") }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="appsSharp" href="/application">
            <ion-icon :icon="appsSharp" />
            <ion-label>{{ $t("Application") }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="person" href="/profile">
            <ion-icon :icon="person" />
            <ion-label>{{ $t("Profile") }}</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { 
  IonFooter, 
  IonToolbar, 
  IonTabs, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonLabel, 
  IonIcon 
} from '@ionic/vue';
import { searchOutline, logoWechat, appsSharp, person } from 'ionicons/icons';
import {userDarkModeStore} from "@/store";

export default defineComponent({
  components: {
    IonFooter, 
    IonToolbar, 
    IonTabs, 
    IonRouterOutlet, 
    IonTabBar, 
    IonTabButton, 
    IonLabel, 
    IonIcon 
  },
  setup() {
    const darkMode = userDarkModeStore();
    const is_dark_mode = computed(() => darkMode.prefersDark);
    const imgUrl = computed(() => {
      return is_dark_mode.value ? 'assets/images/header.svg' : `assets/images/header.svg`;
    });
    return {imgUrl, searchOutline, logoWechat, appsSharp, person};
  }
});
</script>

<style scoped>
ion-toolbar {
  --background: transparent;
}
ion-tab-bar {
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
}
.tab-selected {
  color: #00aeef;
}
</style>