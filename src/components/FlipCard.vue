<script setup lang="ts">
import { useRevealStore } from '@/stores/reveal';
import { computed, ref } from 'vue';

const reveal = useRevealStore();

const backgroundAlpha = ref<number>(0);
const rotation = ref<number>(0);
const style = computed<string>(() => {    
    return `--rotation: ${rotation.value}deg; --background: ${backgroundAlpha.value};`
});

const rotating = ref<boolean>(false);
let rotationSpeed: number = 1;
const maxSpeed: number = 20;
const minSpeed: number = 5;
let startTime: number = 0;


const totalDuration: number = 20;
const phaseDuration: number = totalDuration / 6;

function update(timestamp: number) {
    if (!startTime) {
        startTime = timestamp;
    }
    const ellapsed: number = (timestamp - startTime) / 1000;
    const phase: number = Math.floor(ellapsed / phaseDuration);
    reveal.phase = phase;
    const phaseProgress: number = (ellapsed - phaseDuration * phase) / phaseDuration;

    switch (phase) {
        case 0:
            rotationSpeed = maxSpeed * phaseProgress;
            break;
        case 1:
            rotationSpeed = minSpeed + ((maxSpeed - minSpeed) * (1 - phaseProgress));
            break;
        case 2:
            rotationSpeed = minSpeed;
            break;
        case 3:
            rotationSpeed = minSpeed + ((maxSpeed - minSpeed) * phaseProgress);
            break;
        case 4:
            rotationSpeed = maxSpeed;
            break;
        case 5:
            rotationSpeed = maxSpeed * (1 - phaseProgress)
            backgroundAlpha.value = phaseProgress;
            break;
        case 6:
            rotationSpeed = 0;
            break;
    }

    rotation.value = (rotation.value + rotationSpeed) % 360;

    if (phase < 6) {
        window.requestAnimationFrame(update);
    } else {
        rotating.value = false;
    }
}

function start() {
    startTime = 0;
    backgroundAlpha.value = 0;
    reveal.phase = 0;
    rotating.value = true;
    window.requestAnimationFrame(update);
}

</script>

<template>
    <div class="container" :class="[`phase-${reveal.phase}`]" :style="style">
        <div class="card" :class="{rotating}" @click="start">
            <div class="front">click to reveal</div>
            <div class="back">
                ???
                <div class="monty"></div>
            </div>
        </div>
        <div class="reveal" @click="start">
            <span>
                It's a <br>
                <span class="large">{{ reveal.displayGender }}</span>
            </span>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: grid;
    place-items: center;

    --rotation: 0deg;
    --background: 0;

    background-color: rgba(0,0,0, var(--background));
    transition: background-color 0.2s ease;
}

.container.phase-6 {
    background-color: transparent;
}

.card {
    background-color: transparent;
    border: 3px solid rgb(226, 204, 81);
    width: 40rem;
    aspect-ratio: 16/9;
    transform-style: preserve-3d;
    font-size: 200%;
}

.card.rotating {
    transform: rotateY(var(--rotation));
}

.front, .back {    
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    display: grid;
    place-items: center;
}

.front {
    background-color: var(--c-background);
}

.back {
    background-color: var(--c-background-alt);
    transform: rotateY(180deg);
}

.monty {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/monty.jpg');
    background-position: center;
    background-size: cover;
    opacity: 0;
    transition: opacity 3s ease;
}

.phase-1 .monty, .phase-2 .monty {
    opacity: 1;
}

.phase-6 .card {
    display: none;
}

.reveal {
    border: 3px solid rgb(226, 204, 81);
    width: 40rem;
    aspect-ratio: 16/9;
    background-color: var(--c-background);
    display: none;
    place-items: center;
}

.reveal span {
    text-align: center;
}

.reveal .large {
    font-size: 400%;
    line-height: 1;
}

.phase-6 .reveal {
    display: grid;
}
</style>