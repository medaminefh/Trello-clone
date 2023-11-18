<template>
	<Head>
		<Title>Trello_</Title>
		<Meta name="description" content="Trello clone app" />
		<Link
			rel="apple-touch-icon"
			sizes="180x180"
			href="/Trello-clone/apple-touch-icon.png"
		/>
		<Link
			rel="icon"
			type="image/png"
			sizes="32x32"
			href="/Trello-clone/favicon-32x32.png"
		/>
		<Link
			rel="icon"
			type="image/png"
			sizes="16x16"
			href="/Trello-clone/favicon-16x16.png"
		/>
	</Head>
	<Header />
	<div class="p-10 overflow-auto h-[100vh] bg-teal-400">
		<h1 class="text-4xl text-white mb-10 font-bold text-center">
			Trello Clone
		</h1>
		<TrelloBoard />
	</div>
</template>
