const posts = [
	{title: 'Post one', body: 'body one'},
	{title: 'Post two', body: 'body two'}
];

function createPost(post) {
	setTimeout(() => {
		posts.push(post);
	}, 2000);
}

function getPosts() {
	setTimeout(() => {
		let l = '';
		posts.forEach((post) => {
			l += `<li>${post.title}</li>`;
		});
		console.log(l);
	}, 1000);
}
