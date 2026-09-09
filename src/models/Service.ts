import { Schema, model, models } from "mongoose";
const ServiceItemSchema=new Schema({name:{type:String,required:true,trim:true},icon:{type:String,default:"👕"},price:{type:Number,required:true,min:0}},{_id:false});
const ServiceSchema=new Schema({name:{type:String,required:true,unique:true,trim:true},icon:{type:String,default:"🧺"},price:{type:Number,default:0,min:0},color:{type:String,default:"blue"},items:{type:[ServiceItemSchema],required:true}},{timestamps:true});
export const LaundryService=models.LaundryService||model("LaundryService",ServiceSchema);
