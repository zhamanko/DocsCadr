<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
            <h1 class="text-3xl mb-6 font-bold">Додати шаблон</h1>
            <form action="" method="get" class="flex flex-col w-100 text-lg gap-4">
                <input type="file" name="templateFile" id="templateFile" class="bg-[#23262b] text-white rounded-3xl file:px-4 file:py-2 file:bg-[#1c1e20] hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" accept=".docx, .doc, .pdf">
                <div>
                    <input type="text" name="templateName" id="templateName" placeholder="Введіть назву шаблону"  class="bg-[#23262b] px-4 text-white rounded-3xl py-2 w-full placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                </div>
                <div>
                    <select name="templateCategory" id="templateCategory" class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                        <option value="category1">Категорія 1</option>
                        <option value="category2">Категорія 2</option>
                        <option value="category3">Категорія 3</option>
                    </select>
                </div>
                <div>
                    <select name="templateCategory" id="templateCategory2" class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                        <option value="category1">Категорія 1</option>
                        <option value="category2">Категорія 2</option>
                        <option value="category3">Категорія 3</option>
                    </select>
                </div>
                <button type="submit" class="bg-[#263028] text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">Додати</button>      
            </form>
        </div>
    </div>
</template>