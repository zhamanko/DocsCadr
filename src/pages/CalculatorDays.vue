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
        };
    },
    methods: {
        handleInputData(data) {
            this.days = this.calculatorDays(data.startDate, data.endDate);
            if (this.days > 365) {
                showMessage("Кількість днів перевищує 365 днів");
                return;
            }else if (this.days < 0) {
                showMessage("Кількість днів не може бути від'ємною");
                return;
            }else {
                hideMessage();
            }
            this.annualCompensation = this.calculatorAnnual(data.usedDays, data.vacationPerYear);
            this.additionalCompensation = this.calculatorAdditional(data.additionalDays, data.sickDays, data.unpaidLeaveDays);
        },
        calculatorDays(dateStart, dateEnd){
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
        calculatorAnnual(usedDays, vacationPerYear) {
            const compensation = (this.days / 365) * vacationPerYear - usedDays;
            return compensation >= 0 ? compensation.toFixed(2) : "――";
        },
        calculatorAdditional(additionalDays, sickDays, unpaidLeaveDays) {
            const compensation = additionalDays * (this.days - sickDays - unpaidLeaveDays) / 365;
            return compensation >= 0 ? compensation.toFixed(2) : "――";
        },
        roundNum(number){
            if (number === "――") {
                return "――";
            }
            return Math.round(number);
        }
    },
};

</script>

<template>
    <div class="flex justify-center items-center gap-6">
        <div class="flex flex-col w-1/2 lg:w-1/3 items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
            <h1 class="text-3xl font-bold mb-4">Калькулятор днів</h1>
            <ComponentCalculator @input-data="handleInputData" />
        </div>
        <div class="flex flex-col w-1/3 items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
            <div class="text-lg text-center">
                <p>Днів роботи: <br> <span>{{ this.days }}</span> </p>
                <p>Щорічна компенсація: <br> <span>{{ roundNum(this.annualCompensation) }}</span> </p>
                <p>Додаткові компенсація: <br> <span>{{ roundNum(this.additionalCompensation) }}</span> </p>
            </div>
            <hr class="border-b-0.1 w-full border-white" />
            <div class="text-center">
                <div class="mb-4">
                    <p>Формула щорічної компесації:</p>
                    <p>дні_роботи ÷ 365 × Відпустка_на_рік - використано_відустки = <br> <span>{{ this.annualCompensation }}</span></p>
                </div>
                <div>
                    <p>Формула додаткові компесації:</p>
                    <p>ставка_додаткових × (дні_роботи - лікарняні - без_збереження) ÷ 365 = <br> <span>{{ this.additionalCompensation }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>