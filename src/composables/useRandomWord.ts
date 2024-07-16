import {ref, onMounted} from "vue";
import {fetchRandomWord} from "@/api/fetchRandomWord";

export const useRandomWord = () => {
    const word = ref('');
    const getRandomWord = async () => {
        try {
            const randomWord = await fetchRandomWord()
            word.value = randomWord.toLowerCase();
        } catch (err) {
            console.log(err);
            word.value = '';
        }
    }

    onMounted(() => {
        getRandomWord();
    });

    return {
        word,
        getRandomWord
    }
}