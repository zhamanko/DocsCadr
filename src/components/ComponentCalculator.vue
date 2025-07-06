<script>
export default {
    name: 'ComponentCalculator',
    data() {
        return {
            inputData: {
                startDate: '',
                endDate: '',
                usedDays: 0,
                vacationPerYear: 24,
                additionalDays: 7,
                sickDays: 0,
                unpaidLeaveDays: 0
            }
        };
    },
    methods: {
        sendData() {
            this.$emit('input-data', this.inputData);
        }
    }
};
</script>

<template>
    <form class="flex flex-col w-full gap-4">
        <div>
            <label for="startDate" class="block mb-2">Дата початку:</label>
            <input type="date" v-model="inputData.startDate" @input="sendData"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Дата закінчення:</label>
            <input type="date" v-model="inputData.endDate" @input="sendData"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Використано днів відпустки:</label>
            <input type="number" v-model="inputData.usedDays" @input="sendData"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Відпустка на рік:</label>
            <input type="number" v-model="inputData.vacationPerYear" @input="sendData"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Додаткові дні:</label>
            <input type="number" v-model="inputData.additionalDays" @input="sendData"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Лікарняні дні:</label>
            <input type="number" v-model="inputData.sickDays" @input="sendData"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Відпустка без збереження:</label>
            <input type="number" v-model="inputData.unpaidLeaveDays" @input="sendData"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
    </form>
</template>