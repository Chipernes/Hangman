<script setup lang="ts">

import GameHeader from "@/components/GameHeader.vue";
import GameFigure from "@/components/GameFigure.vue";
import WrongLetters from "@/components/WrongLetters.vue";
import GuessedWord from "@/components/GuessedWord.vue";
import ResultingPopup from "@/components/ResultingPopup.vue";
import InfoNotification from "@/components/InfoNotification.vue";
import {computed, ref, watch} from "vue";
import axios from "axios";

const word = ref('');
const getRandomWord = async () => {
  try {
    const {data} = await axios.get<string[]>('https://random-word-api.herokuapp.com/word');
    word.value = data[0].toLowerCase();
  } catch (err) {
    console.log(err);
    word.value = '';
  }
}

getRandomWord();

const letters = ref<string[]>([]);
const correctLetters = computed(() => letters.value.filter(x => word.value.includes(x)));
const incorrectLetters = computed(() => letters.value.filter(x => !word.value.includes(x)));
const isLose = computed(() => incorrectLetters.value.length === 6);
const isWin = computed(() => [...word.value].every(x => correctLetters.value.includes(x)));
const notification = ref<InstanceType<typeof InfoNotification> | null>(null);
const popup = ref<InstanceType<typeof ResultingPopup> | null>(null);

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
    notification.value?.open();
    setTimeout(() => notification.value?.close(), 2000);
    return;
  }

  if (/[a-zA-Z]/.test(key)) {
    letters.value.push(key.toLowerCase());
  }
});

const restart = async () => {
  await getRandomWord();
  letters.value = [];
  popup.value?.close();
};
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