<template>
    <div class="container">
        <el-card v-for="(item, index) in list" :title="item.title" :name="index" class="card"
        @click="gotoGame(item.path)">{{ item.title }}</el-card>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';

const list = [
    {
        title: '2048小游戏',
        path: '/2048',
    }, {
        title: '单词练习',
        path: '/study/list',
    }
]
const gotoGame = (path: string) => {
    router.push(path)
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
}
.card {
    width: 250px;
    cursor: pointer;
    margin: 15px;
}
</style>