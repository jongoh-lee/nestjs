import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BlogDocument = Blog & Document;

//스키마 생성을 도와주는 데코레이터
@Schema()
export class Blog {
	@Prop()
	id: string;

	@Prop()
	title: string;

	@Prop()
	content: string;

	@Prop()
	name: string;

	@Prop()
	createdDt: Date;

	@Prop()
	updatedDt: Date;
}
//내부적으로 스키마 생성,import 할때 사용
export const BlogSchema = SchemaFactory.createForClass(Blog);