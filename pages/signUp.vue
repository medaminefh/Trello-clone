<script setup lang="ts">
const state = ref({
	email: "",
	password: "",
	confirmPass: "",
});

const handleSubmit = (event: Event) => {
	event.preventDefault();
	if (state.value.email && state.value.password === state.value.confirmPass) {
		console.log("You are good to go");
	} else {
		console.log("You're not good!");
	}
};
</script>
<template>
	<section class="bg-gray-50">
		<div
			class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
		>
			<span class="flex items-center mb-6 text-2xl font-semibold text-teal-700">
				<img class="w-8 h-8 mr-2" src="/favicon.ico" alt="logo" />
				Sign up
			</span>
			<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1
						class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
					>
						Create an account
					</h1>
					<form class="space-y-4 md:space-y-6" @submit="handleSubmit">
						<div>
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900"
								>Your email</label
							>
							<input
								type="email"
								name="email"
								id="email"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								placeholder="name@email.com"
								v-model="state.email"
								required
							/>
						</div>
						<div>
							<label
								for="password"
								class="block mb-2 text-sm font-medium text-gray-900"
								>Password</label
							>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								v-model="state.password"
								required
							/>
						</div>

						<div>
							<label
								for="confirmPassword"
								class="block mb-2 text-sm font-medium text-gray-900"
								>Confirm password</label
							>
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								placeholder="••••••••"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								v-model="state.confirmPass"
								required
							/>
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-start">
								<div class="flex items-center h-5">
									<input
										id="remember"
										aria-describedby="remember"
										type="checkbox"
										class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
									/>
								</div>
								<div class="ml-3 text-sm">
									<label for="remember" class="text-gray-500"
										>Remember me</label
									>
								</div>
							</div>
							<a
								href="#"
								class="text-sm font-medium text-primary-600 hover:underline"
								>Forgot password?</a
							>
						</div>
						<button
							type="submit"
							class="w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 bg-teal-600 text-white"
						>
							Sign up
						</button>
						<p class="text-sm font-light text-gray-500">
							have an account?
							<NuxtLink to="login" class="font-medium hover:underline"
								>Login</NuxtLink
							>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>
