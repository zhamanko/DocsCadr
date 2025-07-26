<script>
import axios from '@/axios';
import { showMessage, hideMessage } from '@/utils/message';

export default {
    name: "ComponentUpdateEmployees",
    props: {
        employee: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            position: '',
            full_name: '',
            isVPO: false,
            isZSU: false,
            invalidity: '',
            type_work: 'Основне місце роботи',
            rate: '1',
            bonus_percent: '',
            date_accepted: '',
        };
    },
    methods: {
        async SubmitForm() {
            if (!this.position) return showMessage('Оберіть посаду');
            if (!this.date_accepted) return showMessage('Оберіть дату прийняття');
            if (!this.rate) return showMessage('Заповніть поле \"Оклад\"');
            if (!this.bonus_percent && this.type_work === "Доплата") return showMessage('Заповніть поле \"Бонус доплати\"');

            const nameParts = this.full_name.trim().split(/\s+/);
            if (nameParts.length !== 3) {
                showMessage("ПІБ має складатися з трьох слів (Прізвище Імʼя По батькові)");
                return;
            }

            const payload = {
                full_name: this.full_name,
                VBO: this.isVPO ? 'Так' : null,
                invalidity: this.invalidity ? this.invalidity : null,
                position: this.position,
                rate: parseFloat(this.rate),
                bonus_percent: this.bonus_percent ? this.bonus_percent + '%' : null,
                note: this.type_work,
                start_date: this.formatDateToDDMMYYYY(this.date_accepted),
                ZSU: this.isZSU ? 'Так' : null,
            };

            try {
                await axios.post('/api/employees-update', payload);
                showMessage("Редактування успішно збережено");
                setTimeout(() => {
                    this.$emit('saved');
                }, 1000)
            } catch (err) {
                console.error('Помилка при збережені', err);
            }

        },
        formatDateToDDMMYYYY(dateStr) {
            const [yyyy, mm, dd] = dateStr.split('-');
            return `${dd}.${mm}.${yyyy}`;
        },
        formatDateToYYYYMMDD(dateStr) {
            const [dd, mm, yyyy] = dateStr.split('.');
            return `${yyyy}-${mm}-${dd}`;
        }
    },
    mounted() {
        if (this.employee) {
            this.full_name = this.employee.full_name;
            this.isVPO = this.employee.VBO === 'Так' ? true : false;
            this.isZSU = this.employee.ZSU === 'Так' ? true : false;
            this.invalidity = this.employee.invalidity || '';
            this.type_work = this.employee.work_type || 'Основне місце роботи';
            this.rate = this.employee.rate.toString();
            this.bonus_percent = this.employee.bonus_percent ? this.employee.bonus_percent.replace('%', '') : '';
            this.date_accepted = this.formatDateToYYYYMMDD(this.employee.start_date);
            this.selectedPositionId = this.employee.position_id;
            this.position = this.employee.position;
        }
    },
    watch: {
        type_work: {
            handler(newType) {
                if ((newType || "").includes('сумісництво') || (newType || "").includes('Доплата')) {
                    this.rate = "0.5"
                } else { this.rate = '1' };
            }
        }
    }
};
</script>

<template>
    <div class="fixed top-0 left-0 w-full h-full bg-[#0000007c] bg-opacity-50 z-50 flex items-center justify-center">
        <div class="flex flex-col p-4 bg-[#1d1e20] rounded-3xl shadow-lg w-full max-w-4xl">
            <div class="flex justify-between mb-4">
                <h1 class="text-xl font-semibold ml-3">Редагування</h1>
                <button class="hover:scale-115 transition" @click="$emit('close')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
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
                            <input type="text" name="position" v-model="position" class=
                                    'bg-[#23262b] flex-1 px-4 w-full text-white py-2 placeholder:text-gray-300 rounded-3xl hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition'
                                 placeholder="Артист сцени, машиніст цени,..." />
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
                                <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="none"
                                    stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>ВПО</span>
                        </label>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="ps-4 inline-flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" v-model="isZSU" class="peer hidden" />
                            <div
                                class="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition">
                                <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="none"
                                    stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>ЗСУ</span>
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
                        <select name="type_work" v-model="type_work"
                            class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                            <option value="Основне місце роботи">Основне місце роботи</option>
                            <option value="Внутрішнє сумісництво">Внутрішнє сумісництво</option>
                            <option value="Зовнішнє сумісництво">Зовнішнє сумісництво</option>
                            <option value="Доплата">Доплата</option>
                        </select>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="rate" class="ps-4">Оклад</label>
                        <select name="rate" v-model="rate"
                            class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                            <option v-if="type_work === 'Основне місце роботи'" value="1">Повна ставка</option>
                            <option value="0.5">Не повна ставка</option>
                        </select>
                    </div>

                    <div class="flex flex-col gap-2" v-if="type_work === 'Доплата'">
                        <label for="Bonus" class="ps-4">Бонус доплати %</label>
                        <input type="text" name="Bonus" v-model="bonus_percent"
                            class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                            placeholder="30">
                    </div>
                </div>
            </div>
            <button @click="SubmitForm"
                class="bg-[#263028] mt-4 text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">
                Зберегти</button>
        </div>

    </div>
</template>