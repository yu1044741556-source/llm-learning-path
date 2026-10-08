<script setup>
defineProps({
  percent: { type: Number, default: 0 },
  doneCount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
})
</script>

<template>
  <div class="progress-box">
    <div class="progress-top">
      <b>学习进度</b>
      <span>{{ doneCount }} / {{ total }} 已完成 · {{ percent }}%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>
