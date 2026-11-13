<template>
  <div class="flex items-center gap-2 sm:gap-3 md:gap-4 justify-start">
    <div
      v-for="(_, index) in length"
      :key="index"
      class="relative"
    >
      <input
        :ref="el => inputRefs[index] = el as HTMLInputElement"
        type="text"
        inputmode="text"
        autocapitalize="characters"
        :maxlength="length"
        placeholder="-"
        :value="digits[index]"
        @input="onInput($event, index)"
        @keydown="onKeyDown($event, index)"
        @paste="onPaste($event, index)"
        @focus="onFocus($event)"
        class="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border border-slate-300/90 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-center text-lg md:text-xl font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition-all uppercase"
        :aria-label="`Digit ke-${index + 1} kode sekolah`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    length?: number
    modelValue?: string
  }>(),
  {
    length: 6,
    modelValue: ''
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'complete', value: string): void
}>()

const digits = ref<string[]>(Array(props.length).fill(''))
const inputRefs = ref<(HTMLInputElement | null)[]>([])

// Sinkronisasi dari modelValue prop jika ada perubahan dari luar
watch(
  () => props.modelValue,
  (newVal) => {
    const chars = (newVal || '').toUpperCase().slice(0, props.length).split('')
    digits.value = Array.from({ length: props.length }, (_, i) => chars[i] || '')
  },
  { immediate: true }
)

const emitValue = () => {
  const code = digits.value.join('').toUpperCase()
  emit('update:modelValue', code)
  if (code.length === props.length && !digits.value.includes('')) {
    emit('complete', code)
  }
}

const onFocus = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  target.select()
}

const onInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const rawVal = target.value.replace(/\s+/g, '').toUpperCase()

  // 1. Jika pengguna menempel (PASTE) string lebih dari 2 karakter di HP / Desktop
  if (rawVal.length > 2) {
    const cleanChars = rawVal.slice(0, props.length).split('')
    cleanChars.forEach((ch, idx) => {
      const targetIdx = index === 0 ? idx : Math.min(index + idx, props.length - 1)
      if (targetIdx < props.length) {
        digits.value[targetIdx] = ch
      }
    })
    target.value = digits.value[index] || ''
    emitValue()
    const nextIdx = Math.min(index + cleanChars.length, props.length - 1)
    nextTick(() => {
      inputRefs.value[nextIdx]?.focus()
      inputRefs.value[nextIdx]?.select()
    })
    return
  }

  // 2. Jika input dikosongkan
  if (rawVal.length === 0) {
    digits.value[index] = ''
    emitValue()
    return
  }

  // 3. Jika pengguna mengetik 2 karakter dalam 1 kotak yang sudah terisi
  let char = rawVal
  if (rawVal.length === 2) {
    const prevChar = digits.value[index]
    char = rawVal.startsWith(prevChar) ? rawVal.slice(1) : rawVal.slice(-1)
  }

  digits.value[index] = char
  target.value = char
  emitValue()

  // Fokus ke input berikutnya jika belum di input terakhir
  if (char && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
      inputRefs.value[index + 1]?.select()
    })
  }
}

const onKeyDown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace') {
    if (!digits.value[index] && index > 0) {
      // Jika kotak ini kosong, mundur ke kotak sebelumnya dan hapus
      event.preventDefault()
      digits.value[index - 1] = ''
      emitValue()
      nextTick(() => {
        inputRefs.value[index - 1]?.focus()
      })
    } else {
      digits.value[index] = ''
      emitValue()
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    event.preventDefault()
    inputRefs.value[index + 1]?.focus()
  }
}

const onPaste = (event: ClipboardEvent, index: number = 0) => {
  event.preventDefault()
  const pasted = (event.clipboardData?.getData('text') || '').trim()
  if (!pasted) return

  const cleanChars = pasted.replace(/\s+/g, '').toUpperCase().slice(0, props.length).split('')

  cleanChars.forEach((ch, idx) => {
    const targetIdx = index === 0 ? idx : Math.min(index + idx, props.length - 1)
    if (targetIdx < props.length) {
      digits.value[targetIdx] = ch
    }
  })

  emitValue()

  const nextIdx = Math.min(index + cleanChars.length, props.length - 1)
  nextTick(() => {
    inputRefs.value[nextIdx]?.focus()
    inputRefs.value[nextIdx]?.select()
  })
}
</script>
