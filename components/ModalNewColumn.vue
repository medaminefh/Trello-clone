<script setup lang="ts">
defineProps<{ isOpen: Boolean }>();
const emits = defineEmits<{
	(e: "handelCloseModal"): void;
	(e: "handelCreate", title: string, tasks: { title: string }[]): void;
}>();

const title = ref("");
const tasks = ref<{ title: string }[]>([{ title: "" }]);

const handelCreate = () => {
	if (!title.value.length) return;

	const formattedTasks = tasks.value.filter((task) => task.title.length > 5);
	if (!formattedTasks.length) return;
	emits("handelCreate", title.value, formattedTasks);

	title.value = "";
	tasks.value = [{ title: "" }];
	emits("handelCloseModal");
};

const handelAddNewTask = () => {
	tasks.value.push({ title: "" });
};

const handelDeleteTask = (id: number) => {
	tasks.value = tasks.value.filter((_, index) => index !== id);
};
</script>
<template>
	<div
		v-if="isOpen"
		@click="emits('handelCloseModal')"
		class="absolute z-10 bg-gray-300 bg-opacity-50 top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center"
	>
		<div
			@click.stop
			class="relative bg-white rounded-xl overflow-y-auto w-[700px] h-[500px]"
		>
			<header class="flex justify-between bg-teal-700 p-4">
				<h3 class="text-xl text-white">Create New Task</h3>
				<button
					@click="emits('handelCloseModal')"
					class="text-2xl text-white font-bold"
				>
					X
				</button>
			</header>
			<main class="p-10 space-y-3 min-h-[350px]">
				<fieldset>
					<label>Title</label>
					<input
						v-model="title"
						class="outline-none border border-black px-4 py-2 w-full rounded"
						required
					/>
				</fieldset>
				<div class="flex flex-col gap-2">
					<div v-for="(_, i) in tasks" :key="i" class="flex gap-2 items-center">
						<input
							type="text"
							v-model="tasks[i].title"
							class="outline-none border border-black px-4 py-2 w-full rounded"
							required
						/>
						<button @click="handelDeleteTask(i)" class="font-bold text-red-400">
							X
						</button>
					</div>
					<button
						@click="handelAddNewTask"
						class="text-gray-500 border w-max px-2 self-end"
					>
						+Add new task
					</button>
				</div>
			</main>
			<footer class="justify-self-end flex justify-center gap-10 p-4">
				<button @click="emits('handelCloseModal')" class="text-gray-500">
					Cancel
				</button>
				<button
					@click="handelCreate"
					class="bg-teal-400 text-white rounded px-3"
				>
					Confirm
				</button>
			</footer>
		</div>
	</div>
</template>
