// import { resolve } from "url";

const posts = [
	{title: 'Post one', body: 'body one'},
	{title: 'Post two', body: 'body two'}
];

function getPosts() {
	setTimeout(() => {
		let l = '';
		posts.forEach((post) => {
			l += `<li>${post.title}</li>`;
		});
		console.log(l);
	}, 1000);
}

function createPost(post) {
	setTimeout(() => {
		posts.push(post);
	}, 2000);
}
async function test(post) {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve(
			posts.push(post)
		), 1000)
	});
	let result = await promise;
	getPosts();
}
// createPost({title: '3', body: '3'});

test({title: 'post 3', body: 'body 3'});

