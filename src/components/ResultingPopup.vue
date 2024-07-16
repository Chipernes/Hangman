<script setup lang="ts">

import {ref} from "vue";
import type {GameStatus} from "@/types/GameStatus";

type Props = {
  word: string
}

defineProps<Props>()

const gameStatus = ref<GameStatus | null>(null);
const isVisible = ref(false);
const open = (status: GameStatus) => {
  gameStatus.value = status;
  isVisible.value = true;
};
const close = () => {
  isVisible.value = false;
};

defineExpose({
  open,
  close
})

const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>

<template>
  <div v-show="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Congratulations, you have won! 😃</h2>
      <template v-else>
        <h2>You lose. 😕</h2>
        <h3>...word is: {{ word }}</h3>
      </template>
      <button @click="emit('restart')">Play again</button>
    </div>
  </div>
</template>