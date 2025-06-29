<template>
    <div class="p-4 text-lg">
        <div class="bg-[#1d1e20] mb-4 p-4 rounded-2xl ">
            <h1 class="text-3xl font-bold mb-4 text-center">Шаблони</h1>
            <div class="flex gap-4 justify-between items-center">
                <select name="type" id="" class="bg-[#23262b] min-w-36 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="">Типи</option>
                </select>
                <input type="text" placeholder="Пошук шаблону"
                    class="bg-[#23262b] flex-1 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-102 transition text-white p-2 rounded-2xl" />
                <select name="category" id=""
                    class="bg-[#23262b] min-w-58 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="">Категорії</option>
                </select>
                <select name="additional" id=""
                    class="bg-[#23262b] min-w-58 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="">додаткове</option>
                </select>
            </div>
        </div>

        <div class="bg-[#1d1e20] p-4 rounded-lg">
            <ul class="flex flex-col gap-4">
                <li class="bg-[#23262b] min-w-58 text-center hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-101 hover:scale-101 transition text-white p-4 rounded-2xl">Шаблон 1</li>
                <li class="bg-[#23262b] min-w-58 text-center hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-101 hover:scale-101 transition text-white p-4 rounded-2xl">Шаблон 2</li>
                <li class="bg-[#23262b] min-w-58 text-center hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-101 hover:scale-101 transition text-white p-4 rounded-2xl">Шаблон 3</li>
            </ul>
        </div>
    </div>
</template>