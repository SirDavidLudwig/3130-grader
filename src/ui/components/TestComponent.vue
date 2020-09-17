<template>
	<div>
		<span>Test component</span>
		<button @click="loadEditor">Markdown Editor</button>
	</div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

@Component
export default class TestComponent extends Vue
{
	loadEditor() {
		console.log("Navigating...")
		let result = this.$router.push({ name: "editor" });
		console.log(result);
	}

	mounted() {
		console.log("Test component mounted");
	}
}
</script>
