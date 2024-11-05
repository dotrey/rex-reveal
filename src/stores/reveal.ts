import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRevealStore = defineStore("revealStore", () => {
    const phase = ref<number>(0);
    const gender = ref<"boy" | "girl">("boy");

    const revealed = computed<boolean>(() => {
        return phase.value === 6;
    });

    const displayGender = computed<string>(() => {
        return gender.value.toString().toUpperCase();
    });

    return {
        phase, gender, displayGender
    }
});