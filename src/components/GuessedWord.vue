<script setup lang="ts">
type Props = {
  word: String,
  correctLetters: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" :key="index" class="letter">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>