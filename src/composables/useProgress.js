import { computed, ref } from 'vue'

const STORAGE_KEY = 'llm-learning-path-progress'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (error) {
    return {}
  }
}

const done = ref(load())

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done.value))
  } catch (error) {
    /* 忽略隐私模式等无法写入的场景 */
  }
}

export function isDone(key) {
  return !!done.value[key]
}

export function toggle(key) {
  const next = { ...done.value }
  if (next[key]) {
    delete next[key]
  } else {
    next[key] = true
  }
  done.value = next
  persist()
}

export function resetAll() {
  done.value = {}
  persist()
}

export function useProgressStats(keys) {
  const total = computed(() => keys.value.length)
  const doneCount = computed(() => keys.value.filter((key) => !!done.value[key]).length)
  const percent = computed(() =>
    total.value ? Math.round((doneCount.value / total.value) * 100) : 0,
  )
  return { total, doneCount, percent }
}
