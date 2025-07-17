<script>
export default {
    name: "ComponentAddEmployees",
    data() {
        return {
            search: '',
            allOption: [
                'Костюмер',
                'Начальник',
                'Директор',
                'Заступник'
            ],
            filteredOptions: [],
            showDropdown: false
        };
    },
    methods: {
        filterOptions() {
            const value = this.search.trim().toLowerCase();
            if (value === '') {
                this.filteredOptions = [];
                return;
            }
            this.filteredOptions = this.allOption.filter(name =>
                name.toLowerCase().includes(value)
            );
        },
        selectOption(option) {
            this.search = option;
            this.showDropdown = false;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.showDropdown = false;
            }
        },
        mounted() {
            document.addEventListener('click', this.handleClickOutside);
        },
        beforeUnmount() {
            document.removeEventListener('click', this.handleClickOutside);
        },
    }
}
</script>

<template>
    <div class="p-4 flex gap-9">
        <div class="w-full">
            <div class="flex flex-col gap-2">
                <label for="full_name" class="ps-4">Повне ім'я</label>
                <input type="text" name="full_name"
                    class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                    placeholder="Іванич Іван Іванович">
            </div>
            <div class="flex flex-col gap-2">
                <label for="full_name" class="ps-4">Повне ім'я</label>
                <div class="relative ">
                    <input type="text" name="full_name" v-model="search" @input="filterOptions"
                        @focus="showDropdown = true"
                        class="bg-[#23262b] flex-1 px-4 w-full text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                        placeholder="Іванич Іван Іванович" />
                    <div v-if="showDropdown && filteredOptions.length"
                        class="absolute z-10 w-full border bg-[#23262b] border-none rounded-3xl max-h-40 overflow-y-auto overflow-x-auto shadow scrollbar-thin">
                        <div v-for="(option, index) in filteredOptions" :key="index"
                            class="px-3 py-2 hover:bg-[#2d3036] cursor-pointer" @click="selectOption(option)">
                            {{ option }}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="w-full">
            <div class="flex flex-col gap-2">
                <label for="full_name" class="ps-4">Повне ім'я</label>
                <input type="text" name="full_name"
                    class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                    placeholder="Іванич Іван Іванович">
            </div>
        </div>
    </div>
</template>