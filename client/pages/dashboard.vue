<template>
	<div>
		<page-header>
			<template v-slot:title>Dashboard</template>
		</page-header>
		<quotes />
	</div>
</template>

<script>
export default {
	layout: 'user',
	middleware: 'auth',

	head: () =>  ({
		title: 'Dashboard'
	}),
}
</script>