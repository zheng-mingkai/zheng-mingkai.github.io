<template>
  <div class="top">
    <div class="button-div">
      <el-button type="primary" v-if="props.left" @click="leftClick" :icon="ArrowLeft">{{ props.left }}</el-button>
    </div>
    <div class="button-div">
      <el-button type="primary" v-if="props.right" @click="rightClick">{{ props.right }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from "@element-plus/icons-vue";
const props = defineProps({
  left: {
    type: String,
    default: "",
  },
  right: {
    type: String,
    default: "", 
  }
});
// 定义 leftClick 事件
const emit = defineEmits(['leftClick', 'rightClick']); 
const leftClick = () => {
  emit("leftClick");
};
const rightClick = () => {
  emit("rightClick"); 
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
</style>
