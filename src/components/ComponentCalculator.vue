<template>
    <form class="flex flex-col w-full gap-4">
        <div>
            <label for="startDate" class="block mb-2">Дата початку:</label>
            <input type="date"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Дата закінчення:</label>
            <input type="date"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Використано днів відпустки:</label>
            <input type="number"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Відпустка на рік:</label>
            <input type="number"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Додаткові дні:</label>
            <input type="number"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Лікарняні дні:</label>
            <input type="number"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <div>
            <label for="endDate" class="block mb-2">Відпустка без збереження:</label>
            <input type="number"
                class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" />
        </div>
        <button type="submit"
            class="bg-[#252544] text-white p-2 rounded-3xl hover:bg-[#303058] transition-colors">Розрахувати</button>
    </form>
</template>