<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
            <h1 class="text-3xl font-bold mb-4">Калькулятор днів</h1>
            <form @submit.prevent="calculateDays" class="flex flex-col w-full gap-4">
                <div>
                    <label for="startDate" class="block mb-2">Дата початку</label>
                    <input type="date"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="date"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="number"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="number"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="number"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="number"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="number"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="number"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <div>
                    <label for="endDate" class="block mb-2">Дата закінчення</label>
                    <input type="number"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
                </div>
                <button type="submit"
                    class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">Розрахувати</button>
            </form>
        </div>
    </div>
</template>