# HTTP METHOD

- GET: Retrieve Data only

  - Can access from both url and fetch

- POST: Create New Data

  - Can acess from only fetch

- PUT: Update whole data

  - Can acess from only fetch

- PATCH: Update some part of data

  - Can acess from only fetch

- DELETE: Delete all Data

  - Can acess from only fetch

# HTTP Secure

- HEAD Method
- JWT Authentication
- Rate Limiting
- CORS Restrictions

# MogoDb Command

- CRUD

  ```js
  // Connect to MongoDB
  mongoose.connect("mongodb://localhost:27017/your_database");

  // Create a basic schema
  const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    createdAt: { type: Date, default: Date.now },
  });

  // Basic CRUD Operations
  // CREATE
  const newUser = await User.create({
    username: "john",
    email: "john@example.com",
    age: 25,
  });

  // READ
  const user = await User.findById(id);
  const users = await User.find({ age: { $gt: 18 } });

  // UPDATE
  await User.updateOne({ _id: userId }, { $set: { username: "newname" } });

  // DELETE
  await User.deleteOne({ _id: userId });
  ```

- Schema
  ```js
  // User Schema with relationships
  const UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
      profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
      },
      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
  ```
- find

  ```js
  // Find posts with author details
  const posts = await Post.find()
    .populate("author", "username email")
    .populate("comments.user", "username");

  // Find user with their posts
  const user = await User.findById(userId).populate({
    path: "posts",
    select: "title content createdAt",
    options: { sort: { createdAt: -1 } },
  });

  // Complex queries
  const users = await User.find({
    age: { $gte: 18, $lte: 65 },
    "profile.country": "USA",
    createdAt: {
      $gte: new Date("2023-01-01"),
      $lte: new Date("2023-12-31"),
    },
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("username email profile");

  // Aggregation example
  const result = await Post.aggregate([
    { $match: { author: userId } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        postCount: { $sum: 1 },
        averageLikes: { $avg: "$likeCount" },
      },
    },
  ]);
  ```
