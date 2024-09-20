import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('posts');
    await db.dropCollection('comments');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const user1 = new User({
    username: 'ANITAR',
    password: '1qaz@fewfWSX',
  });

  user1.generateToken();
  await user1.save();

  const user2 = new User({
    username: 'Protomax',
    password: '1qaz@WSX',
  });

  user2.generateToken();
  await user2.save();

  const [post1, post2, post3, post4] = await Post.create({
    user: user1,
    title: 'Some user1 title',
    description: 'Вы знали об этом?',
    image: 'fixtures/post1-mem.jpg',
    createdAt: new Date('2024-09-20T15:23:14.509Z'),
  }, {
    user: user1,
    title: 'Some user1 title 2',
    description: 'Милоты вам в ленту',
    image: 'fixtures/post2-cat.jpg',
    createdAt: new Date('2024-09-20T21:23:14.509Z'),
  }, {
    user: user2,
    title: 'Some user2 title',
    description: 'Давайте поговорим о важном',
    createdAt: new Date('2024-09-20T11:23:14.509Z'),
  }, {
    user: user2,
    title: 'Some user2 title 2',
    description: 'Rocks',
    image: 'fixtures/post4-rock.jpg',
    createdAt: new Date('2024-09-20T10:27:09.870Z'),
  });

  await Comment.create({
    user: user2,
    post: post1,
    message: 'Hello!',
  },{
    user: user1,
    post: post1,
    message: 'Some time',
  },{
    user: user1,
    post: post2,
    message: 'WoW!',
  },{
    user: user2,
    post: post2,
    message: 'YES',
  },{
    user: user1,
    post: post3,
    message: 'It is so weird',
  },{
    user: user2,
    post: post3,
    message: 'No, not that',
  },{
    user: user1,
    post: post4,
    message: 'Dafuk?!',
  },{
    user: user2,
    post: post4,
    message: 'No comments',
  });

  await db.close();
};

run().catch(console.error);