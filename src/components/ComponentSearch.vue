<template>
  <div class="relative w-full" ref="dropdown">
    <input
      type="text"
      :placeholder="placeholder"
      class="bg-[#23262b] w-full flex-1 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
      v-model="search"
      @focus="isOpen = true"
      @keydown.down.prevent="highlightNext"
      @keydown.up.prevent="highlightPrev"
      @keydown.enter.prevent="selectHighlighted"
    />

    <ul
      v-show="isOpen && filteredOptions.length"
      class="absolute mt-1 w-full bg-[#23262b] border border-[#23262b] rounded-lg max-h-60 overflow-auto shadow-lg z-50"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @mousedown.prevent="select(option)"
        :class="[
          'px-4 py-2 cursor-pointer',
          index === highlightedIndex ? 'bg-blue-500 text-white' : 'hover:bg-[#424750]'
        ]"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ComponentSearch',
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Введіть для пошуку...'
    }
  },
  data() {
    return {
      search: this.modelValue,
      isOpen: false,
      highlightedIndex: -1
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter(opt =>
        opt.position.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  watch: {
    modelValue(newVal) {
      this.search = newVal;
    }
  },
  methods: {
    select(option) {
      this.search = option;
      this.$emit('update:modelValue', option);
      this.isOpen = false;
      this.highlightedIndex = -1;
    },
    highlightNext() {
      if (this.highlightedIndex < this.filteredOptions.length - 1) {
        this.highlightedIndex++;
      }
    },
    highlightPrev() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    selectHighlighted() {
      const selected = this.filteredOptions[this.highlightedIndex];
      if (selected) {
        this.select(selected);
      }
    },
    handleClickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
ul::-webkit-scrollbar {
  width: 8px;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 4px;
}
</style>
