<script setup>
import { computed } from 'vue'
import { isDone, toggle } from '../composables/useProgress'

const props = defineProps({
  project: { type: Object, required: true },
})

const complete = computed(() => isDone(props.project.repo))

function onToggle() {
  toggle(props.project.repo)
}
</script>

<template>
  <article class="card" :class="{ done: complete }">
    <label class="check" title="勾选记录学习进度">
      <input type="checkbox" :checked="complete" @change="onToggle" />
      <span>已学完</span>
    </label>

    <h3>
      <a :href="project.url" target="_blank" rel="noopener">{{ project.title }}</a>
    </h3>
    <div class="repo">github.com/{{ project.repo }}</div>
    <p class="desc">{{ project.desc }}</p>

    <div class="tags">
      <span v-for="tag in project.tags" :key="tag.text" class="tag" :class="tag.type">
        {{ tag.text }}
      </span>
    </div>

    <div class="pc">
      <div class="row pro">
        <span class="lab">优势</span>
        <span class="txt">{{ project.pros }}</span>
      </div>
      <div class="row con">
        <span class="lab">劣势</span>
        <span class="txt">{{ project.cons }}</span>
      </div>
    </div>
  </article>
</template>
