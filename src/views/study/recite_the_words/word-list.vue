<template>
    <GaTop @leftClick="back" left="返回"></GaTop>
    <div class="demo-collapse">
        <el-card>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(item, index) in list" :title="item.title" :name="index">
                    <div class="unit">
                        <el-card style="width: 250px;cursor: pointer;" v-for="unit in item.units"
                            @click="startStudy(unit)">第{{ unit.replace('unit', '') }}单元</el-card>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import GaTop from '@/components/game/Ga-Top.vue';
import router from '@/router';
import { ref } from 'vue';

const activeName = ref(0)
const list = [
    {
        title: '七年级上册',
        units: ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'unit13', 'unit14', 'unit15', 'unit16', 'unit17', 'unit18', 'unit19', 'unit20'],
    }, {
        title: '七年级下册',
        units: ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'unit13', 'unit14', 'unit15', 'unit16', 'unit17', 'unit18', 'unit19', 'unit20'],
    }, {
        title: '八年级上册',
        units: ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'unit13', 'unit14', 'unit15', 'unit16', 'unit17', 'unit18', 'unit19', 'unit20'],
    }, {
        title: '八年级下册',
        units: ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'unit13', 'unit14', 'unit15', 'unit16', 'unit17', 'unit18', 'unit19', 'unit20'],
    }, {
        title: '九年级上册',
        units: ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'unit13', 'unit14', 'unit15', 'unit16', 'unit17', 'unit18', 'unit19', 'unit20'],
    }, {
        title: '九年级下册',
        units: ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'unit13', 'unit14', 'unit15', 'unit16', 'unit17', 'unit18', 'unit19', 'unit20'],
    }
]
const startStudy = (unit: string) => {
    router.push({
        path: '/study/study',
        query: {
            unit
        }
    })
}
const back = () => {
    router.push('/')
}
</script>

<style lang="less" scoped>
.demo-collapse {
    margin: 10px;

    .unit {
        display: flex;
        flex-wrap: wrap;

        div {
            margin: 10px;
        }
    }
}
</style>