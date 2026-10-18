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
        inputmode="numeric"
        maxlength="1"
        placeholder="-"
        :value="digits[index]"
        @input="onInput($event, index)"
        @keydown="onKeyDown($event, index)"
        @paste="onPaste($event)"
        class="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border border-slate-300/90 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-center text-lg md:text-xl font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition-all"
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
    const chars = (newVal || '').slice(0, props.length).split('')
    digits.value = Array.from({ length: props.length }, (_, i) => chars[i] || '')
  },
  { immediate: true }
)

const emitValue = () => {
  const code = digits.value.join('')
  emit('update:modelValue', code)
  if (code.length === props.length && !digits.value.includes('')) {
    emit('complete', code)
  }
}

const onInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const val = target.value.trim()

  if (val.length === 0) {
    digits.value[index] = ''
    emitValue()
    return
  }

  // Ambil karakter terakhir jika pengguna mengetik saat sudah ada angka
  const char = val.slice(-1)
  digits.value[index] = char
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

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text') || ''
  const cleanChars = pasted.replace(/\s+/g, '').slice(0, props.length).split('')

  cleanChars.forEach((ch, idx) => {
    if (idx < props.length) {
      digits.value[idx] = ch
    }
  })

  emitValue()

  // Fokus ke kotak berikutnya setelah karakter paste terakhir
  const nextIdx = Math.min(cleanChars.length, props.length - 1)
  nextTick(() => {
    inputRefs.value[nextIdx]?.focus()
  })
}
</script>
