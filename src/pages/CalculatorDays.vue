<script>
import ComponentCalculator from '@/components/ComponentCalculator.vue';
import { showMessage, hideMessage } from '@/utils/message';


export default {
    name: 'CalculatorDays',
    components: {
        ComponentCalculator
    },
    data() {
        return {
            days: "――",
            annualCompensation: "――",
            additionalCompensation: "――",

            staDate: '',
            calDate: '',
            res: '――',

            typeCalculator: 'компенсації',
        };
    },
    methods: {
        // Компенсації
        calculateWorkDays(dateStart, dateEnd) {
            const start = new Date(dateStart);
            const end = new Date(dateEnd);
            if (end < start) {
                showMessage("Дата закінчення не може бути раніше дати початку");
                return "――";
            }
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return diffDays > 0 ? diffDays : "――";
        },

        // Розрахунок дати закінчення
        calculateEndDate() {
            if (!this.staDate || !this.calDate || isNaN(this.calDate)) {
                this.res = '――';
                return;
            }

            const start = new Date(this.staDate);
            const days = parseInt(this.calDate);

            if (isNaN(start.getTime()) || days < 1) {
                this.res = '――';
                return;
            }

            start.setDate(start.getDate() + (days - 1));
            this.res = start.toLocaleDateString('uk-UA');
        },

        calculatorAnnual(usedDays, vacationPerYear) {
            const compensation = (this.days / 365) * vacationPerYear - usedDays;
            return compensation >= 0 ? compensation.toFixed(2) : "――";
        },
        calculatorAdditional(additionalDays, sickDays, unpaidLeaveDays) {
            const compensation = additionalDays * (this.days - sickDays - unpaidLeaveDays) / 365;
            return compensation >= 0 ? compensation.toFixed(2) : "――";
        },
        roundNum(number) {
            if (number === "――") {
                return "――";
            }
            return Math.round(number);
        },
        handleInputData(data) {
            console.log("Обробка вхідних даних:", data);
            this.days = this.calculateWorkDays(data.startDate, data.endDate); 
            if (this.days > 365) {
                showMessage("Кількість днів перевищує 365 днів");
                return;
            } else if (this.days < 0) {
                showMessage("Кількість днів не може бути від'ємною");
                return;
            } else {
                hideMessage();
            }
            this.annualCompensation = this.calculatorAnnual(data.usedDays, data.vacationPerYear);
            this.additionalCompensation = this.calculatorAdditional(data.additionalDays, data.sickDays, data.unpaidLeaveDays);
        }
    },
    watch: {
        staDate(newVal) {
            if (newVal && this.calDate) {
                this.calculateEndDate(); 
            }
        },
        calDate(newVal) {
            if (newVal && this.staDate) {
                this.calculateEndDate();
            }
        }
    },
    watch: {
        staDate(newVal) {
            if (newVal && this.calDate) {
                this.calculatorDays();
            }
        },
        calDate(newVal) {
            if (newVal && this.staDate) {
                this.calculatorDays();
            }
        }
    },
};

</script>

<template>
    <div>
        <div class="bg-[#1d1e20] h-16 w-1/3 m-4 flex flex-row items-center px-6 shadow-lg rounded-3xl">
            <p class="mr-4">Калькулятор:</p>
            <select v-model="typeCalculator"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                <option value="компенсації">компенсації</option>
                <option value="дати">дати</option>
            </select>
        </div>


        <div class="flex justify-center items-center gap-6">
            <div v-if="typeCalculator === 'дати'"
                class="flex flex-col w-1/2 lg:w-1/3 items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
                <h1 class="text-3xl font-bold mb-4">Калькулятор днів</h1>
                <div class="w-full text-lg">
                    <label for="startDate" class="block mb-2">Дата початку:</label>
                    <input type="date" v-model="staDate"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div class="w-full text-lg">
                    <label for="calDate" class="block mb-2">Календарних днів</label>
                    <input type="number" v-model="calDate"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <p class="text-lg">Дата закінчення: <span>{{ res }}</span></p>
            </div>

            <div v-else-if="typeCalculator === 'компенсації'" class="flex items-center gap-6">
                <div class="flex flex-col w-1/2 items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
                    <h1 class="text-3xl font-bold mb-4">Калькулятор днів</h1>
                    <ComponentCalculator @input-data="handleInputData" />
                </div>
                <div class="flex flex-col w-1/2 items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
                    <div class="text-lg text-center">
                        <p>Днів роботи: <br> <span>{{ this.days }}</span> </p>
                        <p>Щорічна компенсація: <br> <span>{{ roundNum(this.annualCompensation) }}</span> </p>
                        <p>Додаткові компенсація: <br> <span>{{ roundNum(this.additionalCompensation) }}</span> </p>
                    </div>
                    <hr class="border-b-0.1 w-full border-white" />
                    <div class="text-center">
                        <div class="mb-4">
                            <p>Формула щорічної компесації:</p>
                            <p>дні_роботи ÷ 365 × Відпустка_на_рік - використано_відустки = <br> <span>{{
                                this.annualCompensation }}</span></p>
                        </div>
                        <div>
                            <p>Формула додаткові компесації:</p>
                            <p>ставка_додаткових × (дні_роботи - лікарняні - без_збереження) ÷ 365 = <br> <span>{{
                                this.additionalCompensation }}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>