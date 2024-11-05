<script setup lang="ts">
import { useRevealStore } from '@/stores/reveal';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';

const animationDuration = ref<number>(30);
const style = computed<string>(() => {
    return `--anim-duration: ${animationDuration.value}s`
});
const reveal = useRevealStore();
</script>

<template>
    <div class="container" :style="style" :class="{
    boy: reveal.phase === 6 && reveal.gender === 'boy',
    girl: reveal.phase === 6 && reveal.gender === 'girl',        
    }">
        <div class="red"></div>
        <div class="blue"></div>
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
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;

    --position-red: 0%;
    --position-blue: 0%;
}

.container.girl {
    grid-template-columns: 100% 0;
}

.container.boy {
    grid-template-columns: 0 100%;
}

.red {
    background-color: #bd0000;
}

.red::before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: max(200dvh, 200dvw);
    background-image: url('@/assets/img/noise-cubes.png');
    background-position-x: center;
    background-position-y: bottom;
    background-repeat: repeat;
    background-size: 100%;
    mix-blend-mode: multiply;
    animation: slideRed var(--anim-duration) linear infinite;
}

.blue {
    background-color: #0000bd;
}

.blue::before {
    display: block;
    content: "";
    position: absolute;
    top: min(-100dvh, -100dvw);
    left: 0;
    width: 100%;
    height: max(200dvh, 200dvw);
    background-image: url('@/assets/img/noise-smooth.png');
    background-position-x: center;
    background-position-y: top;
    background-repeat: repeat;
    background-size: 100%;
    mix-blend-mode: multiply;
    animation: slideBlue var(--anim-duration) linear infinite;
}

@keyframes slideRed {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(min(-100dvh, -100dvw));
  }
}

@keyframes slideBlue {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(max(100dvh, 100dvw));
  }
}
</style>