import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./blog.model";
import { Injectable } from "@nestjs/common";
//mongodb 의존성 주입
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, BlogDocument } from "./blog.schema";

export interface BlogRepository {
	getAllPosts(): Promise<PostDto[]>;
	createPost(postDto: PostDto);
	getPost(id: string): Promise<PostDto>;
	deletePost(id: string);
	updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
	FILE_NAME = './src/blog.data.json'

	async getAllPosts(): Promise<PostDto[]> {
		const datas = await readFile(this.FILE_NAME, "utf8");
		const posts = JSON.parse(datas);
		return posts;
	}

	async createPost(postDto: PostDto){
		const posts = await this.getAllPosts();
		const idx = posts.length + 1;
		const createdPost = {id: idx.toString(), ...postDto, createdDt: new Date()}
		posts.push(createdPost)
		await writeFile(this.FILE_NAME, JSON.stringify(posts));
	}

	async getPost(id: string): Promise<PostDto> {
		const posts = await this.getAllPosts();
		const result = posts.find(post => post.id === id);
		return result;
	}

	async deletePost(id: string) {
		const posts = await this.getAllPosts();
		const filterPost = posts.filter(post => post.id !== id);
		await writeFile(this.FILE_NAME, JSON.stringify(filterPost));
	}

	async updatePost(id: string, postDto: PostDto){
		const posts = await this.getAllPosts();
		const idx = posts.findIndex(post => post.id === id);
		const updatedPost = {id, ...postDto, updatedDt: new Date()};
		posts[idx] = updatedPost;
		await writeFile(this.FILE_NAME, JSON.stringify(posts));
	}
}

@Injectable()
//기존 인터페이스와 동일하게 리포를 만듭니다.
export class BlogMongoRepository implements BlogRepository {
	//crud가 가능한 모델을 주입받습니다.
	constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>){}

	async getAllPosts(): Promise<PostDto[]> {
		return await this.blogModel.find().exec()
	}

	async createPost(postDto: PostDto){
		const createdPost = {...postDto, createdDt: new Date(), updatedDt: new Date()}
		await this.blogModel.create(createdPost);
	}

	async getPost(id: string): Promise<PostDto> {
		return await this.blogModel.findById(id);
	}

	async deletePost(id: string) {
		await this.blogModel.findByIdAndDelete(id);
	}

	async updatePost(id: string, postDto: PostDto){
		const updatePost = {id, ...postDto, updatedDt: new Date()}
		await this.blogModel.findByIdAndUpdate(id, updatePost)
	}
}