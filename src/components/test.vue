<script lang="ts" setup>

    


import { ref } from 'vue';

// 定义一个接口，表示一个函数
interface Greet {
  (name: string): string;
}

// 定义一个 greet 函数，并确保它符合 Greet 接口
const greet: Greet = (name) => {
  return `Hello, ${name}!`;
};

const message = ref<string>(greet('Vue'));
</script>

<template>
  <div>{{ message }}</div>
</template>
