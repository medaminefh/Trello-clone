<script setup lang="ts">
import type { Task } from "@/types";

const props = defineProps<{ task: Task }>();
const task = props.task;
</script>

<template>
	<div
		:title="new Date(task?.createdAt)?.toLocaleDateString()"
		class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex overflow-x-auto relative"
	>
		<div>
			<DragHandelIcon />
			<span>
				{{ task.title }}
			</span>
		</div>
	</div>
</template>

<style scoped>
.sortable-drag .task {
	transform: rotate(5deg);
}

.sortable-ghost .task {
	position: relative;
}

.sortable-ghost .task::after {
	content: "";
	@apply absolute top-0 left-0 bottom-0 right-0 bg-slate-300 rounded;
}
</style>
