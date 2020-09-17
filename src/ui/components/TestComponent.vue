<template>
	<div>
		<span>Test component</span>
		<button @click="loadEditor">Markdown Editor</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Router from "vue-router";

@Component
export default class TestComponent extends Vue
{
	loadEditor() {
		let result = this.$router.push({ name: "editor" });
	}

	mounted() {
		console.log("Test component mounted");
	}
}
</script>
