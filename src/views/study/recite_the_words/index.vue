<template>
    <el-progress :percentage="percentage / words.length * 100" :show-text="false" />
    <GaTop @leftClick="back" left="返回"></GaTop>
    <div class="container" @click="setFocus">
        <div class="zh">{{ words[percentage].zh }}</div>
        <div class="transcription">{{ words[percentage].phonetic_transcription }}</div>
        <div class="en">
            <input v-for="char in currentWord.word" name="wordInput" @input="input"
                :style="{ width: (char.length * 13) + 'px' }" autocomplete="off" />
        </div>
        <!-- 如果是手机界面 -->
        <div class="mobile" v-show="isMobile">
            <el-button @click="tip">提示</el-button>
            <el-button @click="previous">上一个</el-button>
            <el-button @click="next">下一个</el-button>
            <el-button @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import GaTop from '@/components/game/Ga-Top.vue';
import deviceType from '@/plugins/deviceType';
import mkAlert from '@/plugins/mkAlert';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { onMounted, onBeforeUnmount, ref } from 'vue';

// 是否是手机界面
const isMobile = deviceType.isMobile();

// 本单元单词列表
const words = [{ "zh": "单元", "en": "unit", "phonetic_transcription": "/ˈjuːnɪt/" },
{ "zh": "过渡单元", "en": "starter", "phonetic_transcription": "/ˈstɑːtə(r)/" },
{ "zh": "部分；地区", "en": "section", "phonetic_transcription": "/ˈsekʃn/" },
{ "zh": "招呼；问候", "en": "greet", "phonetic_transcription": "/ɡriːt/" },
{ "zh": "每个；各自", "en": "each", "phonetic_transcription": "/iːtʃ/" },
{ "zh": "另外的人（或物）；另外的；其他的", "en": "other", "phonetic_transcription": "/ˈʌðə(r)/" },
{ "zh": "互相；彼此", "en": "each other", "phonetic_transcription": "/iːtʃ ˈʌðə(r)/" },
{ "zh": "哦；啊", "en": "oh", "phonetic_transcription": "/əʊ/" },
{ "zh": "每人；所有人", "en": "everyone", "phonetic_transcription": "/ˈevriwʌn/" },
{ "zh": "开始；着手", "en": "start", "phonetic_transcription": "/stɑːt/" },
{ "zh": "谈话；交谈", "en": "conversation", "phonetic_transcription": "/ˌkɒnvəˈseɪʃn/" },
{ "zh": "用字母拼；拼写", "en": "spell", "phonetic_transcription": "/spel/" },
{ "zh": "铃（声）；钟（声）", "en": "bell", "phonetic_transcription": "/bel/" },
{ "zh": "海伦", "en": "Helen", "phonetic_transcription": "/ˈhelən/" },
{ "zh": "埃拉", "en": "Ella", "phonetic_transcription": "/ˈelə/" },
{ "zh": "埃玛", "en": "Emma", "phonetic_transcription": "/ˈemə/" },
{ "zh": "彼得", "en": "Peter", "phonetic_transcription": "/ˈpiːtə(r)/" },
{ "zh": "布朗", "en": "Brown", "phonetic_transcription": "/braʊn/" },
{ "zh": "中华人民共和国", "en": "PRC", "phonetic_transcription": "/ˌpiː ɑː(r) ˈsiː/" },
{ "zh": "中国人民解放军", "en": "PLA", "phonetic_transcription": "/ˌpiː el ˈeɪ/" },
{ "zh": "虚拟现实", "en": "VR", "phonetic_transcription": "/ˌviː ˈɑː(r)/" },
{ "zh": "世界卫生组织", "en": "WHO", "phonetic_transcription": "/ˌdʌbljuː eɪtʃ ˈəʊ/" },
{ "zh": "联合国", "en": "UN", "phonetic_transcription": "/ˌjuː ˈen/" },
{ "zh": "米勒", "en": "Miller", "phonetic_transcription": "/ˈmɪlə(r)/" }]
//当前进度
const percentage = ref(0)
//当前单词
const currentWord = ref({
    word: ['']
})
// 初始化
const init = (_percentage: number) => {
    // 清空所有input
    document.getElementsByName('wordInput').forEach((item) => {
        const input = item as HTMLInputElement;
        input.value = ''
    })
    currentWord.value.word = words[percentage.value].en.split(' ')
}
// 输入
const input = (event: Event) => {
    let e = event as InputEvent
    // 禁止输入中文和空格
    if (e.data && e.data.match(/[\u4e00-\u9fa5]/) || e.data == ' ' || e.data == '`') {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(e.data, '');
    }
}
// 提交
const submit = () => {
    //依次比较
    let pass = true;
    document.getElementsByName('wordInput').forEach((item, index) => {
        const input = item as HTMLInputElement;
        if (input.value != currentWord.value.word[index]) {
            // 错误
            pass = false
            // 修改样式并激活动画
            input.classList.add('error');
            setTimeout(() => {
                input.classList.remove('error');
            }, 300); // 动画持续1秒
        }
    })
    if (pass) {
        // 正确
        next()
    } else {
        // 错误
        ElMessage.error('错误')
    }
}
// 提示
const tip = () => {
    // 提示当前单词
    mkAlert(words[percentage.value].en, 3000)
}
// 下一个
const next = () => {
    if (percentage.value == words.length - 1) {
        // 最后一个
        ElMessage.success('恭喜你，完成了本单元的学习')
        back()
        return
    }
    init(percentage.value++)
}
// 上一个
const previous = () => {
    if (percentage.value == 0) {
        // 第一个
        return
    }
    init(percentage.value--)
}
// 设置焦点
const setFocus = () => {
    // 获取当前焦点的input
    const input = document.activeElement as HTMLInputElement;
    if (!input || input.name != 'wordInput') {
        // 获取所有name为wordInput的input
        const inputs = document.getElementsByName('wordInput');
        // 获取第一个input
        const firstInput = inputs[0] as HTMLInputElement;
        // 设置焦点
        firstInput.focus()
    }
}
// 分词
const segment = () => {
    // 获取当前焦点的input
    const input = document.activeElement as HTMLInputElement;
    if (input && input.name == 'wordInput') {
        // 获取下一个input
        const nextInput = input.nextElementSibling as HTMLInputElement;
        if (nextInput && input.name == 'wordInput') {
            nextInput.focus();
        }
    }
}
// 键盘事件
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        submit()
    } else if (e.key === '`') {
        tip()
        e.preventDefault()
    } else if (e.key === 'ArrowRight') {
        next()
    } else if (e.key === 'ArrowLeft') {
        previous()
    } else if (e.key === ' ') {
        segment()
    } else if (e.key.match(/[a-zA-Z]/)) {
        // 获取当前焦点的input
        setFocus()
    }
    // 组合键
    if (e.ctrlKey && e.key === 'z') {
        // 撤销
        previous() 
    }
}
// 返回
const back = () => {
    console.log('返回')
    router.push('/study/list') 
}
onBeforeUnmount(() => {
    // 移除键盘事件
    window.removeEventListener('keydown', handleKeydown);
})

onMounted(() => {
    // 获取参数
    // const query = router.currentRoute.value.query as unknown as string;
    init(0)
    // 监听键盘事件
    window.addEventListener('keydown', handleKeydown);
})
</script>

<style lang="less" scoped>
:deep(.el-progress-bar__outer) {
    height: 12px !important;
}
:deep(.top){
    position: absolute;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 12px);
    justify-content: center;
    font-size: 24px;

    .transcription {
        margin: 20px 0 50px 0;
    }
}

.en {
    display: flex;
    input {
        margin-right: 10px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #000;
        outline: none;
        text-align: center;
        font-size: 24px;
    }

    .error {
        color: red;
        animation: shake 0.3s ease-in-out 3;
    }

    @keyframes shake {
        0% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(-5px);
        }

        50% {
            transform: translateX(5px);
        }

        75% {
            transform: translateX(-5px);
        }

        100% {
            transform: translateX(0);
        }
    }
}
.mobile {
    display: flex;
    margin-top: 20px;
    button {
        margin-right: 10px;
    }
}
</style>