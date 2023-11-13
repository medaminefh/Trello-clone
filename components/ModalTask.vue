<script setup lang="ts">
import type { Task } from "~/types";

const props = defineProps<{ task: Task | null; isOpen: Boolean }>();
const emits = defineEmits<{
	(e: "handelCloseModel"): void;
	(e: "handelUpdateTask", task: Task): void;
}>();

const newTitle = ref(props.task?.title);

const handelUpdate = () => {
	// emits("handelUpdateTask", { ...props.task, title: newTitle.value });
};
</script>

<template>
	<div
		v-if="isOpen && task"
		@click="emits('handelCloseModel')"
		class="absolute z-10 bg-gray-300 bg-opacity-50 top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center"
	>
		<div
			@click.stop
			class="relative w-[700px] h-[500px] bg-white overflow-y-auto flex flex-col justify-between"
		>
			<header class="flex justify-between bg-teal-700 p-4">
				<h3 class="text-xl text-white">{{ task.id.substring(8) }}</h3>
				<button
					@click="emits('handelCloseModel')"
					class="text-2xl text-white font-bold"
				>
					X
				</button>
			</header>
			<div class="p-10">
				<div class="flex flex-col gap-4 mt-4">
					<label>Title</label>
					<textarea
						rows="5"
						v-model="task.title"
						class="outline-none border border-black px-4 py-2 w-full"
					/>
				</div>
			</div>
			<footer class="flex justify-center mt-4 gap-10 p-10">
				<button @click="emits('handelCloseModel')" class="text-gray-500">
					Cancel
				</button>
				<button
					@click="handelUpdate"
					class="bg-teal-400 text-white rounded px-3"
				>
					Confirm
				</button>
			</footer>
		</div>
	</div>
</template>
<style scoped></style>
