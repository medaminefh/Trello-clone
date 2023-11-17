<script setup lang="ts">
import type { Column } from "~/types";

const props = defineProps<{ column: Column; isOpen: Boolean }>();
const emits = defineEmits<{
	(e: "handelCloseModel"): void;
	(e: "handelUpdateTitle", title: string): void;
	(e: "handelDeleteColumn"): void;
}>();

const handelDelete = () => {
	emits("handelDeleteColumn");
	emits("handelCloseModel");
};

const handelUpdate = () => {
	emits("handelUpdateTitle", newTitle.value);
	emits("handelCloseModel");
};

const newTitle = ref("");

watch(
	() => props.column,
	(newValue) => {
		newTitle.value = newValue?.title;
	}
);
</script>
<template>
	<div
		v-if="isOpen"
		@click="emits('handelCloseModel')"
		class="absolute z-10 bg-gray-300 bg-opacity-50 top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center"
	>
		<div @click.stop class="relative bg-white rounded-xl overflow-hidden">
			<header class="flex justify-between bg-teal-700 p-4">
				<h3 class="text-xl text-white">{{ column.id.substring(8) }}</h3>
				<button
					@click="emits('handelCloseModel')"
					class="text-2xl text-white font-bold"
				>
					X
				</button>
			</header>
			<div class="p-10">
				<input
					v-model="newTitle"
					class="outline-none border border-black px-4 py-2 w-full rounded"
				/>
			</div>
			<footer class="flex justify-center gap-10 p-4">
				<button @click="emits('handelCloseModel')" class="text-gray-500">
					Cancel
				</button>
				<button
					@click="handelDelete"
					class="bg-red-400 text-white rounded px-3"
				>
					Delete
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
