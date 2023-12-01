import mongoose, { Schema } from "mongoose";

type UserType = {
    orgao: string,
    estado: string,
    cidade: string,
    email: string,
    password: string,
};

const UserSchema = new Schema<UserType>({
    orgao: {type: String, required: true, minlength: 2},
    estado:{type: String, required: true, minlength: 2},
    cidade: {type: String, required: true, minlength: 2},
    email:{type: String, required: true},
    password: {type: String, required: true},
});

const User = mongoose.model("User", UserSchema);
export default User;