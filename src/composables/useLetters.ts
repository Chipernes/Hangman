import {computed, ref} from "vue";
import type {Ref} from "vue";

export const useLetters = (word: Ref<string>) => {
    const letters = ref<string[]>([]);
    const correctLetters = computed(() => letters.value.filter(x => word.value.includes(x)));
    const incorrectLetters = computed(() => letters.value.filter(x => !word.value.includes(x)));
    const isLose = computed(() => incorrectLetters.value.length === 6);
    const isWin = computed(() => [...word.value].every(x => correctLetters.value.includes(x)));
    const addLetter = (key: string) => {
        if (/^[a-zA-Z]$/.test(key)) {
            letters.value.push(key.toLowerCase());
        }
    };

    const resetLetters = () => {
        letters.value = [];
    }

    return {
        letters,
        correctLetters,
        incorrectLetters,
        isLose,
        isWin,
        addLetter,
        resetLetters
    }
}