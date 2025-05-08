import mongoose from 'mongoose';

(async () => {
    try{
        await mongoose.connect("mongodb+srv://che3zcake:spider30114@cluster0.ab8kv.mongodb.net/")
        console.log("Database connected successfully")
    }catch(e){
        console.error("Database connection error:", e)
    }
})()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    }
})

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please specify types'],
        trim: true,
        enum: ['document', 'tweet', 'youtube', 'note']
    },
    link: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type:String,
        default: null
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        trim: true
    },
    tag: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, 'Add tags'],
        ref: 'Tag'
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
        validate: async function(value: any) {
            const user = await User.findById(value);
            if (!user) {
                throw new Error('User does not exist');
            }
        }
    }
})

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    sharable: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    }
})

const User = mongoose.model('User', userSchema)
const Link  = mongoose.model('Link', linkSchema)
const Content = mongoose.model('Content', contentSchema)
const Tag = mongoose.model('Tag', tagSchema)

export {User, Link, Content, Tag}