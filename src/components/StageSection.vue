<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
  stage: { type: Object, required: true },
  index: { type: Number, required: true },
})
</script>

<template>
  <section class="stage" :class="'color-' + index">
    <div class="stage-head">
      <div class="stage-no">{{ stage.no }}</div>
      <h2>{{ stage.title }}</h2>
    </div>
    <p class="stage-sub">{{ stage.subtitle }}</p>

    <div class="grid">
      <ProjectCard v-for="project in stage.projects" :key="project.repo" :project="project" />
    </div>
  </section>
</template>
