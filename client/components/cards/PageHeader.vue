<template>
  <div class="d-block justify-space-between d-md-flex">
		<h1><slot name="title"></slot></h1>
		<slot name="breadcrumb">
			<v-breadcrumbs
				:items="items"
				divider="-"
			></v-breadcrumbs>
		</slot>
  </div>
</template>

<script>
  export default {
		computed: {
			items () {
				let routes = [
					{
						text: 'Dashboard',
						disabled: false,
						to: '/dashboard',
					},
				]

				const currentRoute = this.$route
				if(currentRoute.name !== 'dashboard') {
					const paths = currentRoute.path.split('/')
					let path = ''
					paths.forEach(element => {
						if(element === '') return
						path += '/' + element
						routes.push({
							text: element.charAt(0).toUpperCase() + element.slice(1),
							disabled: false,
							to: path,
							exact: true
						})
					});
				}

				return routes
			}
		}
  }
</script>