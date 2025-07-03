<script>

export default {
    name: 'SlideBarLeft',
    data() {
        return {
            isOpen: false,
        };
    },
    mounted() {
        const closeButton = document.getElementById('close-button');
        closeButton.addEventListener('click', this.closeSlideBar);
    },
    methods: {
        closeSlideBar() {
            const slideBar = document.getElementById('slide-bar-left');
            const h1 = slideBar.querySelector('h1');
            if (slideBar) {
                h1.classList.toggle('hidden');
                this.toggleWidth();
                this.isOpen = !this.isOpen;
            }
        },
        toggleWidth(){
            const slideBar = document.getElementById('slide-bar-left');
            if (slideBar) {
                slideBar.classList.toggle('w-64');
                slideBar.classList.toggle('w-24');
            }
        }
    }
};

</script>

<template>
    <div id="slide-bar-left" class="bg-[#1d1e20] w-24 h-screen p-4 shadow-lg flex flex-col items-center gap-2">

        <div class="w-full flex justify-end mb-2">
            <button id="close-button" class="hover:cursor-pointer hover:scale-125 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path v-if="isOpen" stroke-linecap="round" stroke-linejoin="round"
                        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round"
                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>

        <h1 class="text-3xl hidden font-bold mb-2">DocsCadre</h1>

        <div class="flex flex-col items-center w-full text-lg">
            <router-link to="/"
                class="flex justify-center bg-[#23262b] hover:bg-[#2c2f33] hover:scale-110  w-full text-center p-2 rounded-2xl mb-2 transition-all">
                <p v-if="isOpen">Головна</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-10">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </router-link>
            <router-link to="/add-template"
                class="flex justify-center bg-[#23262b] hover:bg-[#2c2f33] hover:scale-110  w-full text-center p-2 rounded-2xl mb-2 transition-all">
                <p v-if="isOpen">Додати шаблон</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-10">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </router-link>
            <router-link to="/template"
                class="flex justify-center bg-[#23262b] hover:bg-[#2c2f33] hover:scale-110  w-full text-center p-2 rounded-2xl mb-2 transition-all">
                <p v-if="isOpen">Шаблон</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-10">
                    <path
                        d="M6 16v-3h.375a.626.626 0 0 1 .625.626v1.749a.626.626 0 0 1-.626.625H6Zm6-2.5a.5.5 0 1 1 1 0v2a.5.5 0 0 1-1 0v-2Z" />
                    <path fill-rule="evenodd"
                        d="M11 7V2h7a2 2 0 0 1 2 2v5h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2H3a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6a2 2 0 0 0 2-2Zm7.683 6.006 1.335-.024-.037-2-1.327.024a2.647 2.647 0 0 0-2.636 2.647v1.706a2.647 2.647 0 0 0 2.647 2.647H20v-2h-1.335a.647.647 0 0 1-.647-.647v-1.706a.647.647 0 0 1 .647-.647h.018ZM5 11a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 9 15.375v-1.75A2.626 2.626 0 0 0 6.375 11H5Zm7.5 0a2.5 2.5 0 0 0-2.5 2.5v2a2.5 2.5 0 0 0 5 0v-2a2.5 2.5 0 0 0-2.5-2.5Z"
                        clip-rule="evenodd" />
                    <path d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Z" />
                </svg>
            </router-link>
            <router-link to="/check-template"
                class="flex justify-center bg-[#23262b] hover:bg-[#2c2f33] hover:scale-110  w-full text-center p-2 rounded-2xl mb-2 transition-all">
                <p v-if="isOpen">Перевірка шаблону</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </router-link>
            <router-link to="/calculator-days"
                class="flex justify-center bg-[#23262b] hover:bg-[#2c2f33] hover:scale-110  w-full text-center p-2 rounded-2xl mb-2 transition-all">
                <p v-if="isOpen">Калькулятор днів</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-10">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                </svg>
            </router-link>
            <router-link to="/date-base-menu"
                class="flex justify-center bg-[#23262b] hover:bg-[#2c2f33] hover:scale-110  w-full text-center p-2 rounded-2xl mb-2 transition-all">
                <p v-if="isOpen">База даних</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-10">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
            </router-link>
        </div>
    </div>
</template>