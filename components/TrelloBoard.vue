<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";
import type { Column, Task } from "@/types";
import { nanoid } from "nanoid";

const columns = ref<Column[]>([
	{
		id: nanoid(),
		title: "backlog!",
		add: false,
		tasks: [
			{
				id: nanoid(),
				title: "create your first tuto for this end task",
				createdAt: new Date(),
			},
			{
				id: nanoid(),
				title: "start a blog",
				createdAt: new Date(),
			},
			{
				id: nanoid(),
				title: "complete the tasks",
				createdAt: new Date(),
			},
		],
	},
	{
		id: nanoid(),
		title: "Second day",
		add: false,
		tasks: [],
	},
	{
		id: nanoid(),
		title: "Third day",
		add: false,
		tasks: [],
	},
	{
		id: nanoid(),
		title: "Third day",
		add: false,
		tasks: [],
	},
	{
		id: nanoid(),
		title: "Third day",
		add: false,
		tasks: [],
	},
	{
		id: nanoid(),
		title: "Third day",
		add: false,
		tasks: [],
	},
	{
		id: nanoid(),
		title: "Third day",
		add: false,
		tasks: [],
	},
	{
		id: nanoid(),
		title: "Third day",
		add: false,
		tasks: [],
	},
]);

const alt = useKeyModifier("Alt");
const selectedTask = ref<Task | null>(null);
const selectedColumnId = ref<string | null>(null);
const openModel = ref(false);

const handelOpenModel = (columnId: string, task: Task) => {
	selectedColumnId.value = columnId;
	selectedTask.value = task;
	openModel.value = true;
};

const handelCloseModel = () => {
	selectedTask.value = null;
	openModel.value = false;
};

const handelUpdateTask = (task: Task) => {
	// console.log(task);
	// const column = columns.value.find((col) => col.id == selectedColumnId.value);
	// const tasks = column?.tasks;
	// const updatedTasks = tasks?.map((oldTask) =>
	// 	oldTask.id == selectedTask.value?.id ? task : oldTask
	// );
	/* 	columns.value.find(col => col.id == selectedColumnId.value)?.tasks = updatedTasks */
};
</script>

<template>
	<ModalTask
		:task="selectedTask"
		:isOpen="openModel"
		@handelCloseModel="handelCloseModel"
		@handelUpdateTask="handelUpdateTask"
	/>
	<div>
		<draggable
			v-model="columns"
			group="columns"
			item-key="id"
			class="flex gap-4 overflow-x-auto items-start pb-4"
			:animation="150"
			handle=".drag-handel"
		>
			<template #item="{ element: column }: { element: Column }">
				<div class="bg-gray-200 p-5 rounded min-w-[250px]">
					<header class="font-bold mb-4">
						<DragHandelIcon />
						{{ column.title }}
					</header>

					<draggable
						v-model="column.tasks"
						:group="{ name: 'tasks', pull: alt ? 'clone' : true }"
						item-key="id"
						:animation="150"
						handle=".drag-handel"
					>
						<template #item="{ element: task }: { element: Task }">
							<div class="cursor-pointer">
								<TrelloTask
									:task="task"
									@click="handelOpenModel(column.id, task)"
								/>
							</div> </template
					></draggable>
					<textarea v-if="column.add" class="max-w-[250px]"></textarea>
					<footer>
						<div v-if="column.add" class="flex justify-between">
							<button class="text-gray-500" @click="column.add = !column.add">
								Cancel
							</button>
							<button
								@click="column.add = !column.add"
								class="bg-teal-400 text-white rounded px-3"
							>
								Confirm
							</button>
						</div>
						<button
							v-else
							class="text-gray-500"
							@click="column.add = !column.add"
						>
							+Add new task
						</button>
					</footer>
				</div>
			</template>
		</draggable>
	</div>
</template>
