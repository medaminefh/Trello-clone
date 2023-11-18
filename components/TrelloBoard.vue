<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";
import { useStorage } from "@vueuse/core";
import type { Column, Task } from "@/types";
import { nanoid } from "nanoid";

const state = ref<Column[]>([
	{
		id: nanoid(),
		title: "First day",
		add: false,
		tasks: [
			{
				id: nanoid(),
				title: "Complete the x course",
				createdAt: new Date(),
			},
			{
				id: nanoid(),
				title: "Create a blog about that course",
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
]);

const columns = useStorage("columns", state.value, localStorage, {
	mergeDefaults: true,
});

const alt = useKeyModifier("Alt");
const selectedTask = ref<Task | null>(null);
const selectedColumn = ref<Column | null>(null);
const openTaskModal = ref(false);
const openColumnModal = ref(false);
const openNewColumnModal = ref(false);

const createNewColumn = (
	title: string,
	tasks: Omit<Task, "id" | "createdAt">[]
) => {
	const newTasks = tasks.map((task) => ({
		title: task.title,
		id: nanoid(),
		createdAt: new Date(),
	}));
	const newColumn = { id: nanoid(), title, add: false, tasks: newTasks };
	columns.value.push(newColumn);
};

const handelOpenCloseColumnModal = () => {
	openNewColumnModal.value = !openNewColumnModal.value;
};

const handelOpenModel = (column: Column, task: Task) => {
	selectedColumn.value = column;
	selectedTask.value = task;
	openTaskModal.value = true;
};

const handelCloseModel = () => {
	selectedTask.value = null;
	openTaskModal.value = false;
};

const handelUpdateTask = (task: Task) => {
	const column = columns.value.find(
		(col) => col.id == selectedColumn.value?.id
	)!;
	const tasks = column?.tasks;
	const updatedTasks = tasks?.map((oldTask) =>
		oldTask.id == selectedTask.value?.id ? task : oldTask
	);

	if (selectedColumn.value?.id) {
		column.tasks = updatedTasks as Task[];
	}
};

const clone = (task: Task) => {
	return { ...task, id: nanoid() };
};

const handelCreateTask = (columnId: string) => {
	const column = columns.value.find((col) => col.id == columnId);
	if (column?.newTask && column.newTask.length > 0) {
		const newTask = {
			id: nanoid(),
			title: column.newTask,
			createdAt: new Date(),
		};
		// Push the new task to the specific column's tasks
		column?.tasks.push(newTask);
		column!.add = !column?.add;
		column.newTask = "";
	}
};

const handelDeleteTask = () => {
	const column = columns.value.find(
		(col) => col.id == selectedColumn.value?.id
	)!;
	const tasks = column.tasks;
	const updatedTasks = tasks.filter(
		(task) => task.id !== selectedTask.value?.id
	);
	column.tasks = updatedTasks;
};

const openChangeTitleModal = (column: Column) => {
	openColumnModal.value = true;
	selectedColumn.value = column;
};

const handelChangeColumnTitle = (title: string | undefined) => {
	const newCols = columns.value.map((col) =>
		col.id == selectedColumn.value?.id ? { ...col, title } : col
	);
	columns.value = newCols;
};

const handelDeleteColumn = () => {
	if (confirm("Are you sure you want to delete this column!")) {
		const newCols = columns.value.filter(
			(col) => col.id !== selectedColumn.value?.id
		);
		columns.value = newCols;
		selectedColumn.value = null;
	}
};

const handelCloseColumnModal = () => {
	selectedColumn.value = null;
	openColumnModal.value = false;
};
</script>

<template>
	<ModalNewColumn
		:isOpen="openNewColumnModal"
		@handelCloseModal="handelOpenCloseColumnModal"
		@handelCreate="createNewColumn"
	/>
	<ModalColumnTitle
		:isOpen="openColumnModal"
		:column="selectedColumn"
		@handelCloseModel="handelCloseColumnModal"
		@handelUpdateTitle="handelChangeColumnTitle"
		@handelDeleteColumn="handelDeleteColumn"
	/>
	<ModalTask
		:task="selectedTask"
		:isOpen="openTaskModal"
		@handelCloseModel="handelCloseModel"
		@handelUpdateTask="handelUpdateTask"
		@handelDeleteTask="handelDeleteTask"
	/>
	<div class="flex justify-end" v-if="columns.length">
		<button
			@click="handelOpenCloseColumnModal"
			class="flex items-center justify-center text-teal-600 font-bold right-0 bg-white p-2 mb-2 w-10 h-10 rounded-full border"
		>
			+
		</button>
	</div>
	<div v-if="columns.length">
		<draggable
			v-model="columns"
			v-dragscroll:nochilddrag
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
						<span @click="openChangeTitleModal(column)" class="cursor-pointer">
							{{ column.title }}
						</span>
					</header>

					<draggable
						v-model="column.tasks"
						:group="{ name: 'tasks', pull: alt ? 'clone' : true }"
						:clone="clone"
						item-key="id"
						:animation="150"
						handle=".drag-handel"
					>
						<template #item="{ element: task }: { element: Task }">
							<div class="cursor-pointer">
								<TrelloTask
									:task="task"
									@click="handelOpenModel(column, task)"
								/>
							</div> </template
					></draggable>
					<textarea
						v-if="column.add"
						class="max-w-[250px]"
						v-model="column.newTask"
					></textarea>
					<footer>
						<div v-if="column.add" class="flex justify-between">
							<button class="text-gray-500" @click="column.add = !column.add">
								Cancel
							</button>
							<button
								@click="handelCreateTask(column.id)"
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
	<div v-else class="flex mt-20 justify-center items-center">
		<button
			@click="handelOpenCloseColumnModal"
			class="flex items-center justify-center text-teal-600 font-bold right-0 bg-white p-2 mb-2 w-20 h-20 text-3xl rounded-full border"
		>
			+
		</button>
	</div>
</template>
