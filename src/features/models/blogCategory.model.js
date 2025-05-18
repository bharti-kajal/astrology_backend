import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 0
    }
}, {timestamps: true});

export const BlogCategoryModel = mongoose.model('blog_category', blogCategorySchema);

// import mongoose from "mongoose";

// // Helper to get IST time
// const getISTDate = () => {
//   const date = new Date();
//   // IST is UTC + 5:30
//   return new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
// };

// const blogCategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: Boolean,
//     default: 0
//   },
//   createdAt: {
//     type: Date,
//     default: getISTDate
//   },
//   updatedAt: {
//     type: Date,
//     default: getISTDate
//   }
// });

// // Middleware to update updatedAt on every save
// blogCategorySchema.pre('save', function (next) {
//   this.updatedAt = getISTDate();
//   if (!this.createdAt) {
//     this.createdAt = getISTDate();
//   }
//   next();
// });

// export const BlogCategoryModel = mongoose.model('blog_category', blogCategorySchema);
