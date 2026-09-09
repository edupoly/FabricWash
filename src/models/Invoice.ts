import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({ name:{type:String,required:true}, price:{type:Number,required:true,min:0}, quantity:{type:Number,required:true,min:1}, icon:String, color:String },{_id:false});
const InvoiceSchema = new Schema({
  invoiceNumber:{type:String,required:true,unique:true,index:true},
  customer:{name:{type:String,required:true,trim:true},phone:{type:String,required:true,trim:true},address:{type:String,trim:true}},
  items:{type:[ItemSchema],required:true}, total:{type:Number,required:true,min:0},
  paymentMethod:{type:String,enum:["Cash","UPI","Card","Other"],default:"Cash"},
  paymentStatus:{type:String,enum:["Paid","Pending","Cancelled"],default:"Paid"},
},{timestamps:true});
export const Invoice = models.Invoice || model("Invoice",InvoiceSchema);
