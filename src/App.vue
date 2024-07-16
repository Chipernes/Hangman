<script setup lang="ts">

import GameHeader from "@/components/GameHeader.vue";
import GameFigure from "@/components/GameFigure.vue";
import WrongLetters from "@/components/WrongLetters.vue";
import GuessedWord from "@/components/GuessedWord.vue";
import ResultingPopup from "@/components/ResultingPopup.vue";
import InfoNotification from "@/components/InfoNotification.vue";
import {ref, watch} from "vue";
import {useRandomWord} from "@/composables/useRandomWord";
import {useLetters} from "@/composables/useLetters";
import {useNotification} from "@/composables/useNotification";

const { word, getRandomWord } = useRandomWord();
const { letters, correctLetters, incorrectLetters, isLose, isWin, addLetter, resetLetters } = useLetters(word);
const { notification, showNotification } = useNotification();
const popup = ref<InstanceType<typeof ResultingPopup> | null>(null);
const restart = async () => {
  await getRandomWord();
  resetLetters();
  popup.value?.close();
};

watch(incorrectLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose');
  }
});

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win');
  }
});

window.addEventListener('keydown', ({key}) => {
  if (isLose.value || isWin.value) {
    return;
  }

  if (letters.value.includes(key)) {
    showNotification();
  }

  addLetter(key);
});
</script>

<template>
  <GameHeader/>
  <div class="game-container">
    <GameFigure
        :incorrect-letters-count="incorrectLetters.length"
    />
    <WrongLetters
        :incorrect-letters="incorrectLetters"
    />
    <GuessedWord
        :word="word"
        :correct-letters="correctLetters"
    />
  </div>
  <ResultingPopup
      @restart="restart"
      :word="word"
      ref="popup"
  />
  <InfoNotification ref="notification"/>
</template>