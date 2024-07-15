<script setup lang="ts">

import GameHeader from "@/components/GameHeader.vue";
import GameFigure from "@/components/GameFigure.vue";
import WrongLetters from "@/components/WrongLetters.vue";
import GuessedWord from "@/components/GuessedWord.vue";
import ResultingPopup from "@/components/ResultingPopup.vue";
import InfoNotification from "@/components/InfoNotification.vue";
</script>

<template>
  <GameHeader/>
  <div class="game-container">
    <GameFigure/>

    <WrongLetters/>

    <GuessedWord/>
  </div>

  <ResultingPopup v-if="false"/>

  <InfoNotification/>
</template>

<style scoped>

</style>