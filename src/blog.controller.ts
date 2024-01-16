import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { PostDto } from "./blog.model";
// 여기에는 /blog 경로로 요청이 들어왔을 때 처리할 api를 정의한다
@Controller('blog')
export class BlogController {
	constructor(private blogService: BlogService){}
	@Get()
	getAllPosts(){
		return this.blogService.getAllPosts();
	}

	@Post()
	createPost(@Body() postDto){
	 	this.blogService.createPost(postDto);
		return 'success'
	}

	@Get('/:id')
	getPost(@Param('id') id: string){
		console.log('게시글 읽기')
		return this.blogService.getPost(id);
	}

	@Delete('/:id')
	deletePost(@Param('id') id: string){
		console.log('delete post')
		this.blogService.delete(id);
		return 'success'
	}

	@Put('/:id')
	//만약 비동기적으로 가져와야 하는 경우에만 async로 감싼다.
	updatePost(@Param('id') id: string, @Body() postDto:PostDto){
		console.log(`update ppost id ${id}`);
		const post = this.blogService.updatePost(id, postDto);
		console.log(`this is post ${post}`)
		return post;
	}

}