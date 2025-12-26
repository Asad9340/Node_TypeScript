import { prisma } from './lib/prisma';

async function run() {
  // const createUser = await prisma.user.create({
  //   data: {
  //     name: 'Emran',
  //     email: 'emran@gmail.com',
  //     role: 'ADMIN',
  //   },
  // });
  // console.log('User Created:', createUser);

  // const createPost = await prisma.post.create({
  //   data: {
  //     title: 'My First Post',
  //     content: 'This is the content of my first post.',
  //     isPublished: true,
  //     authorId: 1
  //   }
  // })
  // console.log('Post Created:', createPost);

  // const createProfile = await prisma.profile.create({
  //   data: {
  //     bio: 'Software Developer from Bangladesh',
  //     dateOfBirth: new Date('1990-01-01'),
  //     userId: 1
  //   }
  // })
  // console.log('Profile Created:', createProfile);

  const user = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    }
  })
  console.dir(user,{depth:Infinity});
}
run();
