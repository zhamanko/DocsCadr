<script>
import axios from '@/axios';
import { showMessage, hideMessage } from '@/utils/message';

export default {
    name: "ComponentAddEmployees",
    data() {
        return {
            search: '',
            freePostions: [],
            filteredOptions: [],
            showDropdown: false,
            selectedPositionFreeRate: null,

            full_name: '',
            isVPO: false,
            invalidity: '',
            type_work: 'Основне місце роботи',
            rate: '',
            bonus_percent: '',
            date_accepted: '',
            selectedPositionId: null,
        };
    },
    methods: {
        filterOptions() {
            const value = this.search.trim().toLowerCase();
            this.filteredOptions = value
                ? this.freePostions.filter(item => item.position.toLowerCase().includes(value))
                : [];
        },
        selectOption(option) {
            this.search = `${option.position}`;
            this.selectedPositionId = option.id;
            this.selectedPositionFreeRate = option.free_rate;
            this.showDropdown = false;
        },
        handleClickOutside(event) {
            const container = this.$refs.container;
            if (container && !container.contains(event.target)) {
                this.showDropdown = false;
            }
        },
        async fetchFreePositions() {
            try {
                const response = await axios.get('/api/free-positions');
                this.freePostions = response.data;
            } catch (error) {
                console.error('Помилка при завантаженні вільних позицій', error);
            }
        },
        async SubmitForm() {
            if (!this.selectedPositionId) return showMessage('Оберіть посаду');
            if (!this.date_accepted) return showMessage('Оберіть дату прийняття');
            if (!this.rate) return showMessage('Заповніть поле \"Оклад\"');
            if (!this.bonus_percent && this.type_work === "Доплата") return showMessage('Заповніть поле \"Бонус доплати\"');

            const nameParts = this.full_name.trim().split(/\s+/);
            if (nameParts.length !== 3) {
                showMessage("ПІБ має складатися з трьох слів (Прізвище Імʼя По батькові)");
                return;
            }

            if(parseFloat(this.selectedPositionFreeRate) < parseFloat(this.rate)) return showMessage('Ставка занята')

            const payload = {
                full_name: this.full_name,
                VBO: this.isVPO ? 'Так' : null,
                invalidity: this.invalidity ? this.invalidity : null,
                position_id: this.selectedPositionId,
                rate: parseFloat(this.rate),
                bonus_percent: this.bonus_percent ? this.bonus_percent + '%' : null,
                note: this.type_work,
                start_date: this.formatDateToDDMMYYY(this.date_accepted),
            };

            try {
                await axios.post('/api/employees', payload);
                showMessage("Працівника додано!");
            } catch (err) {
                console.error('Помилка при збережені', err);
            }

        },
        formatDateToDDMMYYY(dateStr) {
            const [yyyy, mm, dd] = dateStr.split('-');
            return `${dd}.${mm}.${yyyy}`;
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
        this.fetchFreePositions();
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
};
</script>

<template>
    <div class="flex flex-col p-4">
        <div class="flex gap-9">
            <div class="flex flex-col gap-5 w-full">
                <div class="flex flex-col gap-2">
                    <label for="full_name" class="ps-4">Повне ім'я</label>
                    <input type="text" name="full_name" v-model="full_name"
                        class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                        placeholder="Іванич Іван Іванович">
                </div>

                <div class="flex flex-col gap-2">
                    <label for="position" class="ps-4">Посада</label>
                    <div class="relative" ref="container">
                        <input type="text" name="position" v-model="search" @input="filterOptions"
                            @focus="showDropdown = true" :class="[
                                'bg-[#23262b] flex-1 px-4 w-full text-white py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition',
                                filteredOptions.length && showDropdown ? 'rounded-t-3xl' : 'rounded-3xl'
                            ]" placeholder="Артист сцени, машиніст цени,..." />
                        <div v-if="showDropdown && filteredOptions.length"
                            class="absolute z-10 w-full border bg-[#23262b] border-none rounded-b-3xl max-h-40 overflow-y-auto overflow-x-auto shadow scrollbar-thin">
                            <div v-for="(option, index) in filteredOptions" :key="index"
                                class="px-3 py-2 hover:bg-[#2d3036] cursor-pointer" @click="selectOption(option)">
                                {{ option.position }} | {{ option.free_rate }} ставок
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="invalidity" class="ps-4">Інвалідність</label>
                    <select name="invalidity" v-model="invalidity"
                        class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                        <option value="">Немає</option>
                        <option value="I група">Ⅰ група</option>
                        <option value="ⅠⅠ група">ⅠⅠ група</option>
                        <option value="ⅠⅠⅠ група">ⅠⅠⅠ група</option>
                    </select>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="ps-4 inline-flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" v-model="isVPO" class="peer hidden" />
                        <div
                            class="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition">
                            <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="none" stroke="currentColor"
                                stroke-width="3" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span>ВПО</span>
                    </label>
                </div>

            </div>

            <div class="w-full flex flex-col gap-5">

                <div class="flex flex-col gap-2">
                    <label for="date_accepted" class="ps-4">Дата прийняття</label>
                    <input type="date" name="date_accepted" v-model="date_accepted"
                        class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                </div>

                <div class="flex flex-col gap-2">
                    <label for="type_work" class="ps-4">Тип працевлаштування</label>
                    <select name="type_work" id="" v-model="type_work"
                        class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                        <option value="Основне місце роботи">Основне місце роботи</option>
                        <option value="Внутрішнє сумісництво">Внутрішнє сумісництво</option>
                        <option value="Зовнішнє сумісництво">Зовнішнє сумісництво</option>
                        <option value="Доплата">Доплата</option>
                    </select>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="rate" class="ps-4">Оклад</label>
                    <input type="text" name="rate" v-model="rate"
                        class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                        placeholder="1">
                </div>

                <div class="flex flex-col gap-2" v-if="type_work === 'Доплата'">
                    <label for="Bonus" class="ps-4">Бонус доплати</label>
                    <input type="text" name="Bonus" v-model="bonus_percent"
                        class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                        placeholder="30">
                </div>
            </div>
        </div>
        <button @click="SubmitForm"
            class="bg-[#263028] mt-4 text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">
            Додати працівника</button>
    </div>
</template>