<script setup lang="ts">
type Props = {
  incorrectLetters: string[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="incorrectLetters.length" class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Incorrect letters</p>
      <span v-for="(letter, index) in incorrectLetters" :key="index">
        {{ index === incorrectLetters.length - 1 ? letter : letter + ', ' }}
      </span>
    </div>
  </div>
</template>