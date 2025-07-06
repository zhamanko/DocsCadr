<script>
export default {
    name: 'ComponentMessage',
    data() {
        return {
            isVisible: true,
        };
    },
    props: {
        message: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'Повідомлення'
        },
        onClose: Function
    }
};
</script>

<template>
    <transition name="fade">
        <div
            class="absolute bottom-3 text-center text-lg left-1/2 right-1/2 bg-[#1a1a1a] text-white p-4 rounded-3xl shadow-lg w-1/2 transform -translate-x-1/2">
            <button class="absolute top-3 right-3 text-white hover:scale-115 cursor-pointer" @click="onClose"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <h1>{{ title }}</h1>
            <p>{{ message }}</p>
        </div>
    </transition>
</template>