<template>
	<div>
		<textarea name="" id="" cols="30" rows="10" ref="editor"></textarea>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SimpleMDE from "simplemde";

@Component
export default class MarkdownEditor extends Vue
{
	/**
	 * The active SimpleMDE reference
	 */
	private __simpleMde!: SimpleMDE

	/**
	 * Render the component when mounted
	 */
	mounted() {
		this.__simpleMde = new SimpleMDE({
			element: <HTMLElement> this.$refs["editor"]
		});
	}
}
</script>
