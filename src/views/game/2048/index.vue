<template>
  <GaTop @leftClick="back" left="返回"></GaTop>
  <div ref="myDiv">这是一个div</div>
  <button @click="addContent">添加内容</button>
</template>

<script setup>
import { ref, nextTick } from "vue";
import router from '@/router';
import GaTop from '@/components/game/Ga-Top.vue';

// 创建一个 ref 对象来引用 DOM 元素
const myDiv = ref(null);

// 返回
const back = () => {
    console.log('返回')
    router.push('/') 
}
// 定义添加内容的函数
const addContent = async () => {
  // 检查 myDiv 是否已经正确引用到 DOM 元素
  if (myDiv.value) {
    // 创建一个新的 p 元素
    const newP = document.createElement("p");
    // 设置 p 元素的文本内容
    newP.textContent = "新的内容";
    // 将 p 元素添加到 myDiv 所引用的 DOM 元素中
    myDiv.value.appendChild(newP);

    // 等待 DOM 更新完成
    await nextTick();
    // 打印新添加的 p 元素的文本内容
    console.log(myDiv.value.lastChild.textContent);
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
