import { Injectable } from '@nestjs/common';
import {PostDto} from './blog.model'
import { BlogMongoRepository } from './blog.repository';
// import { BlogFileRepository, BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
	constructor(private blogRepository: BlogMongoRepository){}
	async getAllPosts(){
		return await this.blogRepository.getAllPosts();
	}

	async createPost(postDto: PostDto){
		return await this.blogRepository.createPost(postDto);
	}

	async getPost(id){
		return await this.blogRepository.getPost(id);
	}

	async delete(id){
		await this.blogRepository.deletePost(id)
	}

	async updatePost(id, postDto: PostDto){
		return await this.blogRepository.updatePost(id, postDto);
	}


}