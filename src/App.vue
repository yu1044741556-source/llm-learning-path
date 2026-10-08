<script setup>
import { computed } from 'vue'
import { stages } from './data/learningPath'
import { resetAll, useProgressStats } from './composables/useProgress'
import ProgressBar from './components/ProgressBar.vue'
import StageSection from './components/StageSection.vue'

const numerals = ['一', '二', '三', '四', '五']

const allKeys = computed(() => stages.flatMap((stage) => stage.projects.map((p) => p.repo)))
const { total, doneCount, percent } = useProgressStats(allKeys)

function onReset() {
  if (window.confirm('确定要清空所有学习进度吗？该操作不可撤销。')) {
    resetAll()
  }
}
</script>

<template>
  <div class="wrap">
    <header>
      <h1>大模型（LLM）学习路径规划</h1>
      <p>
        从「完全零基础」到「能训练、能部署、能做应用」的一条循序渐进路线。每个项目都标注了定位、优势与劣势，按阶段顺序推进即可，不必同时开太多。
      </p>
      <span class="hint">一个阶段吃透再进入下一个；卡片右上角可勾选记录进度，自动保存到本地</span>
    </header>

    <section class="overview">
      <div class="overview-top">
        <h2>路径总览</h2>
        <button class="reset" type="button" @click="onReset">重置进度</button>
      </div>
      <div class="steps">
        <div
          v-for="(stage, index) in stages"
          :key="stage.id"
          class="step"
          :class="'color-' + (index + 1)"
        >
          <b>阶段{{ numerals[index] }}</b>{{ stage.title }}
        </div>
      </div>
      <ProgressBar :percent="percent" :done-count="doneCount" :total="total" />
    </section>

    <StageSection
      v-for="(stage, index) in stages"
      :key="stage.id"
      :stage="stage"
      :index="index + 1"
    />

    <footer>
      <p>链接均指向 GitHub 开源仓库，Star 数与活跃度会随时间变化，请以仓库当前状态为准。</p>
    </footer>
  </div>
</template>
